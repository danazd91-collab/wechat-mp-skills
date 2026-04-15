import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";

const PORT = Number(process.env.WECHAT_SERVICE_PORT || 8787);
const APP_ID = process.env.WECHAT_APP_ID || "";
const APP_SECRET = process.env.WECHAT_APP_SECRET || "";
const DEFAULT_AUTHOR = process.env.WECHAT_DEFAULT_AUTHOR || "";
const DEFAULT_DIGEST = process.env.WECHAT_DEFAULT_DIGEST || "";

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (chunks.length === 0) {
    return {};
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload, null, 2));
}

function assertCredentials() {
  if (!APP_ID || !APP_SECRET) {
    throw new Error("Missing WECHAT_APP_ID or WECHAT_APP_SECRET.");
  }
}

async function getAccessToken() {
  assertCredentials();
  const url = new URL("https://api.weixin.qq.com/cgi-bin/token");
  url.searchParams.set("grant_type", "client_credential");
  url.searchParams.set("appid", APP_ID);
  url.searchParams.set("secret", APP_SECRET);

  const response = await fetch(url);
  const payload = await response.json();
  if (!response.ok || payload.errcode) {
    throw new Error(`Failed to get access token: ${payload.errmsg || response.statusText}`);
  }
  return payload.access_token;
}

async function uploadCoverImage(accessToken, coverImagePath) {
  const file = await readFile(coverImagePath);
  const form = new FormData();
  const filename = coverImagePath.split(/[\\/]/).pop() || "cover.jpg";
  const extension = extname(filename).toLowerCase();
  const mimeType =
    extension === ".png" ? "image/png" :
    extension === ".gif" ? "image/gif" :
    extension === ".webp" ? "image/webp" :
    "image/jpeg";

  form.append("media", new Blob([file], { type: mimeType }), filename);

  const url = new URL("https://api.weixin.qq.com/cgi-bin/material/add_material");
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("type", "image");

  const response = await fetch(url, { method: "POST", body: form });
  const payload = await response.json();
  if (!response.ok || payload.errcode) {
    throw new Error(`Failed to upload cover image: ${payload.errmsg || response.statusText}`);
  }

  return payload.media_id;
}

function normalizeArticles(payload) {
  if (Array.isArray(payload.articles) && payload.articles.length > 0) {
    return payload.articles.map((article) => ({
      ...article,
      author: article.author || DEFAULT_AUTHOR,
      digest: article.digest || DEFAULT_DIGEST
    }));
  }

  if (!payload.title || !payload.content) {
    throw new Error("Payload must include either articles[] or title + content.");
  }

  return [
    {
      title: payload.title,
      author: payload.author || DEFAULT_AUTHOR,
      digest: payload.digest || DEFAULT_DIGEST,
      content: payload.content,
      content_source_url: payload.contentSourceUrl || "",
      need_open_comment: payload.needOpenComment || 0,
      only_fans_can_comment: payload.onlyFansCanComment || 0,
      thumb_media_id: payload.thumbMediaId || ""
    }
  ];
}

async function addDraft(accessToken, articles) {
  const url = new URL("https://api.weixin.qq.com/cgi-bin/draft/add");
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ articles })
  });
  const payload = await response.json();
  if (!response.ok || payload.errcode) {
    throw new Error(`Failed to add draft: ${payload.errmsg || response.statusText}`);
  }

  return payload;
}

async function handlePublishDraft(req, res) {
  const payload = await readJsonBody(req);
  const accessToken = await getAccessToken();
  const articles = normalizeArticles(payload);

  if (payload.coverImagePath && !articles[0].thumb_media_id) {
    articles[0].thumb_media_id = await uploadCoverImage(accessToken, payload.coverImagePath);
  }

  if (!articles[0].thumb_media_id) {
    throw new Error("A thumb media id is required. Provide thumbMediaId or coverImagePath.");
  }

  const result = await addDraft(accessToken, articles);
  sendJson(res, 200, {
    ok: true,
    mediaId: result.media_id,
    articleCount: articles.length
  });
}

createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/health") {
      return sendJson(res, 200, {
        ok: true,
        service: "wechat-draft-service",
        credentialsConfigured: Boolean(APP_ID && APP_SECRET)
      });
    }

    if (req.method === "POST" && req.url === "/api/drafts") {
      return await handlePublishDraft(req, res);
    }

    sendJson(res, 404, { ok: false, error: "Not Found" });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
}).listen(PORT, () => {
  console.log(`wechat-draft-service listening on http://127.0.0.1:${PORT}`);
});

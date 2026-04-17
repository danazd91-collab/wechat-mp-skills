import { readFile, writeFile } from "node:fs/promises";

const themes = {
  minimal: {
    body: "max-width:100%; color:#222222; word-break:break-word; padding:0;",
    p: "margin:14px 0; font-size:16px; line-height:1.82; color:#222222; text-align:justify;",
    h1: "margin:28px 0 18px; font-size:28px; line-height:1.4; font-weight:700; text-align:center; color:#111111; letter-spacing:0.01em;",
    h2: "margin:26px 0 12px; font-size:21px; line-height:1.5; font-weight:700; color:#111111;",
    h3: "margin:20px 0 10px; font-size:18px; line-height:1.55; font-weight:700; color:#111111;",
    h4: "margin:18px 0 8px; font-size:16px; line-height:1.6; font-weight:700; color:#111111;",
    h5: "margin:16px 0 8px; font-size:15px; line-height:1.6; font-weight:700; color:#111111;",
    h6: "margin:16px 0 8px; font-size:14px; line-height:1.6; font-weight:700; color:#111111;",
    ul: "margin:14px 0 14px 1.4em; padding:0; color:#222222;",
    li: "margin:6px 0; font-size:16px; line-height:1.8;",
    blockquote:
      "margin:18px 0; padding:12px 16px; border-left:4px solid #d0d7de; background:#f7f8fa; color:#555555;",
    blockquoteP: "margin:0; font-size:15px; line-height:1.75; color:#555555;",
    pre: "margin:18px 0; padding:14px 16px; border-radius:8px; background:#f6f8fa; overflow-x:auto; font-size:14px; line-height:1.7;",
    code:
      "padding:2px 6px; border-radius:4px; background:#f3f4f6; color:#c7254e; font-family:Consolas, Monaco, monospace; font-size:0.92em;",
    strong: "font-weight:700; color:#111111;",
    em: "font-style:italic;",
    link: "color:#356dce; text-decoration:none;",
    figure: "margin:22px 0; text-align:center;",
    image: "display:block; width:100%; max-width:100%; border-radius:8px; margin:0 auto;",
    figcaption: "margin-top:8px; font-size:12px; line-height:1.6; color:#7a7a7a; text-align:center;",
    intro: "margin:24px 0; padding:14px 16px; border-radius:10px; background:#f7f8fa; border:1px solid #eceff3;",
    introP: "margin:0; font-size:15px; line-height:1.8; color:#555b63; text-align:left;",
    card: "margin:24px 0; padding:16px 18px; border-radius:10px; background:#ffffff; border:1px solid #e3e7ee; box-shadow:0 2px 10px rgba(17,24,39,0.04);",
    cardP: "margin:0; font-size:15px; line-height:1.8; color:#4f5660; text-align:left;",
    quoteBox: "margin:26px 0; padding:16px 18px; border-left:4px solid #c8d0da; background:#fafbfc;",
    quoteP: "margin:0; font-size:16px; line-height:1.86; color:#30363d; text-align:left; font-weight:600;",
  },
  official: {
    body: "max-width:100%; color:#2f2f2f; word-break:break-word; letter-spacing:0.02em; padding:8px 0;",
    p: "margin:18px 0; font-size:15.5px; line-height:1.95; color:#2f2f2f; text-align:justify;",
    h1: "margin:32px 0 22px; font-size:31px; line-height:1.45; font-weight:700; text-align:center; color:#1f1f1f; padding-bottom:10px; border-bottom:1px solid #dedede;",
    h2: "margin:30px 0 16px; padding:8px 12px; border-left:4px solid #1f1f1f; background:#f3f3f3; font-size:22px; line-height:1.55; font-weight:700; color:#1f1f1f;",
    h3: "margin:24px 0 14px; font-size:19px; line-height:1.65; font-weight:700; color:#1f1f1f;",
    h4: "margin:20px 0 10px; font-size:16px; line-height:1.7; font-weight:700; color:#1f1f1f;",
    h5: "margin:16px 0 8px; font-size:15px; line-height:1.7; font-weight:700; color:#1f1f1f;",
    h6: "margin:16px 0 8px; font-size:14px; line-height:1.7; font-weight:700; color:#1f1f1f;",
    ul: "margin:18px 0 18px 1.6em; padding:0; color:#2f2f2f;",
    li: "margin:8px 0; font-size:16px; line-height:1.92;",
    blockquote:
      "margin:24px 0; padding:16px 18px; border-left:4px solid #bfbfbf; background:#f8f8f8; color:#555555;",
    blockquoteP: "margin:0; font-size:15px; line-height:1.9; color:#555555; text-align:left;",
    pre: "margin:20px 0; padding:16px 18px; border-radius:8px; background:#f7f7f7; overflow-x:auto; font-size:14px; line-height:1.75;",
    code:
      "padding:2px 6px; border-radius:4px; background:#f2f2f2; color:#a13a3a; font-family:Consolas, Monaco, monospace; font-size:0.92em;",
    strong: "font-weight:700; color:#1f1f1f;",
    em: "font-style:italic;",
    link: "color:#2b5db9; text-decoration:none;",
    figure: "margin:26px 0; text-align:center; padding:10px; background:#fafafa; border:1px solid #ececec;",
    image: "display:block; width:100%; max-width:100%; border:1px solid #dcdcdc; border-radius:2px; margin:0 auto;",
    figcaption: "margin-top:10px; font-size:12px; line-height:1.7; color:#777777; text-align:center; letter-spacing:0.02em;",
    intro: "margin:26px 0; padding:16px 18px; border:1px solid #dfdfdf; background:#f8f8f8;",
    introP: "margin:0; font-size:15px; line-height:1.9; color:#555555; text-align:left;",
    card: "margin:28px 0; padding:18px 20px; border:1px solid #d8d8d8; background:#fcfcfc; border-radius:8px;",
    cardP: "margin:0; font-size:15px; line-height:1.9; color:#444444; text-align:left;",
    quoteBox: "margin:28px 0; padding:18px 20px; border-left:4px solid #a6a6a6; background:#f7f7f7;",
    quoteP: "margin:0; font-size:16px; line-height:1.92; color:#333333; text-align:left; font-weight:700;",
  },
  khazix: {
    body: "max-width:100%; color:#23201d; word-break:break-word; letter-spacing:0.01em; padding:8px 14px; background:#fdfaf5; border-radius:14px;",
    p: "margin:20px 0; font-size:17.5px; line-height:2.05; color:#23201d; text-align:left;",
    h1: "margin:34px 0 24px; font-size:32px; line-height:1.45; font-weight:700; text-align:left; color:#171412;",
    h2: "margin:34px 0 18px; font-size:24px; line-height:1.58; font-weight:700; color:#171412; padding-bottom:8px; border-bottom:1px solid #eadfce;",
    h3: "margin:26px 0 14px; font-size:19px; line-height:1.7; font-weight:700; color:#171412;",
    h4: "margin:20px 0 10px; font-size:16px; line-height:1.78; font-weight:700; color:#171412;",
    h5: "margin:16px 0 8px; font-size:15px; line-height:1.75; font-weight:700; color:#171412;",
    h6: "margin:16px 0 8px; font-size:14px; line-height:1.75; font-weight:700; color:#171412;",
    ul: "margin:20px 0 20px 1.5em; padding:0; color:#23201d;",
    li: "margin:8px 0; font-size:17px; line-height:1.98;",
    blockquote:
      "margin:26px 0; padding:16px 18px; border-left:4px solid #c49a6c; background:#faf6f0; color:#6d5a49;",
    blockquoteP: "margin:0; font-size:16px; line-height:1.95; color:#6d5a49; text-align:left;",
    pre: "margin:20px 0; padding:16px 18px; border-radius:8px; background:#f7f3ee; overflow-x:auto; font-size:14px; line-height:1.75;",
    code:
      "padding:2px 6px; border-radius:4px; background:#f3eee8; color:#8a4d2f; font-family:Consolas, Monaco, monospace; font-size:0.92em;",
    strong: "font-weight:700; color:#171412;",
    em: "font-style:italic;",
    link: "color:#9a5a2c; text-decoration:none;",
    figure: "margin:30px 0; text-align:center;",
    image: "display:block; width:100%; max-width:100%; border-radius:14px; margin:0 auto; box-shadow:0 8px 24px rgba(87,61,39,0.12);",
    figcaption: "margin-top:10px; font-size:13px; line-height:1.75; color:#8a745f; text-align:center;",
    intro: "margin:28px 0; padding:18px 20px; border-radius:14px; background:#faf4eb; border:1px solid #eadfce;",
    introP: "margin:0; font-size:16px; line-height:1.92; color:#6d5a49; text-align:left;",
    card: "margin:30px 0; padding:20px 22px; border-radius:14px; background:#fffaf4; border:1px solid #eadfce; box-shadow:0 6px 20px rgba(87,61,39,0.06);",
    cardP: "margin:0; font-size:16px; line-height:1.95; color:#4f4338; text-align:left;",
    quoteBox: "margin:30px 0; padding:18px 20px; border-left:4px solid #c49a6c; background:#faf6f0;",
    quoteP: "margin:0; font-size:17px; line-height:1.95; color:#43372e; text-align:left; font-weight:700;",
  },
  bijixia: {
    body: "max-width:100%; color:#6a6f78; word-break:break-word; padding:0; background:#ffffff;",
    p: "margin:20px 0; font-size:15.5px; line-height:1.88; color:#595d64; text-align:justify;",
    h1: "margin:16px 0 18px; font-size:27px; line-height:1.35; font-weight:800; text-align:left; color:#111111;",
    h2: "margin:32px auto 20px; font-size:17.5px; line-height:1.5; font-weight:800; text-align:center; color:#d73a31; padding-bottom:8px; border-bottom:2px solid #d73a31; width:max-content; max-width:100%;",
    h3: "margin:26px 0 14px; font-size:16px; line-height:1.68; font-weight:800; color:#111111; border-bottom:2px solid #c8ccd2; display:inline-block; padding-bottom:4px;",
    h4: "margin:22px 0 10px; font-size:15px; line-height:1.78; font-weight:800; color:#d73a31;",
    h5: "margin:18px 0 8px; font-size:14px; line-height:1.78; font-weight:700; color:#111111;",
    h6: "margin:16px 0 8px; font-size:13px; line-height:1.78; font-weight:700; color:#111111;",
    ul: "margin:18px 0 18px 1.5em; padding:0; color:#595d64;",
    li: "margin:8px 0; font-size:15px; line-height:1.9;",
    blockquote:
      "margin:28px 0; padding:18px 18px; border:1px solid #d7dde6; border-radius:8px; background:#f7f8fa; color:#6a6f78;",
    blockquoteP: "margin:0; font-size:14.5px; line-height:1.86; color:#6a6f78; text-align:left;",
    pre: "margin:20px 0; padding:16px 18px; border-radius:10px; background:#f6f7f9; border:1px solid #e6e8ee; overflow-x:auto; font-size:14px; line-height:1.75;",
    code:
      "padding:2px 6px; border-radius:4px; background:#f2f4f7; color:#d73a31; font-family:Consolas, Monaco, monospace; font-size:0.92em;",
    strong: "font-weight:800; color:#2f3338;",
    em: "font-style:italic; color:#d73a31;",
    link: "color:#5975b9; text-decoration:none;",
    figure: "margin:24px 0; text-align:center;",
    image: "display:block; width:100%; max-width:100%; border-radius:0; margin:0 auto;",
    figcaption: "margin-top:8px; font-size:12px; line-height:1.7; color:#949aa3; text-align:center;",
    intro: "margin:24px 0; padding:16px 18px; border-radius:8px; background:#f6f7f9; border:1px solid #e4e8ee;",
    introP: "margin:0; font-size:14.5px; line-height:1.88; color:#6f7680; text-align:left;",
    card: "margin:26px 0; padding:18px 20px; border-radius:8px; background:#f7f8fa; border:1px solid #d9dee7;",
    cardP: "margin:0; font-size:14.5px; line-height:1.88; color:#595d64; text-align:left;",
    quoteBox: "margin:28px 0; padding:16px 18px; border-left:4px solid #d73a31; background:#fff7f6;",
    quoteP: "margin:0; font-size:15.5px; line-height:1.88; color:#3a3f45; text-align:left; font-weight:700;",
  },
};

function getTheme(themeName) {
  const key = String(themeName || "minimal").toLowerCase();
  return themes[key] ?? themes.minimal;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function applyInline(text, theme) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="${theme.strong}">$1</strong>`)
    .replace(/\*(.+?)\*/g, `<em style="${theme.em}">$1</em>`)
    .replace(/`([^`]+)`/g, `<code style="${theme.code}">$1</code>`)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      const caption = alt ? `<figcaption style="${theme.figcaption}">${escapeHtml(alt)}</figcaption>` : "";
      return `<figure style="${theme.figure}"><img src="${src}" alt="${escapeHtml(alt)}" style="${theme.image}" />${caption}</figure>`;
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="${theme.link}">$1</a>`);
}

function flushParagraph(lines, html, theme) {
  if (lines.length === 0) {
    return;
  }
  html.push(`<p style="${theme.p}">${applyInline(lines.join("<br/>"), theme)}</p>`);
  lines.length = 0;
}

function flushList(items, html, theme) {
  if (items.length === 0) {
    return;
  }
  html.push(`<ul style="${theme.ul}">`);
  for (const item of items) {
    html.push(`<li style="${theme.li}">${applyInline(item, theme)}</li>`);
  }
  html.push("</ul>");
  items.length = 0;
}

function flushCustomBlock(type, lines, html, theme) {
  if (!type) {
    return;
  }
  const paragraphs = lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const containerStyle =
    type === "intro" ? theme.intro : type === "card" ? theme.card : theme.quoteBox;
  const paragraphStyle =
    type === "intro" ? theme.introP : type === "card" ? theme.cardP : theme.quoteP;

  html.push(`<section style="${containerStyle}">`);
  for (const paragraph of paragraphs) {
    html.push(`<p style="${paragraphStyle}">${applyInline(paragraph.replace(/\n/g, "<br/>"), theme)}</p>`);
  }
  html.push(`</section>`);
}

function markdownToHtml(markdown, themeName = "minimal") {
  const theme = getTheme(themeName);
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const paragraph = [];
  const list = [];
  let inCode = false;
  const codeLines = [];
  let customBlockType = "";
  const customBlockLines = [];

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph(paragraph, html, theme);
      flushList(list, html, theme);

      if (inCode) {
        html.push(
          `<pre style="${theme.pre}"><code style="font-family:Consolas, Monaco, monospace;">${escapeHtml(codeLines.join("\n"))}</code></pre>`
        );
        codeLines.length = 0;
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    const customBlockFence = /^:::(intro|card|quote)\s*$/.exec(line.trim());
    if (customBlockFence) {
      flushParagraph(paragraph, html, theme);
      flushList(list, html, theme);
      customBlockType = customBlockFence[1];
      customBlockLines.length = 0;
      continue;
    }

    if (customBlockType) {
      if (/^:::\s*$/.test(line.trim())) {
        flushCustomBlock(customBlockType, customBlockLines, html, theme);
        customBlockType = "";
        customBlockLines.length = 0;
      } else {
        customBlockLines.push(rawLine);
      }
      continue;
    }

    if (!line) {
      flushParagraph(paragraph, html, theme);
      flushList(list, html, theme);
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph(paragraph, html, theme);
      flushList(list, html, theme);
      const level = heading[1].length;
      const headingStyle = theme[`h${level}`] ?? theme.h6;
      html.push(`<h${level} style="${headingStyle}">${applyInline(heading[2], theme)}</h${level}>`);
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      flushParagraph(paragraph, html, theme);
      flushList(list, html, theme);
      html.push(
        `<blockquote style="${theme.blockquote}"><p style="${theme.blockquoteP}">${applyInline(quote[1], theme)}</p></blockquote>`
      );
      continue;
    }

    const listItem = /^[-*]\s+(.+)$/.exec(line);
    if (listItem) {
      flushParagraph(paragraph, html, theme);
      list.push(listItem[1]);
      continue;
    }

    flushList(list, html, theme);
    paragraph.push(line);
  }

  flushParagraph(paragraph, html, theme);
  flushList(list, html, theme);
  if (customBlockType) {
    flushCustomBlock(customBlockType, customBlockLines, html, theme);
  }

  return `<section style="${theme.body}">\n${html.join("\n")}\n</section>`;
}

async function main() {
  const [, , inputPath, outputPath, themeName = "minimal"] = process.argv;
  if (!inputPath) {
    console.error("Usage: node markdown-to-wechat-html.mjs <input.md> [output.html] [theme]");
    process.exit(1);
  }

  const markdown = await readFile(inputPath, "utf8");
  const html = markdownToHtml(markdown, themeName);

  if (outputPath) {
    await writeFile(outputPath, html, "utf8");
  } else {
    process.stdout.write(html);
  }
}

await main();

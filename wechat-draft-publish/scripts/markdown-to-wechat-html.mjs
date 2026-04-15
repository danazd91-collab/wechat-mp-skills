import { readFile, writeFile } from "node:fs/promises";

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function applyInline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function flushParagraph(lines, html) {
  if (lines.length === 0) {
    return;
  }
  html.push(`<p>${applyInline(lines.join("<br/>"))}</p>`);
  lines.length = 0;
}

function flushList(items, html) {
  if (items.length === 0) {
    return;
  }
  html.push("<ul>");
  for (const item of items) {
    html.push(`<li>${applyInline(item)}</li>`);
  }
  html.push("</ul>");
  items.length = 0;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const paragraph = [];
  const list = [];
  let inCode = false;
  const codeLines = [];

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph(paragraph, html);
      flushList(list, html);

      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
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

    if (!line) {
      flushParagraph(paragraph, html);
      flushList(list, html);
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph(paragraph, html);
      flushList(list, html);
      const level = heading[1].length;
      html.push(`<h${level}>${applyInline(heading[2])}</h${level}>`);
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      flushParagraph(paragraph, html);
      flushList(list, html);
      html.push(`<blockquote><p>${applyInline(quote[1])}</p></blockquote>`);
      continue;
    }

    const listItem = /^[-*]\s+(.+)$/.exec(line);
    if (listItem) {
      flushParagraph(paragraph, html);
      list.push(listItem[1]);
      continue;
    }

    flushList(list, html);
    paragraph.push(line);
  }

  flushParagraph(paragraph, html);
  flushList(list, html);

  return html.join("\n");
}

async function main() {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath) {
    console.error("Usage: node markdown-to-wechat-html.mjs <input.md> [output.html]");
    process.exit(1);
  }

  const markdown = await readFile(inputPath, "utf8");
  const html = markdownToHtml(markdown);

  if (outputPath) {
    await writeFile(outputPath, html, "utf8");
  } else {
    process.stdout.write(html);
  }
}

await main();

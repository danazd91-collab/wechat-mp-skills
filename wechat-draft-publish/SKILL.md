---
name: wechat-draft-publish
description: Publish finished article content into a WeChat Official Account draft box through a local bridge service. Use when the user says things like "把这篇发到公众号草稿箱", "帮我推到公众号草稿箱", "发布到微信公众号草稿箱", "把这篇文章存成公众号草稿", or asks to send a Markdown article into WeChat drafts.
---

# WeChat Draft Publish

## Overview

Use this skill after the article content is already finalized and should be sent into a WeChat Official Account draft box.

Treat plain-language requests such as `把这篇发到公众号草稿箱`, `帮我推到公众号草稿箱`, and `把这个 Markdown 发到公众号草稿箱` as direct triggers.

Read [references/minimal-plan.md](references/minimal-plan.md) when you need the architecture, file layout, or request schema.

## Workflow

1. Confirm the article body is ready.
   - If the user says "这篇", infer the current article content or the file they most recently referenced.
2. Confirm the payload has the minimum required fields:
   - title
   - article body
   - `thumbMediaId` or `coverImagePath`
3. If the article is Markdown, convert it with the bundled converter instead of asking the user to do it manually.
4. Check that the local bridge service is reachable at `http://127.0.0.1:8787/health`.
5. Publish with:

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\publish-markdown-to-wechat-draft.ps1" `
  -MarkdownFile "D:\path\article.md" `
  -CoverImagePath "D:\path\cover.jpg"
```

6. Return the `mediaId`, final title, and file path used for publishing.

## Validation Rules

- Do not publish if the article is unfinished.
- Do not publish if neither `thumbMediaId` nor `coverImagePath` is available.
- Stop and ask when the cover image is missing.
- Prefer the first Markdown `# ` heading as the title when no explicit title is passed.
- Use the local scripts in this skill folder, not browser automation.

## Common Commands

Start the local bridge service:

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\start-wechat-draft-service.ps1"
```

Publish a Markdown article:

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\publish-markdown-to-wechat-draft.ps1" `
  -MarkdownFile "D:\path\article.md" `
  -CoverImagePath "D:\path\cover.jpg"
```

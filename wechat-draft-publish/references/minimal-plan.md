# WeChat Draft Publish Minimal Plan

## Goal

Provide the smallest useful path from finished article content to a WeChat Official Account draft box.

## Components

1. `scripts/wechat-draft-service.mjs`
   - Local Node.js bridge service
   - Fetches `access_token`
   - Uploads a cover image when needed
   - Calls WeChat `draft/add`

2. `scripts/markdown-to-wechat-html.mjs`
   - Minimal Markdown to HTML converter

3. `scripts/publish-to-wechat-draft.ps1`
   - Sends HTML payloads to the bridge service

4. `scripts/publish-markdown-to-wechat-draft.ps1`
   - Converts Markdown to HTML
   - Calls the publish script

5. `scripts/start-wechat-draft-service.ps1`
   - Loads `.env`
   - Starts the local service

## Required Environment Variables

- `WECHAT_APP_ID`
- `WECHAT_APP_SECRET`
- `WECHAT_SERVICE_PORT` optional, default `8787`
- `WECHAT_DEFAULT_AUTHOR` optional
- `WECHAT_DEFAULT_DIGEST` optional

## Request Shape

```json
{
  "title": "Article title",
  "author": "Author name",
  "digest": "Short summary",
  "content": "<p>HTML body</p>",
  "thumbMediaId": "",
  "coverImagePath": "D:\\path\\cover.jpg",
  "contentSourceUrl": ""
}
```

## Notes

- This workflow uses official WeChat API access, not browser automation
- The publishing machine's public IP must be added to the WeChat Official Account IP whitelist

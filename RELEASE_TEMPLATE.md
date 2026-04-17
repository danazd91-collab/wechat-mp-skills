# Release Template

复制下面这段到 GitHub Release notes，再按当前版本号替换标题即可。

```md
## wechat-draft-publish vX.Y.Z

This release updates the `wechat-draft-publish` skill and its local publishing workflow.

### Included assets

- `wechat-draft-publish.skill` — recommended install package for Skill users
- `wechat-draft-publish.zip` — source archive for manual inspection or custom installation

### Highlights

- Markdown -> WeChat HTML conversion
- Local bridge service for WeChat Official Account drafts
- Natural-language draft publishing flow
- Multiple article themes (`minimal`, `official`, `khazix`, `bijixia`)
- Semantic blocks support:
  - `:::intro`
  - `:::card`
  - `:::quote`

### Before use

1. Configure `WECHAT_APP_ID` and `WECHAT_APP_SECRET`
2. Add your machine public IP to the WeChat Official Account API whitelist
3. Start the local bridge service

### Typical use cases

- Publish local Markdown articles into WeChat drafts
- Send current conversation content into WeChat drafts
- Reuse the same publishing workflow across Codex, Claude Code, and similar agent environments
```

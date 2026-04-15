# 微信公众号草稿箱发布 Prompt

当用户说：

- 把这篇发到公众号草稿箱
- 帮我推到公众号草稿箱
- 把这个 Markdown 发到微信公众号草稿箱

请按下面流程执行：

1. 确认文章内容已经定稿
2. 确认存在 Markdown 文件路径，或把当前对话中的成稿落成临时 Markdown 文件
3. 确认存在封面图片路径，或者用户给了 `thumbMediaId`
4. 检查本地服务：
   - `Invoke-RestMethod http://127.0.0.1:8787/health`
5. 调用发布脚本：

```powershell
powershell -ExecutionPolicy Bypass -File "C:\path\to\wechat-draft-publish\scripts\publish-markdown-to-wechat-draft.ps1" `
  -MarkdownFile "D:\path\article.md" `
  -CoverImagePath "D:\path\cover.jpg"
```

6. 返回：
   - 是否成功
   - `mediaId`
   - 最终标题
   - 实际使用的文件路径

注意：

- 如果没有封面，不要直接发，先向用户索取
- 如果文章未定稿，不要直接发
- 如果标题未显式提供，默认使用 Markdown 第一行 `# 标题`

# 发文检查清单

每次发文前，按这份清单过一遍，避免边发边改。

## 一、内容检查

- 标题已经最终确定
- 导语已经写好
- 至少有 2 到 3 个小标题
- 有一句能被单独拎出来的重点句
- 说明性内容已经放进 `card`
- 金句 / 结论已经放进 `quote`

## 二、Markdown 结构检查

- 第一行是 `# 标题`
- `:::intro / :::card / :::quote` 成对闭合
- 图片语法正确：`![图片说明](图片地址)`
- 没有把样式直接写进正文
- 列表、分隔线、引用都按标准 Markdown 写法使用

## 三、封面与素材检查

- 封面图路径正确
- 封面图尺寸和内容可用
- 正文图片路径正确
- 图注没有写得过长

## 四、发布前技术检查

- 本地桥接服务已经启动
- `http://127.0.0.1:8787/health` 可访问
- `WECHAT_APP_ID / WECHAT_APP_SECRET` 配置正常
- 当前机器出口 IP 仍在微信公众号后台白名单内

## 五、发布命令检查

默认推荐：

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\86188\plugins\wechat-draft-publisher\publish-wechat-draft.ps1" `
  -MarkdownFile "D:\path\article.md" `
  -CoverImagePath "D:\path\cover.jpg" `
  -Theme "bijixia"
```

确认：

- Markdown 文件路径正确
- 封面图路径正确
- 主题已选好

## 六、草稿箱里最终检查

- 标题是否正确
- 摘要是否正确
- 封面图是否正常
- 正文字号 / 行距是否符合预期
- `intro / card / quote` 是否渲染正确
- 图片、图注、留白是否自然

## 七、发后复盘

每篇发完后只记两件事：

1. 这次最卡的点是什么
2. 下次最想优化的一件事是什么

不要一次记太多，只记最真实的那个问题。

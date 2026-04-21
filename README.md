# WeChat MP Skills

把“写完文章 -> 推到微信公众号草稿箱”这条链路整理成可复用的 Prompt、Skill 和本地发布脚本。

这个仓库现在主要提供一套已经跑通的微信公众号草稿箱工作流，支持：

- 在 Codex / Claude Code 等 Agent 环境里自然语言触发发布
- 把 Markdown 转成适合公众号长文的 HTML
- 使用不同排版主题发布到草稿箱
- 用语义块写作，再交给主题统一渲染

## 推荐给谁用 / 最适合什么场景

这套仓库尤其适合下面这几类人：

- 经常写公众号长文，想把“写完 -> 排版 -> 发草稿箱”固定成流程的人
- 已经在用 Codex / Claude Code，希望让 Agent 直接接住发文动作的人
- 想把公众号排版沉淀成主题，而不是每篇重新调格式的人
- 想把本地可用脚本进一步整理成 Skill、Prompt、Release 的人

最适合的场景包括：

- 个人公众号的长文发布
- 团队内部的内容工作流沉淀
- AI 协作写作与发布实验
- 把 Markdown 写作直接接进公众号草稿箱的自动化链路

## 这套仓库适合谁

- 想把公众号发布动作做成工作流的人
- 想让 Agent 直接帮自己推草稿箱的人
- 想把公众号长文排版沉淀成可复用主题的人
- 想把本地可用脚本整理成开源 Skill 的人

## 你能得到什么

### Prompt

轻量级版本，适合没有原生 Skill 机制的 Agent。

- [wechat-draft-publish](./prompts/wechat-draft-publish.md)

### Skill

重量级版本，适合支持本地 Skill 的 Agent。

- [wechat-draft-publish](./wechat-draft-publish)

它包含：

- 本地桥接服务
- Markdown -> HTML 转换器
- 发布到公众号草稿箱的脚本
- 多主题排版
- 语义块支持
- 最小配置说明

## 当前能力

### 发布链路

- Markdown 发布到公众号草稿箱
- HTML 发布到公众号草稿箱
- 当前对话内容落成临时 Markdown 后再发草稿箱
- 自然语言触发，例如：
  - `把这篇发到公众号草稿箱`
  - `按 bijixia 排版发到公众号草稿箱`

### 主题

- `minimal`：简洁、克制，适合大多数正文
- `official`：更正式一点的标题层级和留白
- `khazix`：更偏叙事型公众号长文的暖色排版
- `bijixia`：偏内容型、偏编辑感的公众号长文排版

### 语义块

- `:::intro ... :::`：导语 / 编者按
- `:::card ... :::`：信息卡片 / 说明块
- `:::quote ... :::`：金句 / 强调引用

## 快速开始

### 1. 安装 Skill

如果你的 Agent 支持按 GitHub 仓库地址安装 Skill，可以直接使用：

```text
安装这个 skill: https://github.com/danazd91-collab/wechat-mp-skills
```

对于 Codex，也可以显式指定仓库路径安装：

```powershell
python "C:\Users\86188\.codex\skills\.system\skill-installer\scripts\install-skill-from-github.py" `
  --repo danazd91-collab/wechat-mp-skills `
  --path wechat-draft-publish
```

如果你更喜欢手动安装，也可以：

```powershell
git clone https://github.com/danazd91-collab/wechat-mp-skills.git
```

然后把 `wechat-draft-publish/` 目录复制到对应 Agent 的 Skills 目录：

| 工具 | 路径 |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| Codex | `~/.codex/skills/` 或 `~/.agents/skills/` |
| 其他支持本地 Skill 的 Agent | 对应工具自己的 `skills` 目录 |

### 2. 配置公众号凭证

1. 复制 `.env.example` 为 `.env`
2. 填入：
   - `WECHAT_APP_ID`
   - `WECHAT_APP_SECRET`
3. 把当前机器出口 IP 加入微信公众号后台的 IP 白名单

### 3. 启动本地服务

```powershell
powershell -ExecutionPolicy Bypass -File "C:\path\to\wechat-draft-publish\scripts\start-wechat-draft-service.ps1"
```

### 4. 发布一篇 Markdown

```powershell
powershell -ExecutionPolicy Bypass -File "C:\path\to\wechat-draft-publish\publish-wechat-draft.ps1" `
  -MarkdownFile "D:\path\article.md" `
  -CoverImagePath "D:\path\cover.jpg" `
  -Theme "bijixia"
```

## 推荐工作流

如果你准备把这套 Skill 真正放进日常发文流程，最推荐按下面这条顺序走：

1. 先用 Markdown 模板写稿：
   - [markdown-article-template.md](./wechat-draft-publish/references/markdown-article-template.md)
2. 写完后，用检查清单过一遍：
   - [publish-checklist.md](./wechat-draft-publish/references/publish-checklist.md)
3. 再用 `bijixia` 或你习惯的主题发到公众号草稿箱

这条工作流的核心是：

- 用 Markdown 先把结构写清楚
- 用主题统一渲染排版
- 在发草稿箱前固定检查，不在发布时临时想流程

如果你主要写公众号长文，建议先默认用：

- 模板：`markdown-article-template.md`
- 主题：`bijixia`
- 发布前检查：`publish-checklist.md`

## Markdown 写法建议

最小结构就够用：

```md
# 主标题

:::intro
这里是导语。
:::

## 小标题

正文段落。

:::quote
这里是一句金句。
:::

:::card
这里是说明块 / 简介块。
:::
```

## Release 使用方式

仓库内置了打包脚本：

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\build-release.ps1"
```

运行后会生成两种安装包：

- `releases/wechat-draft-publish.skill`
- `releases/wechat-draft-publish.zip`

推荐在 GitHub Releases 里同时上传这两个文件：

- `.skill`：给 Skill 用户直接安装
- `.zip`：方便解压查看内容

Releases 页面：

- [https://github.com/danazd91-collab/wechat-mp-skills/releases](https://github.com/danazd91-collab/wechat-mp-skills/releases)

如果你准备发一个新 Release，可以直接参考：

- [RELEASE_TEMPLATE.md](./RELEASE_TEMPLATE.md)

## 仓库结构

```text
wechat-mp-skills/
├── .gitignore
├── LICENSE
├── README.md
├── RELEASE_TEMPLATE.md
├── prompts/
│   └── wechat-draft-publish.md
├── releases/
│   ├── .gitkeep
│   ├── wechat-draft-publish.skill
│   └── wechat-draft-publish.zip
├── scripts/
│   └── build-release.ps1
└── wechat-draft-publish/
    ├── .env.example
    ├── SKILL.md
    ├── publish-wechat-draft.ps1
    ├── references/
    │   ├── bijixia-theme.md
    │   └── minimal-plan.md
    └── scripts/
        ├── markdown-to-wechat-html.mjs
        ├── publish-markdown-to-wechat-draft.ps1
        ├── publish-to-wechat-draft.ps1
        ├── start-wechat-draft-service.ps1
        └── wechat-draft-service.mjs
```

## 自然语言触发示例

安装后，在支持 Skill 的 Agent 里可以这样说：

- `把这篇发到公众号草稿箱`
- `帮我推到公众号草稿箱`
- `把这个 Markdown 发到微信公众号草稿箱`
- `按 bijixia 排版发到公众号草稿箱`

## 安全说明

- 不要把真实 `.env` 提交到仓库
- 不要把真实 `AppSecret` 放进 README、截图或 Release 文件里
- 如果你重置了公众号的 `AppSecret`，记得同步更新本地 `.env`

## License

[MIT](./LICENSE)

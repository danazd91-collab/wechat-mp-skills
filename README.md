# WeChat MP Skills

微信公众号草稿箱发布相关的可复用 Prompts 和 Skills。

这里沉淀的目标很明确：

- 把“写完文章 -> 推到公众号草稿箱”这条链路整理成可安装的 Agent Skill
- 让这套流程既能在 Codex 里用，也方便迁移到 Claude Code、OpenClaw 或其他支持 Skill / Prompt 的 Agent 环境

两种东西，一个目的：把已经跑通的工作流变成可复用的工具。

- `Prompts`：轻量级，复制粘贴到任何 AI 对话或 Agent 里就能用
- `Skills`：重量级，带结构化指令、脚本和参考文档，安装后 Agent 可以更稳定地调用

## 仓库结构

```text
wechat-mp-skills/
├── .gitignore
├── LICENSE
├── README.md
├── prompts/
│   └── wechat-draft-publish.md
├── releases/
│   └── .gitkeep
├── scripts/
│   └── build-release.ps1
└── wechat-draft-publish/
    ├── .env.example
    ├── SKILL.md
    ├── references/
    │   └── minimal-plan.md
    └── scripts/
        ├── markdown-to-wechat-html.mjs
        ├── publish-markdown-to-wechat-draft.ps1
        ├── publish-to-wechat-draft.ps1
        ├── start-wechat-draft-service.ps1
        └── wechat-draft-service.mjs
```

## Prompts

| Prompt | 说明 | 用法 |
| --- | --- | --- |
| [wechat-draft-publish](./prompts/wechat-draft-publish.md) | 公众号草稿箱发布 Prompt，适合没有原生 Skill 机制的 Agent | 复制 Prompt，补充文章文件路径和封面路径，丢进任意支持执行命令的 Agent |

## Skills

| Skill | 说明 |
| --- | --- |
| [wechat-draft-publish](./wechat-draft-publish) | 把 Markdown 或当前对话里的成稿推到微信公众号草稿箱，包含本地桥接服务、Markdown 转 HTML、发布脚本和最小配置说明 |

## Skill 安装方式

### 通过 Agent 安装

如果你的 Agent 支持“按 GitHub 仓库地址安装 Skill”，可以直接使用仓库地址。

示例：

```text
安装这个 skill: https://github.com/你的用户名/wechat-mp-skills
```

对于 Codex，也可以显式指定仓库路径安装：

```powershell
python "C:\Users\86188\.codex\skills\.system\skill-installer\scripts\install-skill-from-github.py" `
  --repo 你的用户名/wechat-mp-skills `
  --path wechat-draft-publish
```

### Git Clone 安装

如果你不想走 Agent 的自动安装流程，也可以直接拉仓库后手动复制：

```powershell
git clone https://github.com/你的用户名/wechat-mp-skills.git
```

然后把 `wechat-draft-publish/` 目录复制到你的 Skill 目录下。

### 手动安装

你可以直接把仓库里的 `wechat-draft-publish/` 目录复制到对应 Agent 的 Skills 目录。

各工具常见安装路径参考：

| 工具 | 路径 |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| Codex | `~/.codex/skills/` 或 `~/.agents/skills/` |
| OpenClaw / 其他支持本地 Skill 的 Agent | 对应工具自己的 `skills` 目录 |

复制完成后，重启对应 Agent。

### Release 安装包

仓库根目录提供了一个打包脚本，可以把 `wechat-draft-publish/` 目录打成一个可发布的 `.skill` 包。

运行：

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\build-release.ps1"
```

生成物会出现在：

```text
releases/wechat-draft-publish.skill
```

你后面可以把这个文件放到 GitHub Releases 页面，方便别人下载后手动安装。

## 最小使用流程

1. 复制 `.env.example` 为 `.env`
2. 填入公众号配置：
   - `WECHAT_APP_ID`
   - `WECHAT_APP_SECRET`
3. 把当前机器出口 IP 加入微信公众号后台的 IP 白名单
4. 启动本地服务
5. 调用发布脚本，把 Markdown 推到草稿箱

启动服务：

```powershell
powershell -ExecutionPolicy Bypass -File "C:\path\to\wechat-draft-publish\scripts\start-wechat-draft-service.ps1"
```

发布草稿：

```powershell
powershell -ExecutionPolicy Bypass -File "C:\path\to\wechat-draft-publish\scripts\publish-markdown-to-wechat-draft.ps1" `
  -MarkdownFile "D:\path\article.md" `
  -CoverImagePath "D:\path\cover.jpg"
```

## 自然语言触发示例

安装后，在支持 Skill 的 Agent 里可以这样说：

- `把这篇发到公众号草稿箱`
- `帮我推到公众号草稿箱`
- `把这个 Markdown 发到微信公众号草稿箱`

## 安全说明

- 不要把真实 `.env` 提交到仓库
- 不要把真实 `AppSecret` 放进 README、截图或 Release 文件里
- 如果你重置了公众号的 `AppSecret`，记得同步更新本地 `.env`

## License

[MIT](./LICENSE)

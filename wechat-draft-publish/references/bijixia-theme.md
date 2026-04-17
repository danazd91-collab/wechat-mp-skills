# bijixia Theme Notes

`bijixia` 是一套偏内容型、偏编辑感的公众号长文主题，参考了“笔记侠”这类公众号文章的阅读气质。

## 设计目标

- 正文偏灰，不是纯黑
- 行距偏松，但不松散
- 二级标题有红色强调
- 小标题有轻微下划线感
- 信息卡片有浅灰背景或边框
- 整体更像编辑稿，而不是秀米模板风

## 主题特征

### 正文

- 字号：`15.5px`
- 行高：`1.88`
- 颜色：`#595d64`
- 段距：`20px 0`
- 对齐：`justify`

### 标题系统

- `h1`
  - `27px`
  - 左对齐
  - 留白更宽松
- `h2`
  - `17.5px`
  - 红字：`#d73a31`
  - 红色底线
  - 居中
- `h3`
  - `16px`
  - 黑字
  - 浅灰底线

### 强调与引用

- `strong`
  - 更深的强调色：`#2f3338`
- `blockquote`
  - 浅灰背景
  - 细边框
  - 圆角 `8px`
- `quote`
  - 红色左竖线
  - 浅暖底色
  - 更深的文字色，适合金句

### 模块

- `intro`
  - 浅灰背景
  - 细边框
  - 圆角 `8px`
  - 适合导语 / 编者按
- `card`
  - 浅灰背景
  - 细边框
  - 圆角 `8px`
  - 适合说明块 / 简介块

### 图片

- 图片本身不做圆角
- 图注居中
- 图片上下留白比正文更明显，但不过度夸张

## 当前正式参数

```js
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
  blockquote: "margin:28px 0; padding:18px 18px; border:1px solid #d7dde6; border-radius:8px; background:#f7f8fa; color:#6a6f78;",
  blockquoteP: "margin:0; font-size:14.5px; line-height:1.86; color:#6a6f78; text-align:left;",
  pre: "margin:20px 0; padding:16px 18px; border-radius:10px; background:#f6f7f9; border:1px solid #e6e8ee; overflow-x:auto; font-size:14px; line-height:1.75;",
  code: "padding:2px 6px; border-radius:4px; background:#f2f4f7; color:#d73a31; font-family:Consolas, Monaco, monospace; font-size:0.92em;",
  strong: "font-weight:800; color:#2f3338;",
  em: "font-style:italic; color:#d73a31;",
  link: "color:#5975b9; text-decoration:none;",
  figure: "margin:24px 0; text-align:center;",
  image: "display:block; width:100%; max-width:100%; border-radius:0; margin:0 auto;",
  figcaption: "margin-top:8px; font-size:12px; line-height:1.7; color:#949aa3; text-align:center;",
  intro: "margin:24px 0; padding:16px 18px; border-radius:8px; background:#f6f7f9; border:1px solid #e4e8ee;",
  introP: "margin:0; font-size:14.5px; line-height:1.88; color:#6a6f78; text-align:left;",
  card: "margin:26px 0; padding:18px 20px; border-radius:8px; background:#f7f8fa; border:1px solid #d9dee7;",
  cardP: "margin:0; font-size:14.5px; line-height:1.88; color:#595d64; text-align:left;",
  quoteBox: "margin:28px 0; padding:16px 18px; border-left:4px solid #d73a31; background:#fff7f6;",
  quoteP: "margin:0; font-size:15.5px; line-height:1.88; color:#3a3f45; text-align:left; font-weight:700;",
}
```

## 推荐使用方式

适合搭配这些 Markdown 结构：

```md
# 主标题
:::intro
导语
:::

## 章节标题

正文段落

:::quote
金句
:::

:::card
说明块
:::
```

## 后续微调优先级

如果还要继续优化，建议按这个顺序微调：

1. 正文字号和行高
2. 二级标题字号和底线
3. 图片上下留白
4. `intro / card / quote` 三个块之间的区分度

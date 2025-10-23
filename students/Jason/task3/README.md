## 第三节课：Vibe Coding 流程（Jason）

1) 完整项目代码仓库
- 前端静态页 + 本地数据，演示节目列表与摘要查看，便于快速验证信息架构与交互（无需后端）。

2) 项目说明文档（VibeSpecs 流程截图）
- 请将你的 VibeSpecs 流程截图放置到 `docs/vibespecs.png`，并在此粘贴要点：
  - 页面：索引页、节目详情页、合作 CTA。
  - 数据：RSS 源、手动补充节目标签。
  - API：/api/episodes 列表，/api/summary?id=... 摘要。

3) BUG 解决记录
- 2025-10-23：修复 `index.html` 相对路径问题，确保 `app.js` 与 `data/*` 的相对引用在静态服务器与本地双击场景均可用。
- 2025-10-23：为摘要请求引入 `AbortController` 超时与错误提示，避免 Safari 上未捕获异常导致卡死。

目录
- app/index.html 前端列表页
- app/app.js 逻辑
- app/data/episodes.json 示例数据
- docs/vibespecs.png（请替换为你的截图）

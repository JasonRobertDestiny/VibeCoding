## 前端占位说明（RainbowKit + wagmi）

初始化（参考）：
```
npx create-next-app@latest token-frontend
cd token-frontend
npm i wagmi viem @rainbow-me/rainbowkit
```

在 `_app.tsx` 或 `app` 路由中配置 RainbowKit Provider，创建一个转账或申请代币的组件：
- 输入接收地址、数量（VIBE），调用 `transfer`。
- 或通过 `approve` + `transferFrom` 实现申请流程。

示例最小项目：`students/Jason/task4/frontend/token-frontend`
运行步骤：
1. 进入目录：`cd students/Jason/task4/frontend/token-frontend`
2. 安装依赖：`npm i`
3. 开发启动：`npm run dev`
4. 打开：`http://localhost:3000`

注意：将 `app/page.tsx` 中的 `address: "0xYourTokenAddress"` 替换为实际部署的合约地址。

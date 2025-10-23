## 前端占位说明（RainbowKit + wagmi）

初始化（参考）：
```
npx create-next-app@latest token-frontend
cd token-frontend
npm i wagmi viem @rainbow-me/rainbowkit
```

在 `_app.tsx` 中配置 RainbowKit Provider，创建一个转账或申请代币的组件：
- 输入接收地址、数量（VIBE），调用 `transfer`。
- 或通过 `approve` + `transferFrom` 实现申请流程。

将完成的前端放置到 `students/Jason/task4/frontend/` 或链接到你的仓库与部署地址。


## Minimal Next.js + RainbowKit snippet

示例片段（TypeScript）：

```tsx
// app/page.tsx
"use client";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";

const tokenAbi = [
  {"type":"function","name":"transfer","stateMutability":"nonpayable","inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"outputs":[{"type":"bool"}]}
];

export default function Page() {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.1");
  const [status, setStatus] = useState("");

  const onTransfer = async () => {
    setStatus("sending...");
    try {
      await writeContract({
        address: "0xYourTokenAddress",
        abi: tokenAbi as any,
        functionName: "transfer",
        args: [to, parseEther(amount)],
      });
      setStatus("ok");
    } catch (e:any) {
      setStatus(e.message || "failed");
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <p>Connected: {address ?? "not"}</p>
      <input placeholder="to" value={to} onChange={e=>setTo(e.target.value)} />
      <input placeholder="amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button disabled={isPending} onClick={onTransfer}>Transfer</button>
      <p>{status}</p>
    </main>
  );
}
```


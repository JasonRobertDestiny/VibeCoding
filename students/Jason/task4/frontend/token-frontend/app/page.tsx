"use client";
import Providers from './providers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { useState } from 'react';

const tokenAbi = [
  {"type":"function","name":"transfer","stateMutability":"nonpayable","inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"outputs":[{"type":"bool"}]}
];

export default function Page() {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('0.01');
  const [status, setStatus] = useState('');

  const onTransfer = async () => {
    setStatus('sending...');
    try {
      await writeContract({
        address: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '0xYourTokenAddress') as `0x${string}`,
        abi: tokenAbi as any,
        functionName: 'transfer',
        args: [to as `0x${string}`, parseEther(amount)],
      });
      setStatus('ok');
    } catch (e: any) {
      setStatus(e?.message || 'failed');
    }
  };

  return (
    <Providers>
      <main style={{ padding: 24 }}>
        <h1>Token Frontend</h1>
        <ConnectButton />
        <p>Connected: {address ?? 'not'}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="to (0x...)" value={to} onChange={e=>setTo(e.target.value)} />
          <input placeholder="amount (ETH units)" value={amount} onChange={e=>setAmount(e.target.value)} />
          <button disabled={isPending} onClick={onTransfer}>Transfer</button>
        </div>
        <p>{status}</p>
      </main>
    </Providers>
  );
}


"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { BrowserProvider } from "ethers";

/**
 * NOTE:
 * - This file now casts dynamic imports to `any` to avoid TypeScript errors when package types are missing.
 * - Keep the declaration file `types/custom.d.ts` in your project so the compiler recognizes these modules.
 */

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ConnectModal({ open, onClose }: Props) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  async function connectMetaMask() {
    try {
      setConnecting("metamask");
      if (typeof (window as any).ethereum === "undefined") {
        alert("MetaMask not found in this browser.");
        return;
      }
      const provider = new BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
      alert(`Connected MetaMask: ${addr}`);
      onClose();
    } catch (err: any) {
      console.error(err);
      alert("MetaMask connection failed: " + (err?.message || err));
    } finally {
      setConnecting(null);
    }
  }

  async function connectWalletConnect() {
    try {
      setConnecting("walletconnect");
      // dynamic import typed as any
      const WalletConnectProvider: any = (
        await import("@walletconnect/web3-provider")
      ).default;
      const wcProvider = new WalletConnectProvider({
        rpc: {
          // Fantom Opera chain RPC
          250: "https://rpc.ftm.tools",
        },
      });
      // enable session (triggers QR Code if needed)
      await wcProvider.enable();
      const provider = new BrowserProvider(wcProvider as any);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
      alert(`Connected WalletConnect: ${addr}`);
      onClose();
    } catch (err: any) {
      console.error(err);
      alert("WalletConnect failed: " + (err?.message || err));
    } finally {
      setConnecting(null);
    }
  }

  async function connectLedger() {
    try {
      setConnecting("ledger");
      // imports typed as any
      const TransportWebUSB: any = (
        await import("@ledgerhq/hw-transport-webusb")
      ).default;
      const AppEth: any = (await import("@ledgerhq/hw-app-eth")).default;
      // create transport - will ask user to allow WebUSB
      const transport = await TransportWebUSB.create();
      const eth = new AppEth(transport);
      // standard Ethereum derivation path - Fantom uses same address format
      const path = "44'/60'/0'/0/0";
      const res = await eth.getAddress(path, false, true);
      setAddress(res.address);
      alert(`Connected Ledger: ${res.address}`);
      onClose();
    } catch (err: any) {
      console.error(err);
      alert("Ledger connection failed: " + (err?.message || err));
    } finally {
      setConnecting(null);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Connect Wallet">
      <div className="flex flex-col gap-4">
        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/7"
          onClick={connectMetaMask}
        >
          <div className="text-sm font-semibold">MetaMask</div>
          <div className="w-7 h-7">
            <svg viewBox="0 0 24 24" className="w-7 h-7">
              <path d="M2 2h20v20H2z" fill="#FF6A00" />
            </svg>
          </div>
        </div>

        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/7"
          onClick={connectLedger}
        >
          <div className="text-sm font-semibold">Ledger - Fantom app</div>
          <div className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white/90">
              <rect x="2" y="2" width="20" height="20" rx="3" fill="#fff" />
            </svg>
          </div>
        </div>

        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/7"
          onClick={() =>
            alert("Ledger - Ethereum app (same flow as Ledger Fantom)")
          }
        >
          <div className="text-sm font-semibold">Ledger - Ethereum app</div>
          <div className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white/90">
              <rect x="2" y="2" width="20" height="20" rx="3" fill="#fff" />
            </svg>
          </div>
        </div>

        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/7"
          onClick={
            connectMetaMask /* Coinbase Wallet often works via window.ethereum when injected */
          }
        >
          <div className="text-sm font-semibold">Coinbase Wallet</div>
          <div className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" fill="#2D69FF" />
            </svg>
          </div>
        </div>

        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/7"
          onClick={connectWalletConnect}
        >
          <div className="text-sm font-semibold">WalletConnect</div>
          <div className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" fill="#2D9CFF" />
            </svg>
          </div>
        </div>

        {connecting && (
          <div className="text-sm text-gray-400 mt-1">
            Connecting to {connecting}…
          </div>
        )}
        {address && (
          <div className="text-sm text-green-400 mt-1">
            Connected: {address}
          </div>
        )}
      </div>
    </Modal>
  );
}

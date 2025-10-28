"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { BrowserProvider } from "ethers";

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
      const WalletConnectProvider: any = (
        await import("@walletconnect/web3-provider")
      ).default;
      const wcProvider = new WalletConnectProvider({
        rpc: {
          250: "https://rpc.ftm.tools",
        },
      });
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
      const TransportWebUSB: any = (
        await import("@ledgerhq/hw-transport-webusb")
      ).default;
      const AppEth: any = (await import("@ledgerhq/hw-app-eth")).default;
      const transport = await TransportWebUSB.create();
      const eth = new AppEth(transport);
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
        {/* MetaMask */}
        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/10 transition"
          onClick={connectMetaMask}
        >
          <div className="text-sm font-semibold">MetaMask</div>
          <div className="w-8 h-8">
            <img
              src="/brand/metamask.png"
              alt="MetaMask"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Ledger (Fantom app) */}
        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/10 transition"
          onClick={connectLedger}
        >
          <div className="text-sm font-semibold">Ledger - Fantom app</div>
          <div className="w-8 h-8">
            <img
              src="/brand/ledger.png"
              alt="Ledger"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Ledger (Ethereum app) */}
        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/10 transition"
          onClick={() =>
            alert("Ledger - Ethereum app (same flow as Ledger Fantom)")
          }
        >
          <div className="text-sm font-semibold">Ledger - Ethereum app</div>
          <div className="w-8 h-8">
            <img
              src="/brand/ledger.png"
              alt="Ledger Ethereum"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Coinbase */}
        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/10 transition"
          onClick={connectMetaMask}
        >
          <div className="text-sm font-semibold">Coinbase Wallet</div>
          <div className="w-8 h-8">
            <img
              src="/brand/coinbase.jpg"
              alt="Coinbase"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* WalletConnect */}
        <div
          className="bg-white/5 rounded-md px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/10 transition"
          onClick={connectWalletConnect}
        >
          <div className="text-sm font-semibold">WalletConnect</div>
          <div className="w-8 h-8">
            <img
              src="/brand/walletconnect.png"
              alt="WalletConnect"
              className="w-full h-full object-contain"
            />
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

"use client";

import React, { useState } from "react";
import Modal from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RestoreModal({ open, onClose }: Props) {
  const [method, setMethod] = useState<"keystore" | "mnemonic" | "private">(
    "keystore"
  );
  const [fileName, setFileName] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  }

  function handleUnlock() {
    alert(`Mock restore using ${method}.`);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={`Restore wallet   1 / 2`}>
      <div className="space-y-4">
        <div className="flex gap-6">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setMethod("keystore")}
            className={`w-28 h-28 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer ${
              method === "keystore"
                ? "border-[#2173FF] border shadow-md text-[#2173FF]"
                : "border-white/6 text-gray-400"
            }`}
          >
            <div className="text-2xl">🗂️</div>
            <div className="text-sm font-semibold">Keystore</div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setMethod("mnemonic")}
            className={`w-28 h-28 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer ${
              method === "mnemonic"
                ? "border-[#2173FF] border shadow-md text-[#2173FF]"
                : "border-white/6 text-gray-400"
            }`}
          >
            <div className="text-2xl">📝</div>
            <div className="text-sm font-semibold">Mnemonic</div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setMethod("private")}
            className={`w-28 h-28 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer ${
              method === "private"
                ? "border-[#2173FF] border shadow-md text-[#2173FF]"
                : "border-white/6 text-gray-400"
            }`}
          >
            <div className="text-2xl">🔑</div>
            <div className="text-sm font-semibold">Private Key</div>
          </div>
        </div>

        {method === "keystore" && (
          <label className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-[#214ea6] text-[#2173FF] cursor-pointer">
            <input type="file" className="hidden" onChange={handleFile} />
            <span>⬆️</span>
            <span>{fileName ?? "Upload keystore file"}</span>
          </label>
        )}

        {method === "mnemonic" && (
          <textarea
            placeholder="Enter mnemonic phrase"
            className="w-full bg-transparent border border-white/6 rounded-md px-3 py-2 min-h-[100px]"
          />
        )}

        {method === "private" && (
          <input
            placeholder="Enter private key"
            className="w-full bg-transparent border border-white/6 rounded-md px-3 py-2"
          />
        )}

        <label className="block font-semibold">
          Enter your wallet password
        </label>
        <div className="flex items-center gap-2">
          <input
            type="password"
            className="flex-1 bg-transparent border border-white/6 px-3 py-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="text-[#7aa9ff]">👁️</button>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-gradient-to-b from-[#2173FF] to-[#1a62e6] px-6 py-3 rounded-full font-bold"
            onClick={handleUnlock}
          >
            Unlock wallet
          </button>
        </div>
      </div>
    </Modal>
  );
}

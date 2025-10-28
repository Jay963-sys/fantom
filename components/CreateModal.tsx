"use client";

import React, { useState } from "react";
import Modal from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateModal({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);

  const canDownload = password.length >= 8 && password === confirm && agreed;

  function handleDownload() {
    const keystore = { address: "0xDEADBEEF", crypto: {} };
    const blob = new Blob([JSON.stringify(keystore)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keystore.json";
    a.click();
    URL.revokeObjectURL(url);
    setStep(2);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Create a new wallet   ${step} / 4`}
    >
      <div className="space-y-4">
        {step === 1 && (
          <>
            <h4 className="text-xl font-bold">
              Create a keystore file and password
            </h4>

            <label className="block font-semibold">Set a password</label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                className="flex-1 bg-transparent border border-white/6 px-3 py-2 rounded-md text-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <button className="text-[#7aa9ff]">👁️</button>
            </div>
            <div className="text-sm text-gray-400">
              Make sure to enter at least 8 and max 200 characters, including
              one upper-case letter, a symbol and a number
            </div>

            <label className="block font-semibold">Re-enter password</label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                className="flex-1 bg-transparent border border-white/6 px-3 py-2 rounded-md text-gray-100"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter password"
              />
              <button className="text-[#7aa9ff]">👁️</button>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="agree" className="text-gray-200">
                I understand that I will need both the keystore file and the
                password to access my wallet. Once I have downloaded the file
                below, I will safely store it as well as the password
              </label>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="disabled:opacity-60 bg-gradient-to-b from-[#2173FF] to-[#1a62e6] px-6 py-3 rounded-full font-bold"
                disabled={!canDownload}
                onClick={handleDownload}
              >
                Download keystore file and continue
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h4 className="text-xl font-bold">Backup seed phrase</h4>
            <p className="text-gray-400">
              This is a mock step. Show mnemonic and require user to confirm
              words in the following steps.
            </p>

            <div className="flex justify-center mt-6">
              <button
                className="bg-gradient-to-b from-[#2173FF] to-[#1a62e6] px-6 py-3 rounded-full font-bold"
                onClick={() => setStep(3)}
              >
                I saved my seed phrase
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h4 className="text-xl font-bold">Confirm seed phrase</h4>
            <p className="text-gray-400">Mock confirmation step</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-gradient-to-b from-[#2173FF] to-[#1a62e6] px-6 py-3 rounded-full font-bold"
                onClick={() => setStep(4)}
              >
                Confirm
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h4 className="text-xl font-bold">All done</h4>
            <p className="text-gray-400">
              Wallet created (mock). You can now access your account.
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-gradient-to-b from-[#2173FF] to-[#1a62e6] px-6 py-3 rounded-full font-bold"
                onClick={() => {
                  onClose();
                  setStep(1);
                  setPassword("");
                  setConfirm("");
                  setAgreed(false);
                }}
              >
                Finish
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

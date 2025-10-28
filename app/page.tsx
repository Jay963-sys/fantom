"use client";

import React, { useState } from "react";
import ConnectModal from "../components/ConnectModal";
import CreateModal from "../components/CreateModal";
import RestoreModal from "../components/RestoreModal";

export default function HomePage() {
  const [connectOpen, setConnectOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img
              src="https://pwawallet.fantom.network/fantom-logo-blue.svg"
              alt="Fantom Logo"
              width="32"
              height="32"
              className="w-32 h20"
            />
          </div>
        </div>
      </header>

      <section className="pt-20 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">
            Welcome to Fantom PWA Wallet
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Send, receive and stake your Opera FTM
          </p>

          <div className="mt-16 flex flex-wrap gap-6 items-center justify-center">
            <button
              onClick={() => setConnectOpen(true)}
              className="bg-[#2173FF] hover:bg-[#1a62e6] text-white px-10 py-4 rounded-full font-semibold flex items-center gap-3 shadow-lg transition-colors text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L8 6L12 10L16 6L12 2Z" fill="currentColor" />
                <path d="M12 14L8 18L12 22L16 18L12 14Z" fill="currentColor" />
                <path d="M2 12L6 8L10 12L6 16L2 12Z" fill="currentColor" />
                <path d="M14 12L18 8L22 12L18 16L14 12Z" fill="currentColor" />
              </svg>
              Connect Wallet
            </button>

            <button
              onClick={() => setCreateOpen(true)}
              className="bg-[#2173FF] hover:bg-[#1a62e6] text-white px-10 py-4 rounded-full font-semibold flex items-center gap-3 shadow-lg transition-colors text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="13"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <line
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Create Wallet
            </button>

            <button
              onClick={() => setRestoreOpen(true)}
              className="bg-[#2173FF] hover:bg-[#1a62e6] text-white px-10 py-4 rounded-full font-semibold flex items-center gap-3 shadow-lg transition-colors text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C10.9 2 10 2.9 10 4V12L7 9C6.4 8.4 5.6 8.4 5 9C4.4 9.6 4.4 10.4 5 11L11 17C11.6 17.6 12.4 17.6 13 17L19 11C19.6 10.4 19.6 9.6 19 9C18.4 8.4 17.6 8.4 17 9L14 12V4C14 2.9 13.1 2 12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M5 20C5 19.4 5.4 19 6 19H18C18.6 19 19 19.4 19 20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20Z"
                  fill="currentColor"
                />
              </svg>
              Restore Wallet
            </button>
          </div>

          <div className="mt-20 pt-8 border-t  border-white/10">
            <p className="text-gray-400 text-base mb-8 text-center">
              The Fantom PWA Wallet has been created as a Progressive Web App
              (PWA) which is easy to launch on all platforms:
            </p>
            <div className="flex flex-wrap gap-8 items-center justify-center">
              <div className="flex items-center gap-2 text-[#2173FF]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
                <span className="font-semibold">Windows</span>
              </div>
              <div className="flex items-center gap-2 text-[#2173FF]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
                <span className="font-semibold">macOS</span>
              </div>
              <div className="flex items-center gap-2 text-[#2173FF]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.5 0L.76 6.424 12.5 24l11.74-17.576z" />
                </svg>
                <span className="font-semibold">Linux</span>
              </div>
              <div className="flex items-center gap-2 text-[#2173FF]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
                <span className="font-semibold">iOS</span>
              </div>
              <div className="flex items-center gap-2 text-[#2173FF]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.523 15.341c-.8 0-1.438-.661-1.438-1.486s.638-1.486 1.438-1.486c.8 0 1.438.661 1.438 1.486 0 .825-.638 1.486-1.438 1.486m-11.046 0c-.8 0-1.438-.661-1.438-1.486s.638-1.486 1.438-1.486c.8 0 1.438.661 1.438 1.486 0 .825-.638 1.486-1.438 1.486m19.523-2.097c0 1.126-.932 2.042-2.074 2.042-.633 0-1.195-.289-1.573-.741-.927.608-2.168 1.007-3.577 1.09l.608 2.862 1.98-.421c.054-.757.689-1.357 1.464-1.357.821 0 1.486.665 1.486 1.486s-.665 1.486-1.486 1.486c-.607 0-1.127-.364-1.359-.886l-2.204.469c-.166.036-.331-.065-.386-.227l-.683-3.218c-1.456-.042-2.734-.441-3.693-1.073-.378.441-.933.73-1.556.73-1.142 0-2.074-.916-2.074-2.042 0-.816.479-1.518 1.17-1.845-.054-.236-.083-.482-.083-.736 0-2.716 3.16-4.927 7.056-4.927s7.056 2.211 7.056 4.927c0 .254-.029.5-.083.736.691.327 1.17 1.029 1.17 1.845M1.004 12.974c0-1.126.932-2.042 2.074-2.042.633 0 1.195.289 1.573.741.927-.608 2.168-1.007 3.577-1.09l.608-2.862-1.98.421c-.054.757-.689 1.357-1.464 1.357-.821 0-1.486-.665-1.486-1.486S3.571 6.527 4.392 6.527c.607 0 1.127.364 1.359.886l2.204-.469c.166-.036.331.065.386.227l.683 3.218c1.456.042 2.734.441 3.693 1.073.378-.441.933-.73 1.556-.73 1.142 0 2.074.916 2.074 2.042 0 .816-.479 1.518-1.17 1.845.054.236.083.482.083.736 0 2.716-3.16 4.927-7.056 4.927s-7.056-2.211-7.056-4.927c0-.254.029-.5.083-.736-.691-.327-1.17-1.029-1.17-1.845" />
                </svg>
                <span className="font-semibold">Android</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
      <CreateModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <RestoreModal open={restoreOpen} onClose={() => setRestoreOpen(false)} />
    </div>
  );
}

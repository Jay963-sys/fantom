"use client";

import React, { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function Modal({
  open,
  title,
  onClose,
  children,
  className = "",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      document.addEventListener("keydown", onKey);
      setTimeout(() => {
        const focusable = panelRef.current?.querySelector<HTMLElement>(
          'button, input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 10);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previouslyFocused.current) previouslyFocused.current.focus();
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog"}
    >
      <div
        className={`w-full max-w-3xl bg-[#0b0b0b] rounded-2xl p-8 border border-white/5 shadow-2xl ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
        ref={panelRef}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#3aa0ff] hover:text-[#5fb7ff] rounded p-2"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 text-gray-100">{children}</div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Send on Enter, but allow Shift+Enter for new lines
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    // Auto-grow the textarea up to ~200px
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }

  return (
    <div className="px-4 py-4 border-t border-[#2A2A2A] bg-[#0D0D0D]">
      <div
        className={`flex items-end gap-3 bg-[#1A1A1A] border rounded-2xl px-4 py-3 transition-all duration-200
          ${isLoading ? "border-[#2A2A2A] opacity-70" : "border-[#2A2A2A] focus-within:border-[#D4AF37] focus-within:shadow-[0_0_0_1px_#D4AF3740]"}`}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={isLoading}
          placeholder="Message Onyx AI..."
          rows={1}
          className="flex-1 bg-transparent text-[#F5F5F5] placeholder-[#606060] text-sm
                     resize-none outline-none leading-relaxed max-h-[200px] overflow-y-auto"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200
            ${input.trim() && !isLoading
              ? "bg-[#D4AF37] text-black hover:bg-[#E8C84A] cursor-pointer"
              : "bg-[#2A2A2A] text-[#606060] cursor-not-allowed"
            }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      </div>

      <p className="text-[#606060] text-xs text-center mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
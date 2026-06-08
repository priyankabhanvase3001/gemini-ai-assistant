"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatWindowProps {
  messages: Message[];
  isThinking: boolean;
}

export default function ChatWindow({ messages, isThinking }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">

      {messages.length === 0 && !isThinking && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] flex items-center justify-center">
            <span className="text-black font-bold text-2xl">O</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#F5F5F5]">
            How can I help you today?
          </h1>
          <p className="text-[#606060] text-sm max-w-sm">
            Ask me anything — I'm powered by Google Gemini and ready to assist.
          </p>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* Message Bubble */}
          <div
            className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              message.role === "user"
                ? "bg-[#D4AF37] text-black rounded-tr-sm font-medium"
                : "bg-[#1A1A1A] text-[#F5F5F5] rounded-tl-sm border border-[#2A2A2A]"
            }`}
          >
            {message.role === "user" ? (
              <p>{message.content}</p>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none
                prose-p:leading-relaxed prose-p:my-1
                prose-headings:text-[#D4AF37] prose-headings:font-semibold
                prose-strong:text-[#F5F5F5] prose-strong:font-semibold
                prose-code:text-[#D4AF37] prose-code:bg-[#0D0D0D] prose-code:px-1 prose-code:rounded
                prose-pre:bg-[#0D0D0D] prose-pre:border prose-pre:border-[#2A2A2A]
                prose-ul:my-1 prose-ol:my-1 prose-li:my-0
                prose-table:text-sm prose-th:text-[#D4AF37] prose-td:border-[#2A2A2A]
                prose-blockquote:border-[#D4AF37] prose-blockquote:text-[#A0A0A0]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      ))}

      {isThinking && (
        <div className="flex gap-3 justify-start">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-3 rounded-2xl flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
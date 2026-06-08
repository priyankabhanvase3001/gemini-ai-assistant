"use client";

import { Chat } from "@/types";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
}: SidebarProps) {
  return (
    <div className="flex flex-col w-64 h-full bg-[#111111] border-r border-[#2A2A2A] shrink-0">

      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#2A2A2A]">
        <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center shrink-0">
          <span className="text-black font-bold text-sm">O</span>
        </div>
        <span className="text-[#F5F5F5] font-semibold tracking-wide">Onyx AI</span>
      </div>

      {/* New Chat Button */}
      <div className="px-3 py-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg
                     border border-[#2A2A2A] text-[#A0A0A0] text-sm
                     hover:border-[#D4AF37] hover:text-[#D4AF37]
                     transition-all duration-200"
        >
          <span className="text-lg leading-none">+</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {chats.length === 0 ? (
          <p className="text-[#606060] text-xs text-center mt-8 px-4">
            No conversations yet.{" "}
            <br />
            Start a new chat!
          </p>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm
                          truncate transition-all duration-200
                          ${
                            chat.id === activeChatId
                              ? "bg-[#D4AF3720] text-[#D4AF37] border border-[#D4AF3740]"
                              : "text-[#A0A0A0] hover:bg-[#1A1A1A] hover:text-[#F5F5F5]"
                          }`}
            >
              {chat.title}
            </button>
          ))
        )}
      </div>

      {/* Footer */}
<div className="px-4 py-4 border-t border-[#2A2A2A] space-y-3">
  <div className="flex items-center gap-2 px-2">
    <div className="w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center">
      <span className="text-[#A0A0A0] text-xs font-bold">U</span>
    </div>
    <span className="text-[#A0A0A0] text-xs">User</span>
  </div>
  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg
                     text-[#606060] text-xs hover:text-[#F5F5F5] hover:bg-[#1A1A1A]
                     transition-all duration-200">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    <span>Sign out</span>
  </button>
  <p className="text-[#606060] text-xs text-center">Powered by Gemini</p>
</div>

    </div>
  );
}
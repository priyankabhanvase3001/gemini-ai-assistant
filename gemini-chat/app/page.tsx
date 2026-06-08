"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import { Chat, Message } from "@/types";

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  function createNewChat(): Chat {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat;
  }

  function handleSelectChat(chatId: string) {
    setActiveChatId(chatId);
  }

  async function handleSendMessage(content: string) {
  let chat = activeChat;
  if (!chat) chat = createNewChat();

  // Add user message immediately to UI
  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content,
    timestamp: Date.now(),
  };

  const updatedMessages = [...(chat.messages || []), userMessage];

  setChats((prev) =>
    prev.map((c) =>
      c.id === chat!.id
        ? { ...c, messages: updatedMessages, updatedAt: Date.now() }
        : c
    )
  );

  // Show thinking indicator
  setIsThinking(true);

  try {
    // Call our API route
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    // Add AI response to the chat
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: data.content,
      timestamp: Date.now(),
    };

    // Auto-title the chat from the first message
    const isFirstMessage = updatedMessages.length === 1;
    const newTitle = isFirstMessage
      ? content.slice(0, 40) + (content.length > 40 ? "..." : "")
      : chat!.title;

    setChats((prev) =>
      prev.map((c) =>
        c.id === chat!.id
          ? {
              ...c,
              title: newTitle,
              messages: [...updatedMessages, assistantMessage],
              updatedAt: Date.now(),
            }
          : c
      )
    );
  } catch (error: any) {
    // Show error as a message in the chat
    const errorMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: `Sorry, something went wrong: ${error.message}`,
      timestamp: Date.now(),
    };
    setChats((prev) =>
      prev.map((c) =>
        c.id === chat!.id
          ? { ...c, messages: [...updatedMessages, errorMessage] }
          : c
      )
    );
  } finally {
    // Always hide thinking indicator
    setIsThinking(false);
  }
}

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSelectChat={handleSelectChat}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatWindow
          messages={activeChat?.messages || []}
          isThinking={isThinking}
        />
        <ChatInput
          onSend={handleSendMessage}
          isLoading={isThinking}
        />
      </div>
    </div>
  );
}
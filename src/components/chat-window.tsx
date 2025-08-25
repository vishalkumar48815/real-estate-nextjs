"use client";

import { useState } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ChatHeader } from "./chat-header";

export const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Hi, how can I help you today?", fromUser: false },
    { text: "Hey, I'm having trouble with my account.", fromUser: true },
    { text: "What seems to be the problem?", fromUser: false },
    { text: "I can't log in.", fromUser: true },
  ]);

  const handleSend = (msg: string) => {
    setMessages((prev) => [...prev, { text: msg, fromUser: true }]);
  };

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg flex flex-col h-[80vh]">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m.text} fromUser={m.fromUser} />
        ))}
      </div>
      <div className="p-4 border-t">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { sendMessage } from "@/lib/api";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);

const handleSend = async (text: string) => {
  const userMessage: Message = { role: "user", text };
  const botMessage: Message = { role: "bot", text: "Thinking..." };

  setMessages((prev) => [...prev, userMessage, botMessage]);

  try {
    console.log("Sending request...");

    const res = await sendMessage(text);

    console.log("Response:", res);

    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        role: "bot",
        text: res.reply,
      };
      return updated;
    });

  } catch (err) {
    console.error("ERROR:", err);
  }
};

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl h-full flex flex-col p-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}

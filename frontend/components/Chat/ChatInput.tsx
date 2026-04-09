"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="flex-1 p-3 rounded-xl bg-white/20 text-white outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />

      <button
        onClick={handleSend}
        className="px-4 bg-white text-black rounded-xl cursor-pointer"
      >
        Send
      </button>
    </div>
  );
}
import React, { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SidePanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey 👋 I’m your extension assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulated AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a mock AI response. Replace with your API logic.",
      };

      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="logo-dot" />
        <span>Extension AI</span>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.role === "user" ? "user" : "assistant"}`}
          >
            {msg.content}
          </div>
        ))}

        {loading && <div className="message assistant typing">Typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-footer">
        <textarea
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default SidePanel;
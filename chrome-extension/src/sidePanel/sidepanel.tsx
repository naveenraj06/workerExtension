import { useEffect, useRef, useState } from "react";
import "./sidepanel.css";

type View = "chat" | "history";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export default function SidePanelChatbot() {
  const [view, setView] = useState<View>("chat");
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((c) => c.id === currentChatId);

  /* Initialize with one chat */
  useEffect(() => {
    if (chats.length === 0) {
      const newChat = createNewChat();
      setChats([newChat]);
      setCurrentChatId(newChat.id);
    }
  }, []);

  /* Auto scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages, typing]);

  const createNewChat = (): Chat => ({
    id: Date.now().toString(),
    title: "New Chat",
    messages: [],
  });

  const handleNewChat = () => {
    const newChat = createNewChat();
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setView("chat");
  };

  const handleSend = () => {
    if (!input.trim() || !currentChat) return;

    const userMessage: Message = { role: "user", content: input };

    const updatedChats = chats.map((chat) =>
      chat.id === currentChatId
        ? {
            ...chat,
            title:
              chat.messages.length === 0
                ? input.slice(0, 24)
                : chat.title,
            messages: [...chat.messages, userMessage],
          }
        : chat
    );

    setChats(updatedChats);
    setInput("");
    simulateBotResponse();
  };

  const simulateBotResponse = () => {
    setTyping(true);
    setTimeout(() => {
      const botMessage: Message = {
        role: "assistant",
        content: "This is a simulated AI response.",
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, botMessage],
              }
            : chat
        )
      );

      setTyping(false);
    }, 900);
  };

  const deleteChat = (id: string) => {
    const filtered = chats.filter((chat) => chat.id !== id);
    setChats(filtered);

    if (filtered.length > 0) {
      setCurrentChatId(filtered[0].id);
    } else {
      const newChat = createNewChat();
      setChats([newChat]);
      setCurrentChatId(newChat.id);
    }
  };

  return (
    <div className="chat-wrapper">
      {/* HEADER */}
      <div className="chat-header">
        {view === "history" ? (
          <button className="icon-btn" onClick={() => setView("chat")}>
            ←
          </button>
        ) : (
          <div className="header-left">
            <div className="logo-dot" />
            <span className="header-title">Chrome AI</span>
          </div>
        )}

        <div className="header-actions">
          {view === "chat" && (
            <>
              <button
                className="icon-btn"
                onClick={() => setView("history")}
              >
                ☰
              </button>
              <button
                className="icon-btn"
                onClick={handleNewChat}
              >
                ＋
              </button>
            </>
          )}
        </div>
      </div>

      {/* BODY */}
      {view === "chat" && (
        <>
          <div className="chat-body">
            {currentChat?.messages.length === 0 && (
              <div className="empty-state">
                Start a conversation ✨
              </div>
            )}

            {currentChat?.messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role}`}
              >
                {msg.content}
              </div>
            ))}

            {typing && (
              <div className="message assistant typing">
                AI is typing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* FOOTER */}
          <div className="chat-footer">
            <textarea
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </>
      )}

      {/* HISTORY VIEW */}
      {view === "history" && (
        <div className="history-view">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`history-item ${
                chat.id === currentChatId ? "active" : ""
              }`}
              onClick={() => {
                setCurrentChatId(chat.id);
                setView("chat");
              }}
                tabIndex={0}
                role="button"
            >
              <span className="history-title">
                {chat.title}
              </span>
              <span
                className="history-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                tabIndex={0}
                role="button"
              >
                ✕
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
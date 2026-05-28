"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "@/lib/api";

type Message = {
  id: number;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp?: Date;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = async () => {
    try {
      setInitializing(true);
      await axios.post(`${API_URL}/chat/start`);
      setMessages([]);
    } catch (error) {
      console.error("Error starting chat:", error);
      setMessages([
        {
          id: 0,
          sender: "system",
          text: "Welcome! Ask me about your energy consumption, historical data, or reports.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    startChat();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setNewMessage("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat/message`, {
        message: userMsg.text,
      });

      const formattedResponse = formatAIResponse(response.data.response);

      const aiMsg: Message = {
        id: messages.length + 2,
        text: formattedResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg: Message = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error processing your message. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-shell flex flex-col h-[calc(100vh-5.5rem)] gap-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-700 px-8 py-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.24),transparent_30%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/90">
            Data Analytics
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Chat with your data
          </h1>
          <p className="mt-2 text-base text-white/75">
            Ask questions about energy consumption, historical trends, and
            operational reports
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="surface flex flex-1 flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-5 p-6">
          {initializing ? (
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="skeleton h-20 w-2/3 rounded-2xl" />
              </div>
              <div className="flex justify-end">
                <div className="skeleton h-16 w-1/2 rounded-2xl" />
              </div>
              <div className="flex justify-start">
                <div className="skeleton h-24 w-3/4 rounded-2xl" />
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
              <div className="rounded-full bg-cyan-100 p-6 text-cyan-600">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Start a conversation
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Ask questions about your factory data, energy metrics, or
                  operational insights
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
                    message.sender === "user" ? "bg-cyan-500" : "bg-slate-700"
                  }`}
                >
                  {message.sender === "user" ? "U" : "AI"}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-lg rounded-2xl px-5 py-3 ${
                    message.sender === "user"
                      ? "bg-cyan-500 text-white shadow-[0_10px_30px_rgba(34,211,238,0.2)]"
                      : "border border-slate-200/80 bg-slate-50 text-slate-900"
                  }`}
                >
                  <div
                    className={`text-sm leading-relaxed ${
                      message.sender === "user"
                        ? ""
                        : "prose prose-sm max-w-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                  {message.timestamp && (
                    <p
                      className={`mt-2 text-xs ${
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-slate-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex gap-3">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
                AI
              </div>
              <div className="max-w-lg rounded-2xl border border-slate-200/80 bg-slate-50 px-5 py-3">
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200/80 bg-slate-50 p-6">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              placeholder="Ask about energy consumption, reports, or historical data..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={loading || initializing}
              className="input flex-1"
              aria-label="Message input"
            />
            <button
              type="submit"
              disabled={loading || initializing || newMessage.trim() === ""}
              className="btn btn-primary px-6"
              aria-label="Send message"
            >
              {loading ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99721575 L3.03521743,10.4381718 C3.03521743,10.5952692 3.19218622,10.7523666 3.50612381,10.7523666 L16.6915026,11.5378535 C16.6915026,11.5378535 17.1624089,11.5378535 17.1624089,12.0091456 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

// Function to format AI response
const formatAIResponse = (response: string) => {
  return response
    .replace(
      /## (.+)/g,
      "<h3 class='font-semibold text-base mt-3 mb-2'>$1</h3>",
    )
    .replace(/### (.+)/g, "<h4 class='font-medium text-sm mt-2 mb-1'>$1</h4>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong class='font-semibold'>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em class='italic'>$1</em>")
    .replace(/\n/g, "<br/>")
    .replace(/^- (.+)/g, "<li class='ml-4'>$1</li>")
    .replace(/<li(.+)<\/li>/g, "<ul class='list-disc space-y-1'>$&</ul>");
};

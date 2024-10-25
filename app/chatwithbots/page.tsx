"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { log } from "console";

const Chat = () => {
  const [messages, setMessages] = useState<
    { id: number; sender: string; text: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const startChat = async () => {
    try {
      await axios.post("http://localhost:4000/chat/start");
      setMessages([
        { id: 0, sender: "system", text: "Chat started successfully" },
      ]);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  useEffect(() => {
    startChat();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/chat/message", {
        message: newMsg.text,
      });
      console.log("response", response);

      const formattedResponse = formatAIResponse(response.data.response);

      const reply = {
        id: messages.length + 2,
        text: formattedResponse,
        sender: "ai",
      };

      console.log("reply", reply);

      setMessages((prevMessages) => [...prevMessages, reply]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Chat Header */}
      <div className="p-4 bg-purple-600 text-white font-bold text-center">
        Chat With Your Data (Energy, Historical Data, reports)
      </div>

      {/* Messages Display Area */}
      <div className="flex-grow overflow-y-auto p-4 bg-white shadow-inner">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-md w-fit ${
                  message.sender === "user"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: message.text }} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No messages yet. Start the conversation!
          </p>
        )}
      </div>

      {/* Input Area */}

      <form
        onSubmit={handleSendMessage}
        className="w-full mt-4 flex items-center gap-2 "
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-md"
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
// Function to format AI response
const formatAIResponse = (response) => {
  return response
    .replace(/## (.+)/g, "<h2>$1</h2>") // Convert ## to <h2>
    .replace(/### (.+)/g, "<h3>$1</h3>") // Convert ### to <h3>
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") // Convert **text** to <strong>
    .replace(/\*([^*]+)\*/g, "<em>$1</em>") // Convert *text* to <em>
    .replace(/\n/g, "<br/>") // Convert line breaks to <br/>
    .replace(/^- (.+)/g, "<li>$1</li>") // Convert bullet points (starting with -)
    .replace(/<li>(.+)<\/li>/g, "<ul><li>$1</li></ul>"); // Wrap bullet points in <ul>
};

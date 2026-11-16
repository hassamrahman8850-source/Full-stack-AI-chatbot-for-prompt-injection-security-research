import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (input.trim() === "" || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn't reach the server. Is the backend running?" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="chat-window">
        <header className="chat-header">
          <div className="avatar">HR</div>
          <div className="header-text">
            <h1>HR-Bot</h1>
            <span className="status">Online</span>
          </div>
        </header>

        <div className="messages">
          {messages.length === 0 && (
            <div className="empty-state">
              Ask me about benefits, policies, or time off.
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`row ${msg.role}`}>
              <div className={`bubble ${msg.role}`}>{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="row bot">
              <div className="bubble bot typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} disabled={loading}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
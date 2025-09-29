import { useEffect, useState, useRef } from 'react';

const Chat = ({ setOpenedChatTab, socket }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setChat((prevChats) => [
        ...prevChats,
        {
          ...data,
          name: data.senderId === socket.id ? "You" : data.name,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    });

    return () => socket.off("messageResponse");
  }, [socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("message", { message });
      setMessage("");
    }
  };

  return (
    <aside className="position-fixed top-0 start-0 h-100 bg-dark shadow-lg" style={{ width: "400px", zIndex: 1050 }}>
      <div className="d-flex flex-column h-100">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
          <h5 className="mb-0 fw-bold text-white">Chat Room</h5>
          <button
            type="button"
            onClick={() => setOpenedChatTab(false)}
            className="btn btn-sm btn-outline-light"
          >
            ✕
          </button>
        </div>
        <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: "#1e1e1e", borderRadius: "0.5rem" }}>
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`d-flex flex-column my-2 ${msg.name === "You" ? "align-items-end" : "align-items-start"}`}
            >
              <div
              className={`p-1 rounded ${msg.name === "You" ? "bg-primary text-white" : "bg-secondary text-white"}`}
              style={{ maxWidth: "75%", wordWrap: "break-word", fontSize: "0.9rem", lineHeight: "1.2rem" }}
            >
              <strong style={{ fontSize: "0.85rem" }}>{msg.name}</strong>
              <div>{msg.message}</div>
              <small className="text-light" style={{ fontSize: "0.7rem" }}>{msg.timestamp}</small>
            </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <form onSubmit={handleSubmit} className="p-3 border-top border-secondary d-flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="form-control me-2 bg-dark text-white border-secondary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-3">
            Send
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Chat;

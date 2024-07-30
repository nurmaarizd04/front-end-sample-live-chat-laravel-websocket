import React, { useState, useEffect } from "react";
import Echo from "./Echo"; // Pastikan path ini sesuai dengan lokasi file echo.js
import PlayNotif from "./components/sounds/notif";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const notificationSound = PlayNotif("notif.wav");

  useEffect(() => {
    // Listen for messages on the 'chat' channel
    Echo.channel("chat").listen("MessageSent", (event) => {
      setMessages((prevMessages) => [...prevMessages, { text: event.message }]);
      notificationSound();
    });

    // Cleanup listener on component unmount
    return () => {
      Echo.leaveChannel("chat");
    };
  }, [notificationSound]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send message to server (create your API to handle this)
    fetch("http://127.0.0.1:8000/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      body: JSON.stringify({ message: newMessage }),
    }).then(() => {
      setNewMessage("");
    });
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          height: "400px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>User {msg.user}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ width: "80%", padding: "10px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

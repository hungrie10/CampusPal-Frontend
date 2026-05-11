import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faRobot,
  faUserFriends,
  faPlaneCircleCheck,
  faGroupArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import Aside from "../../../component/Aside";

const socket = io("http://localhost:3000"); // connect once (outside component)

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 🔌 CONNECT + LISTEN
  useEffect(() => {
    // First greeting from backend
    socket.on("first_reply", (msg) => {
      setMessages((prev) => [...prev, { sender: "bayne", text: msg }]);
    });

    // AI replies
    socket.on("bayne_replies_back", (msg) => {
      setMessages((prev) => [...prev, { sender: "bayne", text: msg }]);
    });

    return () => {
      socket.off("first_reply");
      socket.off("bayne_replies_back");
    };
  }, []);

  // ✍️ Handle typing
  function handleChange(e) {
    setInput(e.target.value);
  }

  // 🚀 Send message
  function sendMessage() {
    if (!input.trim()) return;

    // Save user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Send to backend
    socket.emit("chat_with_bayne", { message: input });

    setInput("");
  }

  return (
    <main id="chat_bot">
      <Aside />
      <section id="main_chat">
        <div id="message_box">
          {messages.map((msg, index) => (
            <div key={index} className={`message_bubble ${msg.sender}`}>
              <small>{msg.sender}</small>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div id="chat_panel">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="What do you want to talk about?"
          />
          <button onClick={sendMessage}>
            <FontAwesomeIcon icon={faPlaneCircleCheck} />
          </button>
        </div>
      </section>
    </main>
  );
}

export default ChatBot;

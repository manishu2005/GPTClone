
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext";
import Message from "./Message";

const Chat = () => {
  const bottomRef = useRef(null);
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [prevChats,newChat,latestReply]);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  useEffect(() => {
    if (!prevChats?.length || !reply) return;

    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(reply.slice(0, idx + 1));
      idx++;

      if (idx >= reply.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}

      <div className="chats">
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <Message
            key={idx}
            role={chat.role}
            content={chat.content}
            copyCode={copyCode}
          />
        ))}

        {prevChats.length > 0 && (
          <Message
            role="assistant"
            content={
              latestReply === null
                ? prevChats[prevChats.length - 1]?.content
                : latestReply
            }
            copyCode={copyCode}
          />
        )}

        <div ref={bottomRef}></div>
      </div>
      <button
  className="scrollBtn"
  onClick={() =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }
>
  ↓
</button>
    </>
  );
};

export default Chat;

import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";

import db from "./firebase";
import { Link } from "react-router-dom";
function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    const roomName = prompt("Enter name for chat");
    if (roomName) {
     
      db.collection("rooms").add({
        name: roomName
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>

          <p> </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3>Add new Chat</h3>
    </div>
  );
}

export default SidebarChat;

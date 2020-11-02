import React, { useState, useEffect } from "react";

import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PhoneIcon from "@material-ui/icons/Phone";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

import "./Chat.css";

function Chat() {
  const [input, setInput] = useState("");
  const { roomsId } = useParams();

  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomsId) {
      db.collection("rooms")
        .doc(roomsId)
        .onSnapshot(snapshot => {
          setRoomName(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomsId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
    }
  }, [roomsId]);

  const sendMessage = e => {
    e.preventDefault();
    console.log("You typed >>>", input);

    db.collection("rooms")
      .doc(roomsId)
      .collection("messages")
      .add({
        message: input,
        name: user.displayName,

        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen {""}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleTimeString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <PhoneIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => (
          <p
            className={`chat__message ${message.name === user.displayName &&
              "chat__reciever"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}

            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="Submit">
            Send
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;

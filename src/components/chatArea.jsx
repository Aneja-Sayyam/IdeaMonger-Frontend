import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Message from "./message";
import {
  Container,
  Header,
  Footer,
  Content,
  Icon,
  Input,
  Button,
} from "rsuite";
import styles from "./chat.module.css";
import { createRef } from "react";
const ENDPOINT = "http://localhost:3000/";

const getOldMessages = async (roomId) => {
  const url = "http://localhost:3000/api/chat/getOldChats";
  const body = {
    roomId,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  // console.log(result);
  return result;
};

const ChatArea = ({ selectedItem, currentUser }) => {
  console.log(selectedItem.fullName,selectedItem.id);
  const [roomId, setRoomId] = useState();
  const [chatContainer, setChatContainer] = useState();
  const [currentSocket, setCurrentSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const users = {
    userA: currentUser,
    userB: selectedItem.id,
  };
  const handleNewMessage = () => {
    if (newMessage !== "") {
      const messageData = {
        fromUser: currentUser,
        content: newMessage,
        roomId: roomId,
      };
      currentSocket.emit("chatMessage", messageData);
      setNewMessage("");
    }
  };
  // const scrollToBottom = () => {
    
  //   chatContainer.current.scrollTop = chatContainer.current.scrollHeight;

  //   console.log(chatContainer.current);

  // };
  useEffect(() => {
    const myRef = createRef();
    setChatContainer(myRef);
    // console.log("Establishing new connection");
    const socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    console.log(users);
    socket.emit("connectRoom", users);
    socket.on("getRoom", async (room) => {
      setRoomId(room);
      console.log(room);
      setMessages([]);
      const oldMessages = await getOldMessages(room);
      setMessages(oldMessages);
      // oldMessages.map(message => {
      //   setMessages((m) => [...m, message]);
      // })
      // socket.emit("oldChat", room);
    });
    socket.on("message", (message) => {
      console.log(message);
      // const arr = messages;
      // console.log(arr);
      setMessages((m) => [...m, message]);
      myRef.current.scrollTop = myRef.current.scrollHeight;
      // messages.push(message);
    });
    setCurrentSocket(socket);
    return () => socket.disconnect();
  }, [selectedItem]);

  return (
    <>
      <Container style={{ height: "100%" }}>
        <Header
          style={{
            height: "8%",
            backgroundColor: "#dbdbdb",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className={styles.header}>
            <img
              style={{
                height: "40px",
                width: "40px",
                objectFit: "cover",
                objectPosition: "0 0",
                borderRadius: "50%",
                outline: "none",
              }}
              src={selectedItem.profileImage}
              alt=""
            />
            <span style={{ fontSize: "18px", paddingLeft: 10 }}>
              {selectedItem.fullName}
            </span>
          </div>
        </Header>
        <div
          ref={chatContainer}
          style={{
            height: "84%",
            overflow: "auto",
            scrollBehavior:"smooth",
            backgroundColor: "AppWorkspace",
          }}
        >
          <div
            
            style={{
              height: "auto",

              display: "flex",
              margin: "10px 30px",
              flexDirection: "column",
            }}
          >
            {/* {console.log(messages)} */}
            {messages.map((message) => {
              return (
                <Message
                  key={message.id}
                  details={message}
                  user={currentUser}
                />
              );
            })}
          </div>
        </div>
        <Footer style={{ height: "8%", backgroundColor: "#dbdbdb" }}>
          <div className={styles.footer}>
            <Input
              componentClass="textarea"
              value={newMessage}
              placeholder="Type a message"
              style={{
                width: "80%",
                height: "70%",
                padding: "15px 30px",
                resize: "none",
              }}
              onChange={(value) => {
                setNewMessage(value);
              }}
            />
            <Button
              appearance="primary"
              style={{ marginLeft: 10, height: "fit-content" }}
              onClick={handleNewMessage}
            >
              <Icon icon="chevron-right" />
            </Button>
            {/* <InputGroup>
                    <InputGroup.Button onClick={handleNewMessage} color="red">
                      <Icon icon="chevron-right" />
                    </InputGroup.Button>
                  </InputGroup> */}
          </div>
        </Footer>
      </Container>
    </>
  );
};

export default ChatArea;

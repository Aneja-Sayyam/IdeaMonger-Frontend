import React from "react";
import { useState } from "react";
import {
  Container,
  Sidebar,
  Sidenav,
  Nav,
  Icon,
  Input,
  InputGroup,
} from "rsuite";
import NavBar from "./navbar";
import { CSSTransition } from "react-transition-group";
import "./transition.css";
import styles from "./chat.module.css";
import ChatArea from "./chatArea";
// import Search from "./search";
const Chat = () => {
  const [searchInput, setSearchInput] = useState("");
  const currentUser = window.sessionStorage.getItem("userId");

  const [items, setItems] = useState([]);
  const [active, setActive] = useState("");

  const [selectedItem, setSelectedItem] = useState({});
  const searchItem = (id) => {
    for (const item of items) {
      if (item.id === id) {
        // console.log(item);
        return item;
      }
    }
  };

  const handleSelect = (activeKey) => {
    // console.log(activeKey);
    setActive(activeKey);
    const item = searchItem(activeKey);
    // console.log(item);
    setSelectedItem(item);
    // console.log("function called");
  };
  const showItems = () => {
    return items.map((item) => {
      if (item.id !== currentUser) {
        return (
          <Nav.Item
            key={item.id}
            // style={{ backgroundColor: "yellowgreen"}}

            className={styles.item}
            eventKey={item.id}
            icon={
              <img
                style={{
                  height: 30,
                  width: 30,
                  objectFit: "cover",
                  objectPosition: "0 0",
                  borderRadius: "50%",
                }}
                src={item.profileImage}
                alt=""
              />
            }
          >
            {` ${item.fullName}`}
          </Nav.Item>
      
        )
      };
    });
  };
  const getItems = () => {
    // console.log(searchInput)
    const body = {
      searchInput: searchInput,
    };
    fetch("http://localhost:3000/api/user/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // setLoading(false);
        setItems(data);
      })
      .catch((e) => console.log("Oops, error", e));
  };
  return (
    <>
      <NavBar />
      <CSSTransition in={true} appear={true} classNames="fade" timeout={1000}>
        <Container style={{ paddingTop: 60, height: "100%" }}>
          <Sidebar
            style={{
              display: "flex",
              flexDirection: "column",
              // height: "100%",
              zIndex: 1,
              boxShadow: "0px 0px 1px 0px",
            }}
            width={260}
          >
            <Sidenav
              // appearance="inverse"
              style={{
                height: "100%",
              }}
              activeKey={active}
              onSelect={handleSelect}
            >
              <Sidenav.Header
                style={{
                  backgroundColor: "#dbdbdb",
                  height: "8%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <InputGroup>
                    <Input
                      onChange={(value) => {
                        setSearchInput(value);
                      }}
                      onPressEnter={getItems}
                      placeholder="Search..."
                    />
                    <InputGroup.Button onClick={getItems}>
                      <Icon icon="search" />
                    </InputGroup.Button>
                  </InputGroup>
                </div>
              </Sidenav.Header>
              <Sidenav.Body
                style={{
                  height: "92%",
                  // backgroundColor: "red",
                }}
              >
                <Nav>
                  {showItems()}
                  {/* {items.map((item) => {
                    return (
                      <Nav.Item key={item.id} eventKey={item.id}>
                        {item.name}
                      </Nav.Item>
                    );
                  })} */}
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>
          {/* {handleSelect("3")} */}

          {active !== "" ? <ChatArea selectedItem={selectedItem} currentUser={currentUser} /> : null}
        </Container>
      </CSSTransition>
    </>
  );
};

export default Chat;

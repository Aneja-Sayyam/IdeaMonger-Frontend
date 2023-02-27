import React, { Component } from "react";
import "./App.css";
import ProfilePage from "./components/profilePage";
import Chat from "./components/chat";
import Home from "./components/home";
import { BrowserRouter as Router , Route} from "react-router-dom";
import FullPost from "./components/fullPost";
import Login from "./components/loginPage";
import UserContextProvider from "./components/userContext";
import ProfileContextProvider from "./components/profileContext";
import PostContextProvider from "./components/postContext";
import EventPage from "./components/eventPage";
import { EventContextProvider } from "./components/eventContext";

class App extends Component {
  
  render() { 
    return (
      <Router>
        <div className="App">
          <UserContextProvider>
            <Route path="/" exact component={Login} />
            <ProfileContextProvider>
              <Route path="/chat" exact component={Chat} />
              <PostContextProvider>
                <Route path="/home" exact component={Home} />
              </PostContextProvider>
              <Route path="/profile/:userId" exact component={ProfilePage} />
              <EventContextProvider>
                <Route path="/events" exact component={EventPage} />
              </EventContextProvider>
            </ProfileContextProvider>
          </UserContextProvider>

          <Route path="/post/:userId/:postId" exact component={FullPost} />
        </div>
      </Router>
    );
  }
}
 
export default App;
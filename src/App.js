import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Userpage from "./components/Userpage";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error getting books:", error);
      });
  }, []);

  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    return storedLoggedIn !== null ? JSON.parse(storedLoggedIn) : false;
  });

  const [username, setUsername] = useState(() => {
    if (loggedIn) {
      //to not try to parse empty username
      const storedUsername = localStorage.getItem("username");
      return storedUsername !== null ? JSON.parse(storedUsername) : "";
    }
  });
  //parse username whenever loggedIn is changed to true
  useEffect(() => {
    if (loggedIn) {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername !== null) {
        setUsername(JSON.parse(storedUsername));
      }
    }
  }, [loggedIn]);
  return (
    <div className="App">
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        username={username}
      />
      <Routes>
        <Route path="/" element={<Home books={books} />} />
        <Route
          path="/login"
          element={
            <Login setUsername={setUsername} setLoggedIn={setLoggedIn} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="user/:username"
          element={<Userpage setBooks={setBooks} />}
        />
        {/* passing setBooks here so we can update books list in home when we add a book in the uesrpage */}
      </Routes>
    </div>
  );
}

export default App;

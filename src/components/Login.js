import "../App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const loggin = () => {
    axios
      .post("http://localhost:5000/login", {
        username,
        password,
      })
      .then((response) => {
        //true : login successful
        props.setLoggedIn(response.data.status);
        props.setUsername(username); //this send username to header
        console.log("login : ", response.data.status);
        if (response.data.status == true) {
          // window.location.href = "/";

          //store state in localStorage
          localStorage.setItem("loggedIn", JSON.stringify(true));
          localStorage.setItem("username", JSON.stringify(username));
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error Logging in:", error);
      });
  };

  return (
    <div className="login">
      {
        <Stack spacing={2}>
          <TextField
            id="username"
            label="username"
            variant="standard"
            required
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          {/* <br /> */}
          <TextField
            id="password"
            label="password"
            type="password"
            variant="standard"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {/* <br /> */}
          <Button variant="contained" sx={{ width: "150px" }} onClick={loggin}>
            Login
          </Button>
        </Stack>
      }
    </div>
  );
}

export default Login;

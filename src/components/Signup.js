import "../App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({ status: true, message: "" });
  const navigate = useNavigate();

  const signup = () => {
    axios
      .post("http://localhost:5000/signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.data.status == true) {
          //show a success message
          navigate("/login");
        } else {
          //show error message
          //response.data.message
          setResponse(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <Stack spacing={2}>
        <TextField
          id="username"
          label="username"
          variant="standard"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          error={!response.status}
          helperText={!response.status ? response.message : ""}
        />
        <TextField
          id="email"
          label="email"
          variant="standard"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          id="password"
          type="password"
          label="password"
          variant="standard"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" sx={{ width: "150px" }} onClick={signup}>
          Sign up
        </Button>
      </Stack>
    </div>
  );
}

export default Signup;

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  NavLink,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

function Header(props) {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("username", "");
    props.setLoggedIn(false);
    navigate("/login");
  };
  return (
    <Stack
      direction="row"
      className="header"
      spacing={5}
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to="/">
        <IconButton aria-label="home" size="large">
          <HomeIcon color={location.pathname == "/" ? "primary" : ""} />
          {/* color={active === "home" ? "primary" : ""} */}
        </IconButton>
      </Link>

      <TextField
        id="input-with-icon-textfield"
        label="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        // margin="none"
        size="small"
      />
      {props.loggedIn ? (
        <Stack direction="row">
          <Link to={"/user/" + props.username}>
            <IconButton size="large">
              <AccountCircleIcon
                color={
                  (location.pathname ==
                    "/user/" + props.username ? "primary" : "")
                }
              />
            </IconButton>
          </Link>
          <IconButton size="large" onClick={logout}>
            <LogoutIcon />
          </IconButton>
          {/* to send user to logging page after logout */}
          {!props.loggedIn && <Navigate />}
        </Stack>
      ) : (
        <ButtonGroup size="large" aria-label="large button group">
          <NavLink to="signup">
            <Button
              variant={
                location.pathname == "/signup" ? "contained" : "outlined"
              }
            >
              Signup
            </Button>
          </NavLink>
          <Link to="login">
            <Button
              variant={location.pathname == "/login" ? "contained" : "outlined"}
            >
              Login
            </Button>
          </Link>
        </ButtonGroup>
      )}
    </Stack>
  );
}

export default Header;

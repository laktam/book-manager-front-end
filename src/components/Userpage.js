import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Book from "./Book";
import AddBookDialog from "./AddBookDialog";

function Userpage(props) {
  // const [userBooks, setUserBooks] = useState([]);

  const [user, setUser] = useState({});
  const [openAddBook, setOpenAddBook] = useState(false);
  const [storedUsername, setStoredUsername] = useState(() => {
    const storedUsername = localStorage.getItem("username");
    return storedUsername !== null ? JSON.parse(storedUsername) : "";
  });
  //to get url parameters
  let params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/" + params.username)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error getting books:", error);
      });

    //enable add book and delete books buttons for the logged in user
    // const data = localStorage.getItem("username");
    // if (data !== null) {
    //   const storedUsername = JSON.parse(data);

    // }
  }, [params.username]);

  //change home books when we add or delete a book
  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        props.setBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error getting books:", error);
      });
  }, [user]);
  // user can be changed if we add a book or delete one (setUser passed to <book/>)

  return (
    <Stack spacing={1} sx={{ p: "15px" }} alignItems="flex-start">
      {/* <ButtonGroup size="large"> */}
      {storedUsername == user.username && (
        <Button
          variant="contained"
          onClick={() => {
            setOpenAddBook(true);
          }}
        >
          add Book
        </Button>
      )}
      <AddBookDialog
        username={params.username}
        openAddBook={openAddBook}
        setOpenAddBook={setOpenAddBook}
        setUser={setUser}
      />
      {/* </ButtonGroup> */}
      <Paper sx={{ p: "10px" }}>
        <Typography variant="body1" gutterBottom>
          Name : {user.username}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email : {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.description}
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        {user.books &&
          Array.isArray(user.books.book) &&
          user.books.book.map((book, index) => {
            return (
              <Grid item key={index} xs={12} md={6}>
                <Paper sx={{ padding: "15px" }}>
                  <Book
                    style={{ flexGrow: "1" }}
                    name={book.name}
                    genre={book.genre}
                    author={book.author}
                    pubDate={book.pubDate}
                    language={book.language}
                    description={book.description}
                    imgSrc={book.imgSrc}
                    by={params.username}
                    setUser={setUser} //passing this so i update user books when i delete a book
                    deleteButton={storedUsername == user.username}
                  />
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Stack>
  );
}

export default Userpage;

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Book from "./Book";
import { Grid, Paper } from "@mui/material";

//redirect to login if not login
//else show books
function Home(props) {
  const [active, setActive] = useState("");
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/books")
  //     .then((response) => {
  //       setBooks(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error getting books:", error);
  //     });
  // }, []);

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      sx={{ p: "15px", pt: "20px" }}
      spacing={1}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
        size="small"
      >
        {/* {active == "login" ? "contained" : "outlined"} */}
        <Button>category 1</Button>
        <Button variant="contained">category 2</Button>
        <Button>category fdsa 3</Button>
        <Button>category 4</Button>
        <Button>cat</Button>
      </ButtonGroup>
      {/* <Stack spacing={1} direction="row"  flexWrap="wrap"> */}
      <Grid container spacing={3}>
        {props.books.map((book, index) => {
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
                  by={book.by}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {/* </Stack> */}
    </Stack>
  );
}

export default Home;

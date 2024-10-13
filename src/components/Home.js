import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Book from "./Book";
import { Divider, Fab, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

//redirect to login if not login
//else show books
function Home(props) {
  const [active, setActive] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const [books, setBooks] = useState([]);

  useEffect(() => {
    //set catergory to all to show all books after searching
    if (props.booksFound.length == 0) {
      setSelectedCat("");
    }
  }, [props.booksFound]);

  const transfromToTable = () => {
    // navigate("http://localhost:5000/transform");
    window.location.href = "http://localhost:5000/transform";
  };

  return (
    <Stack
      direction="row"
      // justifyContent="flex-start"
      sx={{ p: "15px", pt: "20px" }}
      spacing={1}
      justifyContent={props.booksFound.length > 0 ? "center" : "flex-start"}
    >
      <Stack>
        {
          //don't show categories when we are serching
          props.booksFound.length == 0 ? (
            <div>
              <Button
                onClick={() => {
                  setSelectedCat("");
                }}
                variant={selectedCat == "" ? "contained" : "text"}
              >
                All
              </Button>
              <Divider />
              {categories.map((cat, index) => {
                return (
                  <div key={index}>
                    <Button
                      onClick={() => {
                        setSelectedCat(cat);
                      }}
                      variant={selectedCat == cat ? "contained" : "text"}
                    >
                      {cat}
                    </Button>
                    <Divider />
                    {/* add key ????? */}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )
        }
      </Stack>

      <Stack alignItems="center" spacing={2}>
        {
          //check if there books in booksFound : that means that we are searchin : add title "books found"
          props.booksFound.length > 0 ? (
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                books found
              </Typography>{" "}
            </Grid>
          ) : (
            ""
          )
        }
        <Stack direction="row" flexWrap="wrap" useFlexGap>
          {
            //check if there books in booksFound : that means that we are searchin : add books
            props.booksFound.length > 0
              ? props.booksFound.map((book, index) => {
                  return (
                    <Paper sx={{ padding: "15px", m: "5px" }} key={index}>
                      <Book
                        style={{ flexGrow: "1" }}
                        name={book.name}
                        category={book.category}
                        author={book.author}
                        pubDate={book.pubDate}
                        language={book.language}
                        description={book.description}
                        imgSrc={book.imgSrc}
                        by={book.by}
                      />
                    </Paper>
                  );
                })
              : //if no search ("") we display all books or by category
                props.books.map((book, index) => {
                  if (selectedCat === "") {
                    return (
                      <Paper sx={{ padding: "15px", m: "15px" }} key={index}>
                        <Book
                          // style={{ flexGrow: "1" }}
                          name={book.name}
                          category={book.category}
                          author={book.author}
                          pubDate={book.pubDate}
                          language={book.language}
                          description={book.description}
                          imgSrc={book.imgSrc}
                          by={book.by}
                        />
                      </Paper>
                    );
                  } else {
                    //if a category is selected only return books that match it
                    if (book.category === selectedCat) {
                      return (
                        <Paper sx={{ padding: "15px", m: "15px" }} key={index}>
                          <Book
                            // style={{ flexGrow: "1" }}
                            name={book.name}
                            category={book.category}
                            author={book.author}
                            pubDate={book.pubDate}
                            language={book.language}
                            description={book.description}
                            imgSrc={book.imgSrc}
                            by={book.by}
                          />
                        </Paper>
                      );
                    }
                  }
                })
          }
        </Stack>
      </Stack>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        variant="extended"
        size="small"
        onClick={transfromToTable}
      >
        {/* < */}
        Transform to table
      </Fab>
    </Stack>
  );
}

export default Home;

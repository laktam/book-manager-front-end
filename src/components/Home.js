import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Book from "./Book";
import { Divider, Grid, Paper, Typography } from "@mui/material";

//redirect to login if not login
//else show books
function Home(props) {
  const [active, setActive] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

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

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      sx={{ p: "15px", pt: "20px" }}
      spacing={1}
    >
      {/* <ButtonGroup orientation="vertical" variant="text" size="small"> */}
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

      {/* </ButtonGroup> */}
      {/* <Stack spacing={1} direction="row"  flexWrap="wrap"> */}

      <Grid container spacing={3}>
        {
          //check if there books in booksFound : that means that we are searchin
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
        {
          //check if there books in booksFound : that means that we are searchin
          props.booksFound.length > 0
            ? props.booksFound.map((book, index) => {
                return (
                  <Grid item key={index} xs={12} md={6}>
                    <Paper sx={{ padding: "15px" }}>
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
                  </Grid>
                );
              })
            : //if no search ("") we display all books or by category
              props.books.map((book, index) => {
                if (selectedCat === "") {
                  return (
                    <Grid item key={index} xs={12} md={6}>
                      <Paper sx={{ padding: "15px" }}>
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
                    </Grid>
                  );
                } else {
                  //if a category is selected only return books that match it
                  if (book.category === selectedCat) {
                    return (
                      <Grid item key={index} xs={12} md={6}>
                        <Paper sx={{ padding: "15px" }}>
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
                      </Grid>
                    );
                  }
                }
              })
        }
      </Grid>
      {/* </Stack> */}
    </Stack>
  );
}

export default Home;

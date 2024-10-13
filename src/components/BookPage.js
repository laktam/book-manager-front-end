import { IconButton, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";

function BookPage(props) {
  const [book, setBook] = useState({});
  let params = useParams();
  const navigate = useNavigate();

  const deleteBook = (bookName, by) => {
    console.log("deleting ...");
    axios
      .delete("http://localhost:5000/" + bookName + "/" + by)
      .then((response) => {
        // console.log("responce ", response);
        // props.setUser(response.data);
        //update home book list
        axios
          .get("http://localhost:5000/books")
          .then((response) => {
            props.setBooks(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error getting books:", error);
          });
        //and update user book list

        //redirect
        navigate("/");
      })
      .catch((error) => {
        console.error("Error getting books:", error);
      });
  };

  useEffect(() => {
    for (const book of props.books) {
      if (book.name == params.bookName) {
        setBook(book);
        break;
      }
    }
  }, []);

  return (
    <Paper sx={{ p: "20px", m: "30px" }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={5} alignItems="start">
          <img width={"300px"} src={"http://localhost:5000" + book.imgSrc} />

          <Stack>
            <Typography variant="body1" gutterBottom>
              Name : {book.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Author : {book.author}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Publication date : {book.pubDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Language : {book.language}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category : {book.category}
            </Typography>
            {/* deleteButton exist means we are in the userpage so no need to show by:... */}
            {!(props.username == book.by) && (
              <Typography variant="body1" gutterBottom>
                By : <Link to={"/user/" + book.by}>{book.by}</Link>
              </Typography>
            )}
          </Stack>
          {props.username == book.by && (
            <IconButton
              onClick={() => {
                deleteBook(book.name, book.by);
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
        <Typography variant="body1" gutterBottom>
          {book.description}
        </Typography>
      </Stack>
    </Paper>
  );
}
export default BookPage;

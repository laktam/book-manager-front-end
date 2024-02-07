import { IconButton, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useContext } from "react";

function Book(props) {
  const deleteBook = (bookName, by) => {
    console.log("deleting ...");
    axios
      .delete("http://localhost:5000/" + bookName + "/" + by)
      .then((response) => {
        // console.log("responce ", response);
        props.setUser(response.data);
      })
      .catch((error) => {
        console.error("Error getting books:", error);
      });
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={5} alignItems="start">
        <img width={"30%"} src={"http://localhost:5000" + props.imgSrc} />
        {/* <div style={{ width: "25%", position: "relative" }}>
          <img
            src={"http://localhost:5000" + props.imgSrc}
            alt="Book Cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div> */}
        <Stack>
          <Typography variant="body1" gutterBottom>
            Name : {props.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Author : {props.author}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Publication date : {props.pubDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Language : {props.language}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Genre : {props.genre}
          </Typography>
          {/* deleteButton exist means we are in the userpage so no need to show by:... */}
          {!props.deleteButton && (
            <Typography variant="body1" gutterBottom>
              By : <Link to={"/user/" + props.by}>{props.by}</Link>
            </Typography>
          )}
        </Stack>
        {props.deleteButton && (
          <IconButton
            onClick={() => {
              deleteBook(props.name, props.by);
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      <Typography variant="body1" gutterBottom>
        {props.description}
      </Typography>
    </Stack>
  );
}
export default Book;

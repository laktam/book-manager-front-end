import { IconButton, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

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
      <Link to={"/book/" + props.name}>
        <img width={"200px"} src={"http://localhost:5000" + props.imgSrc} />
      </Link>
      <Stack direction="row" justifyContent="space-between">
        <Link to={"/book/" + props.name}>
          <Typography variant="body1" gutterBottom>
            {props.name}
          </Typography>
        </Link>

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
    </Stack>
  );
}
export default Book;

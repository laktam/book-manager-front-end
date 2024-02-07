import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

function AddBookDialog(props) {
  const handleClose = () => {
    props.setOpenAddBook(false);
  };

  const addBook = (book) => {
    axios
      .post("http://localhost:5000/upload/" + props.username, book, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        props.setUser(response.data);
      });
  };
  return (
    <Dialog
      open={props.openAddBook}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          // const email = formJson.email;
          //   delete formJson.imgSrc;
          console.log(formJson);
          addBook(formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle>Add Book</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Book name"
          // type="email"
          fullWidth
          variant="standard"
          size="small"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="author"
          name="author" //name is the one used in the object returned
          label="author"
          // type="email"
          fullWidth
          variant="standard"
          size="small"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="pubDate"
          name="pubDate" //name is the one used in the object returned
          label="publication date"
          // type="email"
          fullWidth
          variant="standard"
          size="small"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="language"
          name="language" //name is the one used in the object returned
          label="language"
          // type="email"
          fullWidth
          variant="standard"
          size="small"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="genre"
          name="genre" //name is the one used in the object returned
          label="genre"
          // type="email"
          fullWidth
          variant="standard"
          size="small"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description" //name is the one used in the object returned
          label="description"
          // type="email"
          fullWidth
          variant="standard"
          size="small"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="image"
          name="image" //name is the one used in the object returned
          label="image"
          type="file"
          fullWidth
          variant="standard"
          size="small"
          //   onChange={(e) => {
          //     setFile(e.target.files[0]);
          //   }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddBookDialog;

import {
  Button,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Todo from "./Todo";
import Container from "@mui/material/Container";
import { useState, useMemo } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useTodos, useTodosDispatch } from "../contexts/ManageListTodosContext";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");

  const {todos} = useTodos();
  const {todosDispatch} = useTodosDispatch();

  const { handleShowCloseSnackbar } = useSnackbar();
  const [filter, setFilter] = useState("all");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [deleteTodoDialog, setTodoDialog] = useState({});
  const [editTodoDialog, setEditTodoDialog] = useState({});

  const [editTodoInputs, setEditTodoInputs] = useState({});

  let filteredTodos = useMemo(() => {
    if (filter === "completed") return todos.filter((x) => x.completed);
    else if (filter === "non-completed")
      return todos.filter((x) => !x.completed);
    else return todos;
  }, [todos, filter]);

  // Map todos Elements
  const listItems = filteredTodos.map((x) => {
    return (
      <Todo
        key={x.Id}
        todoInfo={x}
        showDeleteDialog={handleShowDeleteDialog}
        showEditDialog={handleShowEditDialog}
      />
    );
  });

  // Functions

  function handleAddTodo() {
    todosDispatch({ type: "Add", payload: { title: inputValue } });
    setInputValue("");
    handleShowCloseSnackbar("Added Successfully");
  }

  function handleCloseDeleteDialog() {
    setShowDeleteDialog(false);
  }

  function handleShowDeleteDialog(todoDialog) {
    setTodoDialog(todoDialog);
    setShowDeleteDialog(true);
  }

  function handleDeleteItem() {
    todosDispatch({ type: "Delete", payload: { Id: deleteTodoDialog.Id } });
    setShowDeleteDialog(false);
    handleShowCloseSnackbar("Deleted Successfully");
  }

  // edit dialog handles
  function handleCloseEditDialog() {
    setShowEditDialog(false);
  }

  function handleShowEditDialog(todoDialog) {
    setEditTodoDialog(todoDialog);
    setEditTodoInputs({ title: todoDialog.title, body: todoDialog.body });
    setShowEditDialog(true);
  }

  function handleEdiTodo() {
    todosDispatch({
      type: "Edit",
      payload: {
        Id: editTodoDialog.Id,
        title: editTodoInputs.title,
        body: editTodoInputs.body,
      },
    });
    setShowEditDialog(false);
    handleShowCloseSnackbar("Updated Successfully");
  }

  return (
    <>
      <Container maxWidth="sm">
        {/* Start Delete Dialog  */}
        <Dialog open={showDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Are you sure you want to Delete this Item?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You cannot Cancel this Operation if you Choose Yes!{" "}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteItem}>Delete</Button>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
        {/* End Delete Dialog  */}

        {/* Start Edit Dialog */}
        <Dialog open={showEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Todo Info</DialogTitle>
          <DialogContent>
            <TextField
              value={editTodoInputs.title}
              onChange={(event) => {
                setEditTodoInputs({
                  ...editTodoInputs,
                  title: event.target.value,
                });
              }}
              sx={{ display: "block", width: "300px" }}
              variant="standard"
              label="Title"
              fullWidth
            />
            <TextField
              fullWidth
              value={editTodoInputs.body}
              onChange={(event) => {
                setEditTodoInputs({
                  ...editTodoInputs,
                  body: event.target.value,
                });
              }}
              sx={{ display: "block", marginTop: "5px" }}
              variant="standard"
              label="Details"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEdiTodo}>Save Changes</Button>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
        {/* End Edit Dialog */}

        <Card>
          <CardContent>
            <Typography variant="h4">Todo Lists</Typography>

            <ToggleButtonGroup
              color="primary"
              style={{ marginTop: "20px" }}
              value={filter}
              exclusive
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="non-completed">Incompleted</ToggleButton>
            </ToggleButtonGroup>

            {listItems}
          </CardContent>

          {/* Actions */}

          <CardActions>
            <Stack
              direction={"row"}
              spacing={2}
              width={"100%"}
              marginTop={"30px"}
            >
              <Button
                variant="contained"
                sx={{ width: "120px", textTransform: "none" }}
                onClick={handleAddTodo}
                disabled={inputValue.length === 0}
              >
                Add
              </Button>
              <TextField
                label="Add Todo"
                style={{ width: "100%" }}
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
              />
            </Stack>
          </CardActions>

          {/* Actions */}
        </Card>
      </Container>
    </>
  );
}

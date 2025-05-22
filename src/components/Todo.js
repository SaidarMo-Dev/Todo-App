import { IconButton } from "@mui/material";

import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { EditOutlined } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import Stack from "@mui/material/Stack";
import "./css/TodoStyles.css";

import { useTodosDispatch } from "../contexts/ManageListTodosContext";
import { useSnackbar } from "../contexts/SnackbarContext";

export default function Todo({ todoInfo, showDeleteDialog, showEditDialog }) {
  const { todosDispatch } = useTodosDispatch();

  const { handleShowCloseSnackbar } = useSnackbar();

  function handleSetComplete() {
    todosDispatch({ type: "setComplete", payload: { todoInfo } });

    handleShowCloseSnackbar("Success");
  }

  function handleShowDeleteDialog() {
    showDeleteDialog(todoInfo);
  }

  function handleShowEditDailog() {
    showEditDialog(todoInfo);
  }

  return (
    <div className="todo-parent">
      <div className="content">
        <h3>{todoInfo.title}</h3>
        <div>{todoInfo.body}</div>
      </div>
      <div className="actions">
        <Stack direction={"row"} spacing={2}>
          <IconButton
            style={{
              background: "white",
              border: "1.5px solid red",
              color: "red",
            }}
          >
            <DeleteOutline onClick={handleShowDeleteDialog} />
          </IconButton>

          <IconButton
            style={{
              background: "white",
              border: "1.5px solid #9C27B0",
              color: "#9C27B0",
            }}
            onClick={handleShowEditDailog}
          >
            <EditOutlined />
          </IconButton>

          <IconButton
            style={{
              background: todoInfo.completed ? "rgb(117, 193, 185)" : "white",
              border: " 1.5px solid #009688",
              color: todoInfo.completed ? "white" : "#009688",
            }}
            onClick={() => {
              handleSetComplete();
            }}
          >
            <DoneIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
}

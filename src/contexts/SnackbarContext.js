import { createContext, useState, useContext } from "react";
import CustomSnackbar from "../components/SnackBar";

const SnackbarContext = createContext({
  handleShowClose: null,
});

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Completed Successfully"
  );

  function handleShowCloseSnackbar(message) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setSnackbarMessage(message);
  }

  return (
    <SnackbarContext.Provider value={{ handleShowCloseSnackbar }}>
      <CustomSnackbar open={open} message={snackbarMessage} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

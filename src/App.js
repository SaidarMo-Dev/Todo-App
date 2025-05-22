import "./App.css";
import TodoList from "./components/TodoList";
import TodosProvider from "./contexts/ManageListTodosContext";
import { createTheme, ThemeProvider } from "@mui/material";

import { SnackbarProvider } from "./contexts/SnackbarContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
      success: "#009688",
    },
  },
});

function App() {
  
  return (
    <TodosProvider>
      <div className="App">
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <TodoList />
          </ThemeProvider>
        </SnackbarProvider>
      </div>
    </TodosProvider>
  );
}

export default App;

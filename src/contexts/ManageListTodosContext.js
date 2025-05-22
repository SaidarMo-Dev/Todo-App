import { createContext, useReducer, useEffect, useContext } from "react";
import { handleTodosReducer } from "../Reducers/TodosReducer";

const TodosContext = createContext({});
const TodosDispatchContext = createContext({});

const TodosProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(handleTodosReducer, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ListTodos")) ?? [];
    todosDispatch({ type: "getAll", payload: { data } });
  }, []);

  return (
    <TodosContext.Provider value={{ todos }}>
      <TodosDispatchContext.Provider value={{ todosDispatch }}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export default TodosProvider;
export const useTodos = () => useContext(TodosContext);

export const useTodosDispatch = () => useContext(TodosDispatchContext);

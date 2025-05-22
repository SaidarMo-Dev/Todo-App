export function handleTodosReducer(currentTodos, action) {
  switch (action.type) {
    case "Add": {
      let lastIndex = JSON.parse(localStorage.getItem("lastIndex")) ?? 2;

      const newlistTodos = [...currentTodos];
      const newIndex = lastIndex + 1;
      newlistTodos.push({
        Id: newIndex,
        title: action.payload.title,
        body: "",
        completed: false,
      });

      localStorage.setItem("ListTodos", JSON.stringify(newlistTodos));
      localStorage.setItem("lastIndex", newIndex);

      return newlistTodos;
    }
    case "Delete": {
      let newListTodos = [...currentTodos];
      newListTodos = newListTodos.filter((x) => {
        return x.Id !== action.payload.Id;
      });

      localStorage.setItem("ListTodos", JSON.stringify(newListTodos));
      return newListTodos;
    }
    case "Edit": {
      const newList = currentTodos.map((x) => {
        if (x.Id === action.payload.Id) {
          x.title = action.payload.title;
          x.body = action.payload.body;
        }
        return x;
      });

      localStorage.setItem("ListTodos", JSON.stringify(newList));

      return newList;
    }
    case "getAll": {
      return action.payload.data;
    }
    case "setComplete": {
      const todoInfo = action.payload.todoInfo;
      let newList = currentTodos.map((x) => {
        if (x.Id === todoInfo.Id) {
          const newTodo = { ...x, completed: !x.completed };
          return newTodo;
        }
        
        return x;
      });
      localStorage.setItem("ListTodos", JSON.stringify(newList));
      return newList;
    }
    default: {
      throw new Error("Unknown action :" + action.type);
    }
  }
}

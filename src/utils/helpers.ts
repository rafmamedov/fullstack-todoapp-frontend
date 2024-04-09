import { Todo, Todos } from "../types/Todo";
import { addTodo, createBoard, getTodos, updateTodo } from "../api/api";

export const createBoardOnServer = async (
  query: string,
  setTodos: React.Dispatch<React.SetStateAction<Todos>>,
) => {
  try {
    await createBoard(query);
    setTodos({ completed: [], inProcess: [], notCompleted: [] });
  } catch (error) {
    console.log(error);
  };
};

export const sortTodosByStatus = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todos>>,
) => {
  const completed: Todo[] = [];
  const inProcess: Todo[] = [];
  const notCompleted: Todo[] = [];

  todos.forEach((todo: Todo) => {
    if ((!todo?.complete && !todo.inProcess)) {
      notCompleted.push(todo);
    };

    if (todo?.complete) {
      completed.push(todo);
    };

    if (todo?.inProcess) {
      inProcess.push(todo);
    };

  })

  setTodos({
    completed: completed.reverse(),
    inProcess: inProcess.reverse(),
    notCompleted: notCompleted.reverse(),
  });
};

export const refetchTodos = async (
  boardName: string,
  setTodos: React.Dispatch<React.SetStateAction<Todos>>,
) => {
  try {
    const response = await getTodos(boardName);

    sortTodosByStatus(response, setTodos);
  } catch (error) {
    console.log('response error', error);
  };
};

export const editTodo = async (
  id: string,
  text: string,
  description: string,
  completed?: boolean,
  inProcess?: boolean,
) => {
  try {
    await updateTodo(id, text, description, completed, inProcess);
  } catch (error) {
    console.log(error);
  };
};

export const addNewTodo = async (
  text: string,
  description: string,
  boardName: string,
) => {
  try {
    await addTodo(boardName, text, description);
  } catch (error) {
    console.log(error);
  };
};

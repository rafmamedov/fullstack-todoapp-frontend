import { Todo, Todos } from "../types/Todo";
import { addTodo, createBoard, getTodos, updateTodo } from "../api/api";

export const createBoardOnServer = async (
  query: string,
  setTodos: React.Dispatch<React.SetStateAction<Todos>>,
) => {
  try {
    await createBoard(query);
    setTodos({ complete: [], inProcess: [], notCompleted: [] });
  } catch (error) {
    console.log(error);
  };
};

export const sortTodosByStatus = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todos>>,
) => {
  const complete: Todo[] = [];
  const inProcess: Todo[] = [];
  const notCompleted: Todo[] = [];

  todos.forEach((todo: Todo) => {
    if ((!todo?.complete && !todo.inProcess)) {
      notCompleted.push(todo);
    };

    if (todo?.complete) {
      complete.push(todo);
    };

    if (todo?.inProcess) {
      inProcess.push(todo);
    };

  })

  setTodos({
    complete: complete.reverse(),
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
  boardName: string,
  setTodos: React.Dispatch<React.SetStateAction<Todos>>,
  complete?: boolean,
  inProcess?: boolean,
) => {
  try {
    await updateTodo(id, text, description, complete, inProcess);
    await refetchTodos(boardName, setTodos)
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

import axios from "axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

export const createBoard = async (boardId: string) => {
  const response = await axios.post(`${BASE_URL}todos`, { boardId });

  return response;
};

export const getTodos = async (boardId: string) => {
  const { data } = await axios.get(`${BASE_URL}todos/${boardId}`);

  return data;
};

export const addTodo = async (
  boardId: string,
  text: string,
  description: string,
) => {
  const { data } = await axios.post(`${BASE_URL}todos/add`, { boardId, text, description });

  return data;
};

export const deleteTodo = async (boardId: string, todoId: string) => {
  await axios.delete(`${BASE_URL}todos/delete/${boardId}/${todoId}`);
};

export const updateTodo = async (
  todoId: string,
  text: string,
  description: string,
  complete?: boolean,
  inProcess?: boolean,
) => {
  await axios.put(`${BASE_URL}todos/update/${todoId}`, {
    text,
    description,
    complete,
    inProcess,
  });
}
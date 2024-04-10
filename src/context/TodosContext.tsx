import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Status, Todo, Todos } from '../types/Todo';

interface TodosContextType {
  todos: Todos;
  setTodos: React.Dispatch<React.SetStateAction<Todos>>;
  onChangeOrder:  (
    sourceStatus: Status,
    destStatus: Status,
    sourceIndex: number,
    destIndex: number,
    todo: Todo,
  ) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todos>({
    complete: [],
    inProcess: [],
    notCompleted: [],
  });

  const onChangeOrder = (
    sourceStatus: Status,
    destStatus: Status,
    sourceIndex: number,
    destIndex: number,
    todo: Todo,
  ) => {
    setTodos((prevTodos) => {
      const newTodos = { ...prevTodos };
      newTodos[sourceStatus].splice(sourceIndex, 1);
      newTodos[destStatus].splice(destIndex, 0, todo);
  
      return newTodos;
    });
  };

  const contextValue: TodosContextType = { todos, setTodos, onChangeOrder };

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>;
};

export const useTodosContext = (): TodosContextType => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  return context;
};

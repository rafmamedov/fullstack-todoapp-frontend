import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Todo, Todos } from '../types/Todo';

interface TodosContextType {
  todos: Todos;
  setTodos: React.Dispatch<React.SetStateAction<Todos>>;
  onDrag: (todo: Todo) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todos>({
    completed: [],
    inProcess: [],
    notCompleted: [],
  });

  const onDrag = (todo: Todo) => {
    setTodos(current => ({
      completed: current.completed.filter(item => item._id !== todo._id),
      inProcess: current.inProcess.filter(item => item._id !== todo._id),
      notCompleted: current.notCompleted.filter(item => item._id !== todo._id),
    }));
  };

  const contextValue: TodosContextType = { todos, setTodos, onDrag };

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>;
};

export const useTodosContext = (): TodosContextType => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodosContext must be used within a TodosProvider');
  }
  return context;
};

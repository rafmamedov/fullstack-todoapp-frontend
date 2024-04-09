export interface Todo {
  _id: string;
  text: string;
  description: string;
  complete?: boolean;
  inProcess?: boolean;
};

export interface Todos {
  completed: Todo[];
  inProcess: Todo[];
  notCompleted: Todo[];
};

export type Status = 'completed' | 'inProcess' | 'notCompleted';

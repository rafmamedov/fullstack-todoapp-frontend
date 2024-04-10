export interface Todo {
  _id: string;
  text: string;
  description: string;
  complete?: boolean;
  inProcess?: boolean;
};

export interface Todos {
  complete: Todo[];
  inProcess: Todo[];
  notCompleted: Todo[];
};

export type Status = 'complete' | 'inProcess' | 'notCompleted';

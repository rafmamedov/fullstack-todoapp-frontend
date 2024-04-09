import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import './style.scss';

import { Status, Todo } from '../../types/Todo';
import { useBoardContext } from '../../context/BoardContext';
import { useTodosContext } from '../../context/TodosContext';
import { editTodo, refetchTodos } from '../../utils/helpers';

import Card from '../card/Card';

interface TodoListProps {
  id: Status;
};

const TodoList: React.FC<TodoListProps> = ({ id }) => {
  const { boardName } = useBoardContext();
  const { todos, setTodos } = useTodosContext();
  const [tempTodos, setTempTodos] = useState(todos[id]);

  const handleChangeStatus = async (data: Todo) => {
    const { _id, text, description } = data;
    const completed = id === 'completed';
    const inProcess = id === 'inProcess';

    await editTodo(_id, text, description, completed, inProcess);
    await refetchTodos(boardName, setTodos);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'todo',
    drop: (item: Todo) => {
      setTempTodos((current) => [...current, item])
      handleChangeStatus(item)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    }),
  }), [boardName]);

  useEffect(() => {
    setTempTodos(todos[id]);
  }, [id, todos]);

  return (
    <div ref={drop} className={`column ${isOver && 'onDrag'}`}>
      {id === 'notCompleted' && (
        <Card isEmpty />
      )} 

      {tempTodos.map((todo) => (
        <Card
          key={todo['_id']}
          todo={todo}
        />
      ))}
    </div>
  );
};

export default TodoList;

import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useForm } from 'react-hook-form';

import './style.scss'

import { Todo } from '../../types/Todo';
import { deleteTodo } from '../../api/api';
import { useBoardContext } from '../../context/BoardContext';
import { useTodosContext } from '../../context/TodosContext';
import { addNewTodo, editTodo, refetchTodos } from '../../utils/helpers';

import CardData from './components/CardData';
import CardForm from './components/CardForm';
import IconAdd from '../../assets/svg/IconAdd';
import IconButton from '../icon-button/IconButton';

interface CardProps {
  isEmpty?: boolean;
  todo?: Todo;
};

const Card: React.FC<CardProps> = ({ isEmpty, todo }) => {
  const { setTodos, onDrag } = useTodosContext();
  const { boardName } = useBoardContext();
  const [isEditingMode, setIsEditingMode] = useState(false);
  let offsetDebounce = { x: 0, y: 0 };

  const { register, handleSubmit, reset } = useForm<Todo>({
    mode: 'all',
    defaultValues: {
      _id: todo?._id,
      text: todo?.text,
      complete: todo?.complete,
      inProcess: todo?.inProcess,
      description: todo?.description,
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'todo',
    item: todo,
    collect(monitor) {
      const isDragging = monitor.isDragging();

      if (isDragging) {
        const offset = monitor.getDifferenceFromInitialOffset() || {
          x: 0,
          y: 0,
        };

        offsetDebounce = offset;
      }

      return {
        isDragging,
      };
    },
  }), [boardName]);

  useEffect(() => {
    if (todo && isDragging) {
      onDrag(todo);
    };
  }, [isDragging, onDrag, todo]);

  const addHandler = async (data: Todo) => {
    if (!data?.text) {
      setIsEditingMode(false);

      return;
    };

    const { text, description } =  data;

    await addNewTodo(text, description, boardName);
    await refetchTodos(boardName, setTodos);
    setIsEditingMode(false);
    reset();
  };

  const deleteHandler = async () => {
    if (!todo) return;

    await deleteTodo(boardName, todo['_id']);
    await refetchTodos(boardName, setTodos);
  }

  const updateHandler = async (data: Todo) => {
    const { _id, text, description, complete, inProcess } = data;

    await editTodo(_id, text, description, complete, inProcess);
    await refetchTodos(boardName, setTodos);
    setIsEditingMode(false);
  };

  if (isEmpty && !isEditingMode) {
    return (
      <div className="cardContainer">
        <IconButton
          className='buttonAdd'
          onClick={() => setIsEditingMode(true)}
          icon={<IconAdd width={100} height={100} />}
        />
      </div>
    );
  };

  return (
    <div
      ref={drag}
      style={{
        position: "relative",
        top: isDragging ? offsetDebounce.y + "px" : "0px",
        left: isDragging ? offsetDebounce.x + "px" : "0px",
        zIndex: isDragging ? 1 : 0,
      }}
      className={`cardContainer ${isDragging && 'dragging'}`}
    >
      {isEditingMode ? (
        <CardForm
          isEmpty={isEmpty}
          register={register}
          submit={handleSubmit}
          addHandler={addHandler}
          deleteHandler={deleteHandler}
          updateHandler={updateHandler}
        />
      ) : (
        <CardData
          text={todo?.text}
          onDelete={deleteHandler}
          onEdit={setIsEditingMode}
          description={todo?.description}
        />
      )}
    </div>
  );
};

export default Card;

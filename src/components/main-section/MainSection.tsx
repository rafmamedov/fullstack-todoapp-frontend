import {
  Droppable,
  DropResult,
  DragDropContext,
} from 'react-beautiful-dnd'

import './style.scss';

import { Status } from '../../types/Todo';
import { editTodo } from '../../utils/helpers';
import { useTodosContext } from '../../context/TodosContext';
import { COLUMNS } from '../../utils/constants';
import TodoList from '../todolist/TodoList';

const MainSection = () => {
  const { todos, onChangeOrder } = useTodosContext();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    if (!destination) {
      return;
    }
  
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    const draggedTodo = todos[source.droppableId as Status][source.index];

    onChangeOrder(
      source.droppableId as Status,
      destination.droppableId  as Status,
      source.index,
      destination.index,
      draggedTodo,
    );

    const complete = destination.droppableId === 'complete';
    const inProcess = destination.droppableId === 'inProcess';

    const { _id, text, description } = draggedTodo;
    editTodo(_id, text, description, complete, inProcess);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container todosContainer">
        {COLUMNS.map(({ id, title }) => (
          <div
            key={id}
            className="container"
          >
            <h2 className="subtitle">{title}</h2>

            <Droppable droppableId={id} type="group">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{  height: '100%', flexGrow: 1 }}
                >
                  <TodoList id={id} />
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default MainSection;
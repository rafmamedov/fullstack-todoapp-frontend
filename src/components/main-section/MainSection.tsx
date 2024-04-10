import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

import './style.scss';

import { Status } from '../../types/Todo';
import TodoList from '../todolist/TodoList';
import { editTodo } from '../../utils/helpers';
import { useTodosContext } from '../../context/TodosContext';

interface Column {
  id: Status;
  title: string;
}

const COLUMNS: Column[] = [
  { id: 'notCompleted', title: 'To Do' },
  { id: 'inProcess', title: 'In progress' },
  { id: 'complete', title: 'Completed' },
];

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
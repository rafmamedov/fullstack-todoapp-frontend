import './style.scss';

import { Status } from '../../types/Todo';
import { useTodosContext } from '../../context/TodosContext';

import Card from '../card/Card';
import { Draggable } from 'react-beautiful-dnd';

interface TodoListProps {
  id: Status;
};

const TodoList: React.FC<TodoListProps> = ({ id }) => {
  const { todos } = useTodosContext();

  return (
      <div className="column">
        {id === 'notCompleted' && (
          <Card isEmpty />
        )} 

        {todos[id].map((todo, index) => (
          <Draggable
            key={todo['_id']}
            draggableId={todo['_id']}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Card todo={todo} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
  );
};

export default TodoList;

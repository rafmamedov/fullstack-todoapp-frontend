import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './style.scss';

import TodoList from '../todolist/TodoList';
import { Status } from '../../types/Todo';

interface Column {
  id: Status;
  title: string;
}

const COLUMNS: Column[] = [
  { id: 'notCompleted', title: 'To Do' },
  { id: 'inProcess', title: 'In progress' },
  { id: 'completed', title: 'Completed' },
];

const MainSection = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container todosContainer">
        {COLUMNS.map(({ id, title }) => (
          <div key={id} className="container">
            <h2 className="subtitle">{title}</h2>

            <TodoList id={id} />
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default MainSection;
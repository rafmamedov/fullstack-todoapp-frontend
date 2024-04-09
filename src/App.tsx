import 'bulma/css/bulma.min.css';
import './styles/global.scss';
import './styles/app.scss'

import { BoardProvider } from './context/BoardContext';
import { TodosProvider } from './context/TodosContext';
import { Board } from './pages/Board';

function App() {
  return (
    <BoardProvider>
      <TodosProvider>
        <Board />
      </TodosProvider>
    </BoardProvider>
  );
}

export default App;

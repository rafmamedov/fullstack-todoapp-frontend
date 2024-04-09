import { useState } from 'react';

import './style.scss';

import { useBoardContext } from '../../context/BoardContext';
import { useTodosContext } from '../../context/TodosContext';
import { createBoardOnServer, sortTodosByStatus } from '../../utils/helpers';
import { getTodos } from '../../api/api';

const Header = () => {
  const { setBoardName } = useBoardContext();
  const { setTodos } = useTodosContext();

  const [inputQuery, setInputQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchTodos = async () => {
    setIsFetching(true);
    setBoardName(inputQuery)

    try {
      const response = await getTodos(inputQuery);

      if (response?.message === 'Board not found') {
        await createBoardOnServer(inputQuery, setTodos);
      } else {
        sortTodosByStatus(response, setTodos);
      };
    } catch (error) {
      console.log('response error', error);
    } finally {
      setIsFetching(false);
    };
  };

  return (
    <div className="inputContainer">
      <input
        className="input"
        type="text"
        placeholder="Enter a board id here"
        value={inputQuery}
        onChange={(event) => setInputQuery(event.target.value)}
      />

      <button
        className={`button ${isFetching ? 'is-loading' : ''}`}
        onClick={fetchTodos}
      >
        Load
      </button>
    </div>
  );
};

export default Header;

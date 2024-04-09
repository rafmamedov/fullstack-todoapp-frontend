import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BoardContextType {
  boardName: string;
  setBoardName: React.Dispatch<React.SetStateAction<string>>;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [boardName, setBoardName] = useState('');
  const contextValue: BoardContextType = { boardName, setBoardName };

  return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>;
};

export const useBoardContext = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};

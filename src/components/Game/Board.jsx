import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../context/GameContext';
import Cell from './Cell';

const Board = () => {
  const { visibleBoard, hiddenBoard, selectedCell, setSelectedCell, guessedCells } = useContext(GameContext);

  const handleCellClick = (index) => {
    setSelectedCell(index);
  };

  return (
    <motion.div 
      className="board-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="subtitle text-center">לוח המשחק</h2>
      <div className="game-board">
        {visibleBoard.map((word, index) => (
          <Cell
            key={index}
            index={index}
            word={word}
            isSelected={selectedCell === index}
            isGuessed={guessedCells.includes(index)}
            onClick={() => handleCellClick(index)}
            type="visible"
          />
        ))}
      </div>
      
      <h2 className="subtitle text-center">המילים שניחשת</h2>
      <div className="game-board">
        {hiddenBoard.map((word, index) => (
          <Cell
            key={index}
            index={index}
            word={guessedCells.includes(index) ? word : "?"}
            isSelected={selectedCell === index}
            isGuessed={guessedCells.includes(index)}
            onClick={() => {}}
            type="hidden"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Board; 
import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../context/GameContext';

const GuessInput = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const { selectedCell, checkGuess, revealTargetHint, revealConnectingHint, visibleBoard } = useContext(GameContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedCell !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedCell]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedCell === null) {
      setMessage({ text: 'בחר משבצת קודם', type: 'error' });
      return;
    }
    
    if (!guess.trim()) {
      setMessage({ text: 'הזן ניחוש', type: 'error' });
      return;
    }
    
    const isCorrect = checkGuess(selectedCell, guess);
    
    if (isCorrect) {
      setMessage({ text: 'ניחוש נכון!', type: 'success' });
      setGuess('');
    } else {
      setMessage({ text: 'ניחוש שגוי, נסה שוב', type: 'error' });
    }
  };

  const handleTargetHint = () => {
    if (selectedCell === null) {
      setMessage({ text: 'בחר משבצת קודם', type: 'error' });
      return;
    }
    
    const hint = revealTargetHint(selectedCell);
    setMessage({ text: `רמז: המילה המבוקשת מתחילה באות "${hint}"`, type: 'info' });
  };

  const handleConnectingHint = () => {
    if (selectedCell === null) {
      setMessage({ text: 'בחר משבצת קודם', type: 'error' });
      return;
    }
    
    const hint = revealConnectingHint(selectedCell);
    setMessage({ text: `רמז: המילה המקשרת מתחילה באות "${hint}"`, type: 'info' });
  };

  return (
    <motion.div 
      className="guess-container card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="subtitle">נחש את המילה</h2>
      
      {selectedCell !== null && (
        <p>המילה הנבחרת: <strong>{visibleBoard[selectedCell]}</strong></p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="הקלד את הניחוש שלך כאן"
            disabled={selectedCell === null}
            ref={inputRef}
          />
        </div>
        
        <div className="flex flex-center">
          <button 
            type="submit" 
            className="btn"
            disabled={selectedCell === null}
          >
            בדוק
          </button>
        </div>
      </form>
      
      {message.text && (
        <motion.div 
          className={`message ${message.type}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {message.text}
        </motion.div>
      )}
      
      <div className="hint-container flex flex-center">
        <button 
          className="btn hint-btn"
          onClick={handleTargetHint}
          disabled={selectedCell === null}
        >
          רמז למילה המבוקשת
        </button>
        <button 
          className="btn hint-btn"
          onClick={handleConnectingHint}
          style={{ marginRight: '1rem' }}
          disabled={selectedCell === null}
        >
          רמז למילה המקשרת
        </button>
      </div>
    </motion.div>
  );
};

export default GuessInput; 
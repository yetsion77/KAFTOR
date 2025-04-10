import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameContext } from '../../context/GameContext';

const BoardsList = () => {
  const navigate = useNavigate();
  const { boards, deleteBoard } = useContext(GameContext);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handlePlayBoard = (boardId) => {
    navigate(`/game/${boardId}`);
  };
  
  const handleDeleteBoard = (boardId, event) => {
    event.stopPropagation();
    if (window.confirm('האם אתה בטוח שברצונך למחוק לוח זה?')) {
      deleteBoard(boardId);
    }
  };
  
  const handleShareBoard = (boardId, event) => {
    event.stopPropagation();
    
    const shareUrl = `${window.location.origin}/#/game/${boardId}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          alert('הקישור הועתק ללוח! אפשר לשלוח אותו למי שתרצה.');
        })
        .catch(err => {
          console.error('שגיאה בהעתקת הקישור:', err);
          alert(`הקישור למשחק: ${shareUrl}`);
        });
    } else {
      alert(`הקישור למשחק: ${shareUrl}`);
    }
  };
  
  return (
    <motion.div 
      className="boards-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <h1 className="title">לוחות משחק</h1>
        
        {boards.length === 0 ? (
          <div className="message">
            <p>אין לוחות שמורים. צור לוח חדש כדי להתחיל.</p>
          </div>
        ) : (
          <div className="boards-grid">
            {boards.map((board, index) => (
              <motion.div 
                key={board.id}
                className="board-item card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => handlePlayBoard(board.id)}
              >
                <h3>{board.name}</h3>
                <p>נוצר ב: {formatDate(board.createdAt)}</p>
                <p>מספר צירופים: {board.phrases.length}</p>
                <div className="board-actions">
                  <button 
                    className="btn"
                    onClick={() => handlePlayBoard(board.id)}
                  >
                    שחק
                  </button>
                  <button 
                    className="btn btn-accent"
                    onClick={(e) => handleShareBoard(board.id, e)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    שתף
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={(e) => handleDeleteBoard(board.id, e)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    מחק
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="button-container flex flex-center">
          <button 
            className="btn"
            onClick={() => navigate('/create')}
          >
            צור לוח חדש
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            style={{ marginRight: '1rem' }}
          >
            חזרה לדף הבית
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BoardsList; 
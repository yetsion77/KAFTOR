import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, query } from "firebase/firestore";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [visibleBoard, setVisibleBoard] = useState([]);
  const [hiddenBoard, setHiddenBoard] = useState([]);
  const [connectingWords, setConnectingWords] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [guessedCells, setGuessedCells] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hints, setHints] = useState({
    targetWordHints: Array(9).fill(false),
    connectingWordHints: Array(9).fill(false)
  });

  // טעינת לוחות מ-Firebase במקום מ-localStorage
  useEffect(() => {
    const fetchBoards = async () => {
      const boardsCollection = collection(db, "boards");
      const boardsSnapshot = await getDocs(boardsCollection);
      const boardsList = boardsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBoards(boardsList);
    };
    
    fetchBoards();
  }, []);

  // שמירת לוחות בכל פעם שהם משתנים
  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem('kaftor-veferach-boards', JSON.stringify(boards));
    }
  }, [boards]);

  // יצירת לוח חדש ב-Firebase
  const createBoard = async (boardData) => {
    const newBoard = {
      name: boardData.name,
      phrases: boardData.phrases,
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, "boards"), newBoard);
    const boardWithId = { ...newBoard, id: docRef.id };
    
    setBoards([...boards, boardWithId]);
    return docRef.id;
  };

  // טעינת לוח למשחק
  const loadBoard = (boardId) => {
    const board = boards.find(b => b.id === boardId);
    if (!board) return false;
    
    setCurrentBoard(board);
    
    // עיבוד הצירופים ליצירת הלוחות
    const { visibleCells, hiddenCells, connecting } = processBoard(board.phrases);
    
    setVisibleBoard(visibleCells);
    setHiddenBoard(hiddenCells);
    setConnectingWords(connecting);
    setGuessedCells([]);
    setIsGameOver(false);
    setHints({
      targetWordHints: Array(9).fill(false),
      connectingWordHints: Array(9).fill(false)
    });
    
    return true;
  };

  // עיבוד הצירופים ליצירת הלוחות
  const processBoard = (phrases) => {
    const visibleCells = [];
    const hiddenCells = [];
    const connecting = [];
    
    phrases.forEach((phrase, index) => {
      const words = phrase.split(' ');
      if (words.length >= 3) {
        // בחירה אקראית אם להציג את המילה הראשונה או השלישית
        const showFirst = Math.random() > 0.5;
        
        if (showFirst) {
          visibleCells.push(words[0]);
          hiddenCells.push(words[2]);
        } else {
          visibleCells.push(words[2]);
          hiddenCells.push(words[0]);
        }
        
        connecting.push(words[1]);
      }
    });
    
    return { visibleCells, hiddenCells, connecting };
  };

  // בדיקת ניחוש
  const checkGuess = (cellIndex, guess) => {
    if (hiddenBoard[cellIndex].trim().toLowerCase() === guess.trim().toLowerCase()) {
      setGuessedCells([...guessedCells, cellIndex]);
      
      // בדיקה אם המשחק הסתיים
      if (guessedCells.length + 1 === hiddenBoard.length) {
        setIsGameOver(true);
      }
      
      return true;
    }
    return false;
  };

  // חשיפת רמז - האות הראשונה של המילה המבוקשת
  const revealTargetHint = (cellIndex) => {
    const newHints = { ...hints };
    newHints.targetWordHints[cellIndex] = true;
    setHints(newHints);
    return hiddenBoard[cellIndex].charAt(0);
  };

  // חשיפת רמז - האות הראשונה של המילה המקשרת
  const revealConnectingHint = (cellIndex) => {
    const newHints = { ...hints };
    newHints.connectingWordHints[cellIndex] = true;
    setHints(newHints);
    return connectingWords[cellIndex].charAt(0);
  };

  // מחיקת לוח מ-Firebase
  const deleteBoard = async (boardId) => {
    await deleteDoc(doc(db, "boards", boardId));
    setBoards(boards.filter(board => board.id !== boardId));
  };

  return (
    <GameContext.Provider
      value={{
        boards,
        currentBoard,
        visibleBoard,
        hiddenBoard,
        connectingWords,
        selectedCell,
        guessedCells,
        isGameOver,
        hints,
        setSelectedCell,
        createBoard,
        loadBoard,
        checkGuess,
        revealTargetHint,
        revealConnectingHint,
        deleteBoard
      }}
    >
      {children}
    </GameContext.Provider>
  );
}; 
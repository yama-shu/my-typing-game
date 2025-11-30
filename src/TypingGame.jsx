import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './TypingGame.css';
import { WORD_LIST } from './wordList';
import WordDisplay from './components/WordDisplay';
import StartScreen from './components/StartScreen';
import QuitButton from './components/QuitButton';

const TypingGame = () => {
  // --- State定義 ---
  const [wordQueue, setWordQueue] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [typedCount, setTypedCount] = useState(0);
  const [gameStatus, setGameStatus] = useState("idle");

  // --- ゲームロジック ---
  const startGame = () => {
    // リストをシャッフル
    const shuffled = [...WORD_LIST].sort(() => Math.random() - 0.5);
    
    // 【修正】シャッフルした中から「先頭の10個」だけを切り出す
    const selectedWords = shuffled.slice(0, 10);
    
    setWordQueue(selectedWords);
    setCurrentWord(selectedWords[0]);
    setTypedCount(0);
    setGameStatus("playing");
  };

  // ゲーム中断・タイトルに戻る処理
  const quitGame = () => {
    setGameStatus("idle");
    setCurrentWord("");
    setTypedCount(0);
  };

  const nextWord = useCallback(() => {
    const nextQueue = wordQueue.slice(1);
    if (nextQueue.length === 0) {
      setGameStatus("finished");
      setCurrentWord("");
      triggerConfetti();
    } else {
      setWordQueue(nextQueue);
      setCurrentWord(nextQueue[0]);
      setTypedCount(0);
    }
  }, [wordQueue]);

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  // --- キー入力監視 ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // プレイ中以外でもスペースキーでスタートできるようにする
      if (gameStatus !== "playing") {
        if (e.code === 'Space' && gameStatus === 'idle') startGame();
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === currentWord[typedCount]) {
        const nextCount = typedCount + 1;
        setTypedCount(nextCount);
        if (nextCount === currentWord.length) {
          setTimeout(() => nextWord(), 50);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, currentWord, typedCount, nextWord]);

  // --- 表示 (Render) ---
  return (
    <div className="game-container" style={{ position: 'relative' }}>
      {/* 待機状態（idle）のときだけスタート画面を表示 */}
      {gameStatus === "idle" && (
        <StartScreen onStart={startGame} />
      )}

      {/* ゲームプレイ中の表示 */}
      {gameStatus === "playing" && (
        <WordDisplay 
          currentWord={currentWord} 
          typedCount={typedCount} 
        />
      )}

      {/* 終了時のメッセージ */}
      <div className="message-area">
        {gameStatus === "finished" && (
          <div className="message-congrats">
            Congratulations!!
            <div>
              <button className="start-button" style={{marginTop: '20px'}} onClick={startGame}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="instruction">
        {gameStatus === "playing" ? "Type the word above!" : ""}
      </p>

      {/* プレイ中だけ表示される「タイトルに戻る」ボタン */}
      {gameStatus === "playing" && (
        <div style={{ 
          position: 'absolute', 
          bottom: '30px', 
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 10
        }}>
          <QuitButton onQuit={quitGame} />
        </div>
      )}
    </div>
  );
};

export default TypingGame;
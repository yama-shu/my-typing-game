import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './TypingGame.css';
import { WORD_LIST } from './wordList';
import WordDisplay from './components/WordDisplay';
import StartScreen from './components/StartScreen';
import QuitButton from './components/QuitButton';
// 新しく作成したタイマーコンポーネントをインポート
import Timer from './components/Timer';

const TypingGame = () => {
  // --- State定義 ---
  const [wordQueue, setWordQueue] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [typedCount, setTypedCount] = useState(0);
  const [gameStatus, setGameStatus] = useState("idle");
  
  // タイムアタック用のState
  const [startTime, setStartTime] = useState(null); // ゲーム開始時刻
  const [finalTime, setFinalTime] = useState(null); // 最終結果タイム

  // --- ゲームロジック ---
  const startGame = () => {
    // リストをシャッフルして先頭10個を取得
    const shuffled = [...WORD_LIST].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, 10);
    
    setWordQueue(selectedWords);
    setCurrentWord(selectedWords[0]);
    setTypedCount(0);
    
    // タイマー開始
    setStartTime(Date.now());
    setFinalTime(null); // 前回の結果をリセット
    setGameStatus("playing");
  };

  // ゲーム中断・タイトルに戻る処理
  const quitGame = () => {
    setGameStatus("idle");
    setCurrentWord("");
    setTypedCount(0);
    setStartTime(null);
  };

  const nextWord = useCallback(() => {
    const nextQueue = wordQueue.slice(1);
    
    // 次の単語がない ＝ ゲームクリア
    if (nextQueue.length === 0) {
      // 終了タイムを確定させる
      const finishTime = ((Date.now() - startTime) / 1000).toFixed(2);
      setFinalTime(finishTime);

      setGameStatus("finished");
      setCurrentWord("");
      triggerConfetti();
    } else {
      setWordQueue(nextQueue);
      setCurrentWord(nextQueue[0]);
      setTypedCount(0);
    }
  }, [wordQueue, startTime]); // startTimeを依存配列に追加

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  // --- キー入力監視 ---
  useEffect(() => {
    const handleKeyDown = (e) => {
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
      
      {/* 待機状態 */}
      {gameStatus === "idle" && (
        <StartScreen onStart={startGame} />
      )}

      {/* ゲームプレイ中 */}
      {gameStatus === "playing" && (
        <>
          {/* ここにタイマーを表示 */}
          <Timer startTime={startTime} />
          
          <WordDisplay 
            currentWord={currentWord} 
            typedCount={typedCount} 
          />
        </>
      )}

      {/* 終了画面 */}
      <div className="message-area">
        {gameStatus === "finished" && (
          <div className="message-congrats">
            Congratulations!!
            {/* 結果タイムの表示 */}
            <div className="result-time">
              Score: {finalTime} s
            </div>
            
            {/* 【追加】ボタンを横並びにするエリア */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
              {/* Play Again ボタン */}
              <button className="start-button" onClick={startGame}>
                Play Again
              </button>

              {/* タイトルに戻るボタン (グレー色にして少し区別をつけています) */}
              <button 
                className="start-button" 
                onClick={quitGame}
                style={{ backgroundColor: '#6c757d' }}
              >
                Title
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="instruction">
        {gameStatus === "playing" ? "Type the word above!" : ""}
      </p>

      {/* 戻るボタン (プレイ中のみ画面下に表示) */}
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
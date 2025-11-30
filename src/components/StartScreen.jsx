import React from 'react';

// 親からスタート処理を受け取る
const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h2 className="title">React Typing Game</h2>
      <button className="start-button" onClick={onStart}>
        Press Space or Click to Start
      </button>
    </div>
  );
};

export default StartScreen;
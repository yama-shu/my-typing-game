import React from 'react';
// ここで、分割した TypingGame.jsx を読み込みます
import TypingGame from './TypingGame';

// 画面全体の背景設定（簡易的にインラインスタイルで適用）
const appStyle = {
  backgroundColor: '#282c34',
  /* 修正点: 
   minHeight ではなく height: 100vh に固定し、
   width: 100vw を追加して確実に画面全体を覆うように変更 
  */
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  margin: 0,
  padding: 0,
  overflow: 'hidden' // スクロールバー防止
};

function App() {
  return (
    <div style={appStyle}>
      <TypingGame />
    </div>
  );
}

export default App;
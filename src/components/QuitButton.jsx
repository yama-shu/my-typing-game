import React from 'react';

const QuitButton = ({ onQuit }) => {
  return (
    <button
      onClick={onQuit}
      // スタイル定義（見た目）
      style={{
        background: 'transparent',
        border: '1px solid #666',
        color: '#888',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.3s'
      }}
      // ホバー時のスタイル変更
      onMouseOver={(e) => {
        e.target.style.color = '#fff';
        e.target.style.borderColor = '#fff';
      }}
      onMouseOut={(e) => {
        e.target.style.color = '#888';
        e.target.style.borderColor = '#666';
      }}
    >
      タイトルに戻る
    </button>
  );
};

export default QuitButton;
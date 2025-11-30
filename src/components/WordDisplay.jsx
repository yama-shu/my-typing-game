import React from 'react';

// 親から props として currentWord（単語）と typedCount（入力文字数）を受け取る
const WordDisplay = ({ currentWord, typedCount }) => {
  
  return (
    <div className="word-display">
      {/* 文字を一文字ずつスパンで描画して色分け */}
      {currentWord.split('').map((char, index) => {
        let className = "char-untyped";
        
        if (index < typedCount) {
          className = "char-typed"; // 入力済み
        } else if (index === typedCount) {
          className = "char-untyped char-current"; // 今打つ場所
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default WordDisplay;
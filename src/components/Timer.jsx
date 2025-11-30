import React, { useState, useEffect } from 'react';

const Timer = ({ startTime }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // 10ミリ秒ごとに時間を更新する
    const intervalId = setInterval(() => {
      // 現在時刻 - 開始時刻 = 経過ミリ秒
      const elapsed = Date.now() - startTime;
      // 秒単位（小数第2位まで）に変換して保存
      setTime((elapsed / 1000).toFixed(2));
    }, 10);

    // コンポーネントが消えるときにタイマーを止める（クリーンアップ）
    return () => clearInterval(intervalId);
  }, [startTime]);

  return (
    <div className="timer-display">
      Time: <span className="timer-seconds">{time}</span> s
    </div>
  );
};

export default Timer;
"use client"
import React, { useRef, useState } from 'react';

function Counter() {
  const countRef = useRef(0); // Хранит значение счётчика
  const [renderCount, setRenderCount] = useState(0); // Для демонстрации рендеров

  const incrementRef = () => {
    countRef.current= countRef.current + 1; // Увеличиваем значение в ref
    console.log(`Текущее значение countRef: ${countRef.current}`);
  };

  const forceRender = () => {
    setRenderCount((prev) => prev + 1); // Обновляем состояние для принудительного рендера
  };

  return (
    <div>
      <h1>useRef Example</h1>
      <p>Значение countRef (без рендера): {countRef.current}</p>
      <p>Количество рендеров: {renderCount}</p>
      <button onClick={incrementRef}>Увеличить countRef</button>
      <button onClick={forceRender}>Принудительный рендер</button>
    </div>
  );
}

export default Counter;

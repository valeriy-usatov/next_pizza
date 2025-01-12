'use client'

import React, { useEffect, useState } from 'react';

const Example = () => {
  const [time, setTime] = useState(0);
    const [showTimer, setShowTimer] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(timer); // Срабатывает при размонтировании
            console.log('Таймер очищен');
        };
    }, []);

    return (
        <div>
            <h1>Время: {time} секунд</h1>
            <button onClick={() => setShowTimer(false)}>Удалить таймер</button>
        </div>
    );
};

export default Example;

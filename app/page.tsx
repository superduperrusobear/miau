'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [240, 480, 720, 1050, 1550, 1800].map((delay, index) =>
      window.setTimeout(() => setStage(index + 1), delay),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <>
      <main className="home">
        <h1>carhuud</h1>
        <p>make yourself at home :3</p>
      </main>
      {stage < 6 && (
        <div className={`intro ${stage === 5 ? 'intro--leaving' : ''}`} aria-hidden="true">
          {stage < 4 ? (
            <div className="meows">
              {[0, 1, 2, 3].map((index) => (
                <span key={index} className={index <= stage ? 'visible' : ''}>meow</span>
              ))}
            </div>
          ) : <span className="face">:3</span>}
        </div>
      )}
    </>
  );
}

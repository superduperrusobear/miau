'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [700, 1500, 2300, 3100, 4000, 4400].map((delay, index) =>
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
          {stage < 5 ? (
            <div className="meows" key={stage}>meow</div>
          ) : <span className="face">:3</span>}
        </div>
      )}
    </>
  );
}

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
        <header className="site-header">
          <a className="wordmark" href="#top">carhuud</a>
          <nav className="socials" aria-label="Social links">
            <a href="#x">X</a>
            <a href="#telegram">TELEGRAM</a>
            <a className="dex" href="#dex" aria-label="DEX Screener">D<span>◆</span></a>
          </nav>
        </header>
        <section className="hero" id="top">
          <h1>carhuud</h1>
          <p>miao miaou miau meong miao&nbsp; nyā&nbsp; 야옹&nbsp; мяу&nbsp; <span>`miyav`</span> meow</p>
        </section>
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

'use client';

import { useEffect, useRef, useState } from 'react';

// Replace this temporary address with the real mint address at launch.
const contractAddress = '7YkD5rQm2VxN8pLc4HsW9tBf3ZaJ6uGe1KoR7nMq5XcP';

const catPhotos = [
  { file: 'sleeping.png', alt: '$MIAU asleep', caption: 'sleeping' },
  { file: 'loaf.png', alt: '$MIAU sitting in a loaf', caption: 'loaf mode' },
  { file: 'layingcute.png', alt: '$MIAU laying down looking cute', caption: 'just chilling' },
];

const faces = [
  '\\(^o^)/',
  'd(*⌒▽⌒*)b',
  '(╬ ಠ益ಠ)',
  '(*^▽^*)',
  '(✿◠‿◠)',
  '(≧∇≦)/',
  '(/◕ヮ◕)/',
  '(^o^)丿',
  '∩(·ω·)∩',
  '(·ω·)',
  '^ω^',
];

export default function Home() {
  const [stage, setStage] = useState(0);
  const meows = [
    'miao',
    'miaou',
    'miau',
    'meong',
    'nyā',
    '야옹',
    'мяу',
    'mjau',
    'miav',
    'mjá',
    'nyan',
    'yaong',
    '喵',
    'เหมียว',
    'meow',
  ];
  const [meowIndex, setMeowIndex] = useState(0);
  const [typedMeow, setTypedMeow] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [footerMeow, setFooterMeow] = useState('');
  const [burst, setBurst] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const shell = useRef<HTMLDivElement>(null);

  async function copyContract() {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
    } catch {
      const field = document.createElement('textarea');
      field.value = contractAddress;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try { setCopied(document.execCommand('copy')); } catch { setCopied(false); }
      document.body.removeChild(field);
    }
  }

  function celebrate() {
    setFooterMeow('meow');
    setBurst((value) => value + 1);
  }

  useEffect(() => {
    if (!burst) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shake = reduced ? undefined : shell.current?.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' },
       { transform: 'translateX(3px)' }, { transform: 'translateX(-2px)' },
       { transform: 'translateX(2px)' }, { transform: 'translateX(0)' }],
      { duration: 280, easing: 'ease-out' },
    );
    const timer = window.setTimeout(() => setBurst(0), 1600);
    return () => { window.clearTimeout(timer); shake?.cancel(); };
  }, [burst]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1700);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    const timers = [800, 1600, 2400, 3400, 4100, 4400].map((delay, index) =>
      window.setTimeout(() => setStage(index + 1), delay),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    const target = meows[meowIndex];
    const finished = typedMeow === target;
    const empty = typedMeow.length === 0;
    const delay = finished && !isDeleting ? 1100 : empty && isDeleting ? 220 : isDeleting ? 42 : 78;
    const timer = window.setTimeout(() => {
      if (finished && !isDeleting) setIsDeleting(true);
      else if (isDeleting && empty) {
        setIsDeleting(false);
        setMeowIndex((index) => (index + 1) % meows.length);
      } else if (isDeleting) setTypedMeow(target.slice(0, typedMeow.length - 1));
      else setTypedMeow(target.slice(0, typedMeow.length + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [isDeleting, meowIndex, typedMeow]);

  return (
    <>
      <div ref={shell} className="site-shell">
      <main className="home">
        <header className="site-header">
          <a className="wordmark" href="#top">$MIAU</a>
          <nav className="socials" aria-label="Social links">
            <a href="https://x.com/miaunotmeow" target="_blank" rel="noopener noreferrer">[ X ]</a>
            <a href="https://t.me/miaumiaumiausol" target="_blank" rel="noopener noreferrer">[ TELEGRAM ]</a>
            <a href="https://dexscreener.com/search?q=%24MIAU" target="_blank" rel="noopener noreferrer" aria-label="Search $MIAU on DEX Screener">[ DEX ]</a>
          </nav>
        </header>
        <div className="ticker" aria-label="$MIAU ticker">
          <div className="ticker-track">
            <div className="ticker-group">
              {Array.from({ length: 8 }, (_, index) => <span key={index}>$MIAU <i>:3</i></span>)}
            </div>
            <div className="ticker-group" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => <span key={index}>$MIAU <i>:3</i></span>)}
            </div>
          </div>
        </div>
        <section className="hero" id="top">
          <h1>$MIAU</h1>
          <img className="hero-cat" src="/cat-images/standing.png" alt="$MIAU standing" fetchPriority="high" decoding="async" />
          <p className="hero-meow" aria-live="polite">{typedMeow}<span className="caret" aria-hidden="true">|</span></p>
          <div className="hero-actions">
            <a className="hero-action buy-button" href="https://dexscreener.com/search?q=%24MIAU" target="_blank" rel="noopener noreferrer">buy</a>
            <button type="button" className="hero-action pet-button" onClick={celebrate}>pet</button>
          </div>
          <button type="button" className="hero-ca" onClick={copyContract} title="Copy contract address">
            <span className="ca-label">CA</span>
            <code>{contractAddress}</code>
            <span className="ca-action" aria-live="polite">{copied ? 'copied :3' : 'copy'}</span>
          </button>
        </section>
        <section className="cat-story" aria-label="$MIAU photos">
          <figure className="photo-viewer">
            <a href={`/cat-images/${catPhotos[activePhoto].file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${catPhotos[activePhoto].alt} full size`}>
              <img src={`/cat-images/${catPhotos[activePhoto].file}`} alt={catPhotos[activePhoto].alt} loading="lazy" decoding="async" />
              <span>open full size</span>
            </a>
            <figcaption>{catPhotos[activePhoto].caption}</figcaption>
          </figure>
          <div className="photo-picker" aria-label="Choose a cat photo">
            {catPhotos.map((photo, index) => (
              <button key={photo.file} type="button" className={index === activePhoto ? 'is-active' : ''} onClick={() => setActivePhoto(index)} aria-label={`Show ${photo.alt}`} aria-pressed={index === activePhoto}>
                <img src={`/cat-images/${photo.file}`} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </section>
      </main>
      <div className="ticker ticker--faces" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <div className="ticker-group" key={group}>
              {faces.map((face, index) => <span key={index}>{face}</span>)}
            </div>
          ))}
        </div>
      </div>
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="footer-name">$MIAU</span>
          <span className="footer-legal">psspssps</span>
        </div>
        <span className="footer-meow" aria-live="polite">{footerMeow || ':3'}</span>
      </footer>
      </div>
      {burst > 0 && <div key={burst} className="pet-burst" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => <span key={index} style={{
          left: `${4 + index * 37 % 92}%`, top: `${8 + index * 23 % 80}%`,
          animationDelay: `${index % 5 * 45}ms`, fontSize: `${26 + index % 4 * 8}px`,
        }}>{index % 2 === 0 ? ':3' : meows[index % meows.length]}</span>)}
      </div>}
      {stage < 6 && (
        <div className={`intro ${stage === 5 ? 'intro--leaving' : ''}`} aria-hidden="true">
          {stage < 4 ? (
            <div className="meows">
              {Array.from({ length: stage + 1 }, (_, index) => <span key={index}>meow</span>)}
            </div>
          ) : <span className="face">:3</span>}
        </div>
      )}
    </>
  );
}

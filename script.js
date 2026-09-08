const contractAddress = '7YkD5rQm2VxN8pLc4HsW9tBf3ZaJ6uGe1KoR7nMq5XcP';
const meows = ['miao', 'miaou', 'miau', 'meong', 'nyā', '야옹', 'мяу', 'mjau', 'miav', 'mjá', 'nyan', 'yaong', '喵', 'เหมียว', 'meow'];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const typedMeow = document.querySelector('#typed-meow');
let meowIndex = 0;
let typedText = '';
let deleting = false;

function typeMeow() {
  const target = meows[meowIndex];
  const finished = typedText === target;
  const empty = typedText.length === 0;
  const delay = finished && !deleting ? 1100 : empty && deleting ? 220 : deleting ? 42 : 78;

  window.setTimeout(() => {
    if (finished && !deleting) deleting = true;
    else if (deleting && empty) {
      deleting = false;
      meowIndex = (meowIndex + 1) % meows.length;
    } else if (deleting) typedText = target.slice(0, typedText.length - 1);
    else typedText = target.slice(0, typedText.length + 1);

    typedMeow.textContent = typedText;
    typeMeow();
  }, delay);
}

function runIntro() {
  const intro = document.querySelector('#intro');
  const content = document.querySelector('#intro-content');
  [800, 1600, 2400].forEach((delay, stage) => {
    window.setTimeout(() => {
      content.innerHTML = Array.from({ length: stage + 2 }, () => '<span>meow</span>').join('');
    }, delay);
  });
  window.setTimeout(() => { content.className = 'face'; content.textContent = ':3'; }, 3400);
  window.setTimeout(() => intro.classList.add('intro--leaving'), 4100);
  window.setTimeout(() => intro.remove(), 4400);
}

async function copyContract() {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(contractAddress);
  } catch {
    const field = document.createElement('textarea');
    field.value = contractAddress;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(field);
    field.select();
    document.execCommand('copy');
    field.remove();
  }
  status.textContent = 'copied :3';
  window.setTimeout(() => { status.textContent = 'copy'; }, 1700);
}

function petCat() {
  document.querySelector('#footer-meow').textContent = 'meow';
  const shell = document.querySelector('#site-shell');
  if (!reducedMotion) {
    shell.animate([
      { transform: 'translateX(0)' }, { transform: 'translateX(-3px)' },
      { transform: 'translateX(3px)' }, { transform: 'translateX(-2px)' },
      { transform: 'translateX(2px)' }, { transform: 'translateX(0)' },
    ], { duration: 280, easing: 'ease-out' });
  }

  const burst = document.createElement('div');
  burst.className = 'pet-burst';
  for (let index = 0; index < 28; index += 1) {
    const item = document.createElement('span');
    item.style.left = `${4 + (index * 37) % 92}%`;
    item.style.top = `${8 + (index * 23) % 80}%`;
    item.style.animationDelay = `${(index % 5) * 45}ms`;
    item.style.fontSize = `${26 + (index % 4) * 8}px`;
    item.textContent = index % 2 === 0 ? ':3' : meows[index % meows.length];
    burst.appendChild(item);
  }
  document.body.appendChild(burst);
  window.setTimeout(() => burst.remove(), 1600);
}

document.querySelector('#copy-contract').addEventListener('click', copyContract);
document.querySelector('#pet-button').addEventListener('click', petCat);

document.querySelectorAll('.photo-picker button').forEach((button) => {
  button.addEventListener('click', () => {
    const file = button.dataset.file;
    const alt = button.dataset.alt;
    document.querySelector('#main-photo').src = `public/cat-images/${file}`;
    document.querySelector('#main-photo').alt = alt;
    document.querySelector('#main-photo-link').href = `public/cat-images/${file}`;
    document.querySelector('#main-photo-link').ariaLabel = `Open ${alt} full size`;
    document.querySelector('#photo-caption').textContent = button.dataset.caption;
    document.querySelectorAll('.photo-picker button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
  });
});

runIntro();
typeMeow();

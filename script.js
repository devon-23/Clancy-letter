const generateBtn = document.getElementById('generate');
const shuffleBtn = document.getElementById('shuffle');
const restartBtn = document.getElementById('restart');
const downloadBtn = document.getElementById('download');
const letterContainer = document.querySelector('.letter-container');
const inputContainer = document.querySelector('.input-container');
const letter = document.getElementById('letter');

const themes = [
  'theme-typewriter',
  'theme-xerox',
  'theme-inverted',
  'theme-red',
  'theme-smudged'
];

let currentTheme = null;

// --- Generate Letter ---
generateBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) {
    alert('Please fill out both fields!');
    return;
  }

  // Random theme on first generation
  currentTheme = themes[Math.floor(Math.random() * themes.length)];
  letter.className = 'letter ' + currentTheme;

  // Clear letter content
  letter.innerHTML = '';

  inputContainer.classList.add('hidden');
  letterContainer.classList.remove('hidden');

  // Animate the text as if being typed
  const text = `Dear ${name},\n\n${message}\n\n- Clancy`;
  typeText(letter, text, 25);
});

// --- Typewriter Effect ---
function typeText(element, text, speed) {
    let i = 0;
    const p = document.createElement('div');
    p.style.whiteSpace = 'pre-wrap';
    p.style.wordWrap = 'break-word';
    p.style.overflowWrap = 'break-word';
    element.appendChild(p);
  
    const interval = setInterval(() => {
      p.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }
  

// --- Shuffle Random Style ---
shuffleBtn.addEventListener('click', () => {
  let newTheme;
  do {
    newTheme = themes[Math.floor(Math.random() * themes.length)];
  } while (newTheme === currentTheme); // avoid same theme

  currentTheme = newTheme;
  letter.className = 'letter ' + currentTheme;

  // Trigger re-fade
  letter.style.animation = 'none';
  letter.offsetHeight; // reflow
  letter.style.animation = 'fadeIn 0.7s ease';
});

// --- Restart ---
restartBtn.addEventListener('click', () => {
  letterContainer.classList.add('hidden');
  inputContainer.classList.remove('hidden');
  document.getElementById('name').value = '';
  document.getElementById('message').value = '';
  letter.innerHTML = '';
});

// --- Download as Image ---
downloadBtn.addEventListener('click', () => {
    html2canvas(letter, {
      scale: 2,
      useCORS: true,
      // backgroundColor: null   ← remove this line
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'clancy-letter.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
  

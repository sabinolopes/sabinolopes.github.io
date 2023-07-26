const htmlElement = document.documentElement;
const coloredBalls = document.querySelectorAll('.ball');
const checkbox = document.querySelector('#dark-toogle');
const text = document.querySelector('#rgb-color');
const answerText = document.querySelector('#answer');
const resetButton = document.querySelector('#reset-game');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
  htmlElement.classList.add('dark-mode');
  checkbox.checked = true;
}

htmlElement.addEventListener('change', () => {
  htmlElement.classList.toggle('dark-mode');

  // Salva o estado atual no localStorage
  isDarkMode = htmlElement.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
});

const randomColors = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `(${r}, ${g}, ${b})`;
};

const guessingColor = (event) => {
  const target = event.target;
  const noRgbText = target.style.backgroundColor;

  if (noRgbText.substring(3) === text.innerText) {
    answerText.innerText = 'Acertou!';
  } else {
    answerText.innerText = 'Errou! Tente novamente!';
  }
};

const genarateColors = () => {
  const chooseColor = Math.floor(Math.random() * coloredBalls.length);

  coloredBalls.forEach((color, index) => {
    color.style.backgroundColor = `rgb${randomColors()}`;

    if (chooseColor === index) {
      const rgbText = coloredBalls[index].style.backgroundColor;
      text.innerText = rgbText.substring(3);
    }

    color.addEventListener('click', guessingColor);
  });
};
genarateColors();

resetButton.addEventListener('click', () => {
  genarateColors();
  answerText.innerText = 'Escolha uma cor';
});

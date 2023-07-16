const colors = document.querySelectorAll('.color');
const board = document.querySelector('#pixel-board');
if (localStorage.getItem('pixelBoard') === null) {
  localStorage.setItem('pixelBoard', JSON.stringify([]));
}
const pixelsRows = [1, 2, 3, 4, 5];

// Define a cor de fundo da paleta
colors.forEach((color) => {
  color.style.backgroundColor = color.innerText;
});

// Cria as linhas de pixels
const createPixelsLine = () => {
  pixelsRows.forEach((number) => {
    const row = document.createElement('div');
    row.className = 'row';
    row.style.maxHeight = '42px';
    board.appendChild(row);
  });
};
createPixelsLine();

const rows = document.querySelectorAll('.row');

// Cria os pixels
const fillPixelsLine = () => {
  rows.forEach((rw) => {
    pixelsRows.forEach((n) => {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.border = '1px solid black';
      pixel.style.width = '40px';
      pixel.style.height = '40px';
      pixel.style.backgroundColor = 'white';
      pixel.style.display = 'inline-block';
      rw.appendChild(pixel);
    });
  });
};
fillPixelsLine();

// Seleciona as cores da paleta
let selectedColor = null;

colors.forEach((selected) => {
  selected.addEventListener('click', () => {
    if (selectedColor !== null) {
      selectedColor.classList.remove('selected');
    }
    if (selectedColor !== selected) {
      selected.classList.add('selected');
      selectedColor = selected;
    } else {
      selectedColor = null;
    }
  });
});

// Coloca as cores nos pixels
const coloredPixels = document.querySelectorAll('.pixel');
const savedColors = JSON.parse(localStorage.getItem('pixelBoard')) || []; // Salva as cores para usar no getColorsBack

coloredPixels.forEach((pixel, index) => {
  pixel.addEventListener('click', (event) => {
    if (!selectedColor) return;
    const eventTarget = event.target;
    const backgroundElement = selectedColor.style.backgroundColor;
    eventTarget.style.backgroundColor = backgroundElement;

    const pixelsColors = {
      color: pixel.style.backgroundColor,
      index,
    };
    savedColors.push(pixelsColors);
    localStorage.setItem('pixelBoard', JSON.stringify(savedColors));
  });
});

// Criando botão que resta o border
const button = document.createElement('button');
button.id = 'clear-board';
button.innerText = 'Limpar';
button.style.marginBottom = '10px';
const palette = document.querySelector('section');
palette.appendChild(button);

button.addEventListener('click', () => {
  coloredPixels.forEach((p) => {
    p.style.backgroundColor = 'white';
  });
  localStorage.removeItem('pixelBoard');
});

// Criando botão de cores aleatórias
const randomColors = () => {
  const r = parseInt(Math.random() * 255);
  const g = parseInt(Math.random() * 255);
  const b = parseInt(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
};

const buttonRandom = document.createElement('button');
buttonRandom.id = 'button-random-color';
buttonRandom.innerText = 'Cores aleatórias';
buttonRandom.style.margin = '10px';
board.appendChild(buttonRandom);

buttonRandom.addEventListener('click', () => {
  colors.forEach((square) => {
    square.style.backgroundColor = randomColors();
  });
});

// Recupera as cores do localStorage
const getColorsBack = () => {
  savedColors.forEach((getBack) => {
    const pixel = coloredPixels[getBack.index];
    pixel.style.backgroundColor = getBack.color;
  });
};

window.onload = getColorsBack;

// Input que muda o border
const btnChangeBorder = document.querySelector('#generate-board');
const inputNumber = document.querySelector('#board-size');

btnChangeBorder.addEventListener('click', (event) => {
  event.preventDefault();
  rows.forEach((row) => {
    row.remove();
  });
  localStorage.removeItem('pixelBoard');
  const value = inputNumber.value;
  for (let count = 1; count <= value; count += 1) {
    if (!pixelsRows.includes(count)) {
      pixelsRows.push(count);
    }
  }
  inputNumber.value = '';

  createPixelsLine();
  fillPixelsLine();
});

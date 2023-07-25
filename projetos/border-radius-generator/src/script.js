const topRight = document.querySelector('#input-tr');
const bottomRight = document.querySelector('#input-br');
const topLeft = document.querySelector('#input-tl');
const bottomLeft = document.querySelector('#input-bl');
const allBorders = document.querySelector('#input-all');
const surface = document.querySelector('#surface');
const textArea = document.querySelector('#text');
const copyButton = document.querySelector('button'); 
const borderTextTR = 'border-top-right-radius';
const borderTextBR = 'border-bottom-right-radius';
const borderTextTL = 'border-top-left-radius';
const borderTextBL = 'border-bottom-left-radius';
const borderTextAll = 'border-radius';

const changeBorder = (value, border, borderText) => {
  const existingText = textArea.value;
  const regExp = new RegExp(`${borderText}: \\d+px`, 'g');

  if (value) {
    if (existingText.match(regExp)) {
      textArea.value = existingText.replace(regExp, `${borderText}: ${value}px`);
    } else {
      textArea.value = `${existingText.trim()}\n${borderText}: ${value}px`;
    }
  } else {
    textArea.value = existingText.replace(regExp, '');
  }

  surface.style[border] = `${value}px`;
};

topRight.addEventListener('input', () => {
  const borderValue = topRight.value;
  const border = 'borderTopRightRadius';

  changeBorder(borderValue, border, borderTextTR);
});

bottomRight.addEventListener('input', () => {
  const borderValue = bottomRight.value;
  const border = 'borderBottomRightRadius';

  changeBorder(borderValue, border, borderTextBR);
});

topLeft.addEventListener('input', () => {
  const borderValue = topLeft.value;
  const border = 'borderTopLeftRadius';

  changeBorder(borderValue, border, borderTextTL);
});

bottomLeft.addEventListener('input', () => {
  const borderValue = bottomLeft.value;
  const border = 'borderBottomLeftRadius';

  changeBorder(borderValue, border, borderTextBL);
});

allBorders.addEventListener('input', () => {
  const borderValue = allBorders.value;
  const border = 'borderRadius';

  changeBorder(borderValue, border, borderTextAll)
});

const reloadPage = () => {
  window.location.reload();
}


copyButton.addEventListener('click', () => {
  const inputText = textArea.value;

  navigator.clipboard.writeText(inputText);

  textArea.value = 'Copied!';

  copyButton.innerHTML = `<span class="material-icons">done</span>`
  
  setTimeout(reloadPage, 1500);
});
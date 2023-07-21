const figcaption = document.querySelector('figcaption');
const textInput = document.querySelector('#text-input');
const imgInput = document.querySelector('#meme-insert');
const memeImg = document.querySelector('#meme-image');
const fireButton = document.querySelector('#fire');
const waterButton = document.querySelector('#water');
const earthButton = document.querySelector('#earth');
const memeContainer = document.querySelector('#meme-image-container');
const miniImgs = document.querySelectorAll('#mini-imgs img');


textInput.addEventListener('input', () => {
  figcaption.innerText = textInput.value;
});

imgInput.addEventListener('change', (event) => {
  const fileImg = event.target.files[0];

  if (fileImg) {
    const url = URL.createObjectURL(fileImg);
    memeImg.src = url;
  }
});

fireButton.addEventListener('click', () => {
  memeContainer.className = '';
  memeContainer.classList.toggle('red');
});

waterButton.addEventListener('click', () => {
  memeContainer.className = '';
  memeContainer.classList.toggle('blue');
});

earthButton.addEventListener('click', () => {
  memeContainer.className = '';
  memeContainer.classList.toggle('green');
});

miniImgs.forEach((img) => {
  img.addEventListener('click', (event) => {
    const imgSrc = event.target.src;
    memeImg.src = imgSrc;
  });
});

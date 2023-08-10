const loginButton = document.querySelector('#login');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('#submit-btn');
const agreementCheckbox = document.querySelector('#agreement');
const counter = document.querySelector('#counter');
const textarea = document.querySelector('#textarea');

loginButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (email === 'tryber@teste.com' && password === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
  emailInput.value = '';
  passwordInput.value = '';
});

agreementCheckbox.addEventListener('change', (event) => {
  const isChecked = event.target.checked;

  if (isChecked) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.disabled = true;
  }
});

textarea.addEventListener('focus', () => {
  textarea.value = '';
});

textarea.addEventListener('input', (event) => {
  let charCount = parseInt(counter.innerText, 10);

  if (event.inputType === 'deleteContentBackward' && charCount < 500) {
    charCount += 1;
    counter.innerText = charCount;
  } else if (charCount > 0) {
    charCount -= 1;
    counter.innerText = charCount;
  }

  if (textarea.value.length === 0) {
    counter.innerText = '500';
  }
});

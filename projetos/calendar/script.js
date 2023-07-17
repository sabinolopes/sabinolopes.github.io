const createDaysOfTheWeek = () => {
  const weekDays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  const weekDaysList = document.querySelector('.week-days');

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement('li');
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  }
};

createDaysOfTheWeek();

const decemberDaysList = [
  29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

// Requisito 1
const days = document.querySelector('#days');

for (let index = 0; index < decemberDaysList.length; index += 1) {
  const day = document.createElement('li');
  const december = decemberDaysList[index];
  day.innerText = december;
  day.className = 'day';
  days.appendChild(day);

  if (december === 24 || december === 31) {
    day.classList.add('holiday');
  } else if (december === 25) {
    day.classList.add('holiday', 'friday');
  } else if (december === 4 || december === 11 || december === 18) {
    day.classList.add('friday');
  }
}
//  Requisito 2
const holidaysButton = document.querySelector('#btn-holiday');
const holidays = document.querySelectorAll('.holiday');

let isHolidayColored = false;

// Tentando com forEach para ficar mais enxuto
holidaysButton.addEventListener('click', () => {
  if (!isHolidayColored) {
    holidays.forEach((holiday) => {
      holiday.style.backgroundColor = 'lightgreen';
    });
    isHolidayColored = true;
  } else {
    holidays.forEach((holiday) => {
      holiday.style.backgroundColor = 'rgb(238, 238, 238)';
    });
    isHolidayColored = false;
  }
});

//  Requisito 3
const fridayButton = document.querySelector('#btn-friday');
const fridays = document.querySelectorAll('.friday');
let isFriday = false;
const originalTexts = [];

fridays.forEach((friday) => {
  originalTexts.push(friday.innerText); // armazena os dias (4, 11, 18 e 25);
});

fridayButton.addEventListener('click', () => {
  if (!isFriday) {
    fridays.forEach((friday) => {
      friday.innerText = 'É sexta feira!';
    });
    isFriday = true;
  } else {
    fridays.forEach((friday, index) => {
      friday.innerText = originalTexts[index];
    });
    isFriday = false;
  }
});

// Requisito 4
const monthDays = document.querySelectorAll('.day');

monthDays.forEach((day) => {
  day.addEventListener('mouseover', (event) => {
    const zoomInElement = event.target;

    zoomInElement.style.fontSize = '30px';
  });
});

monthDays.forEach((day) => {
  day.addEventListener('mouseleave', (event) => {
    const zoomOutElement = event.target;

    zoomOutElement.style.fontSize = '20px';
  });
});

// Requisito 5
const tasks = document.querySelectorAll('.task');
let selectedTask = null;

tasks.forEach((task) => {
  task.addEventListener('click', () => {
    if (selectedTask === task) {
      task.classList.remove('selected');
      selectedTask = null;
    } else {
      task.classList.add('selected');
      selectedTask = task;
    }
  });
});
// Esse código funciona na prática, proém o cypress não passava. Usar target é melhor para garantir que a ação ocorra no lugar certo.
// monthDays.forEach((day) => {
//   day.addEventListener('click', () => {
//     if (day.style.color !== 'rgb(119, 119, 119)') {
//       day.style.color = 'rgb(119, 119, 119)';
//     } else if (selectedTask) {
//       day.style.color = selectedTask.style.backgroundColor;
//     }
//   });
// });

// Usando target abaixo
monthDays.forEach((day) => {
  day.addEventListener('click', (event) => {
    const eventTarget = event.target;
    const backgroundElement = selectedTask.style.backgroundColor;

    if (eventTarget.style.color === backgroundElement) {
      eventTarget.style.color = 'rgb(119,119,119)';
    } else {
      eventTarget.style.color = backgroundElement;
    }
  });
});

// Requisito 6
const addButton = document.querySelector('#btn-add');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

addButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevenir o comportamento padrão do formulário
  let value = taskInput.value;
  const li = document.createElement('li');
  if (value === '') {
    alert('Erro! Nenhum compromisso foi digitado!');
  }
  li.innerText = value;
  taskList.appendChild(li);
  taskInput.value = '';
});

document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addButton.click();
  }
});

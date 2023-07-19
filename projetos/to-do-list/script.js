const button = document.querySelector('#criar-tarefa');
const input = document.querySelector('#texto-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const deleteButton = document.querySelector('#apaga-tudo');
const deleteCompleted = document.querySelector('#remover-finalizados');
const saveButton = document.querySelector('#salvar-tarefas');
const savedTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];
const moveUpButton = document.querySelector('#mover-cima');
const moveDownButton = document.querySelector('#mover-baixo');
const removeSelectedButton = document.querySelector('#remover-selecionado');

button.addEventListener('click', () => {
  const newTask = document.createElement('li');
  const newTaskText = input.value;

  if (newTaskText !== '') {
    newTask.innerText = newTaskText;
    taskList.appendChild(newTask);
    input.value = '';
  }
});

document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    button.click();
  }
});

taskList.addEventListener('click', (event) => {
  const listItem = event.target;

  if (listItem.tagName === 'LI') {
    const selectedTask = document.querySelectorAll('.selected');
    selectedTask.forEach((task) => {
      task.classList.remove('selected');
    });
    listItem.classList.add('selected');
  }
});

taskList.addEventListener('dblclick', (event) => {
  const completedTask = event.target;

  completedTask.classList.toggle('completed');
});

deleteButton.addEventListener('click', () => {
  const tasks = document.querySelectorAll('li');
  tasks.forEach((task) => {
    taskList.removeChild(task);
  });
  localStorage.removeItem('savedTasks');
});

deleteCompleted.addEventListener('click', () => {
  const completed = document.querySelectorAll('.completed');

  completed.forEach((completedTask) => {
    taskList.removeChild(completedTask);
  });
});

saveButton.addEventListener('click', () => {
  const taskToSave = document.querySelectorAll('li');
  taskToSave.forEach((toSave) => {
    const saveTask = {
      task: toSave.innerHTML,
      class: toSave.className,
    };
    savedTasks.push(saveTask);
  });
  localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
});

const getTaskBack = () => {
  savedTasks.forEach((save) => {
    const oldTask = document.createElement('li');
    oldTask.innerHTML = save.task;
    oldTask.className = save.class;
    taskList.appendChild(oldTask);
  });
};
window.onload = getTaskBack;

// Função para mover um item para cima
moveUpButton.addEventListener('click', () => {
  const currentItem = document.querySelector('.selected');
  const prevItem = currentItem.previousElementSibling;
  if (prevItem) {
    taskList.insertBefore(currentItem, prevItem);
  }
});

// Função para mover um item para baixo
moveDownButton.addEventListener('click', () => {
  const currentItem = document.querySelector('.selected');
  const nextItem = currentItem.nextElementSibling;
  if (nextItem) {
    taskList.insertBefore(nextItem, currentItem);
  }
});

// Função para remover item selecionado
removeSelectedButton.addEventListener('click', () => {
  const selectedTask = document.querySelector('.selected');
  taskList.removeChild(selectedTask);
});

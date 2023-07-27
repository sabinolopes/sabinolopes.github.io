const chaptersList = document.querySelector('#chapters ul');
const chaptersMenu = document.querySelector('#chapters-menu');

chaptersMenu.addEventListener('click', () => {
  if (chaptersList.style.display === 'block') {
    chaptersList.style.display = 'none'; 
  } else {
    chaptersList.style.display = 'block'; 
  }
});
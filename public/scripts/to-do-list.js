// SELECT ELEMENTS
const list = document.querySelector('.list');
const addItem = document.querySelector('.addItem');
const trashIcon = document.querySelector('.fa-trash-alt');
const textToDo = document.querySelector('.textToDo');
const addButton = document.querySelector('.fa-plus-circle');
const refreshList = document.querySelector('.fa-sync-alt');
const input = document.querySelector('.inputToDo');
const alertToDo = document.querySelector('.alertPopUp');
const alertPhrase = document.querySelector('.alertPopUp span');
const alertButton = document.querySelector('.alertPopUp a');
const alertIcon = document.querySelector('.fa-hand-paper');
const alertIcon2 = document.querySelector('.fa-exclamation-circle');


// FUNCTION ADD TO-DO
const addToDo = (text) => {
  const toDo = `
  <li class="item">
    <i class="far fa-circle"></i>
    <p class="textToDo">${text}</p>
    <i class="far fa-trash-alt"></i>
  </li>`

  list.insertAdjacentHTML("beforeend", toDo);
}


// ADD TO-DO WITH ENTER KEY AND MOUSE CLICK AND SHOW TO-DO LIMIT ALERT
const todoStore = [];

const executeToDo = (event) => {
  if ((event.key === 'Enter' || event.type === 'click') && todoStore.length < 9) {
    const text = input.value;
    if (text) {
      addToDo(text);
      todoStore.push(text)
    }
    input.value = '';
    // console.log(todoStore);

  } else if ((event.key === 'Enter' || event.type === 'click') && todoStore.length >= 9) {
    alertIcon2.style.display = 'none';
    alertIcon.style.display = 'block';
    alertToDo.style.display = 'flex';
    alertPhrase.innerHTML = '<h1>You have reached the to-do items limit.</h1>';
    alertButton.addEventListener('click', () => {
      alertToDo.style.display = 'none';
    })
  }
};

// FUNCTION DELETE A TO-DO
const deleteToDo = (event) => {
  const itemClicked = event.target;
  const itemClickedText = event.target.parentElement.outerText;
  const itemClickedClass = event.target.classList.value;
  if (itemClickedClass === 'far fa-trash-alt') {
    itemClicked.parentNode.remove();
  }
  todoStore.forEach((item, index) => {
    if (itemClickedText == item) {
      todoStore.splice(index, 1)
    }
  })
  // console.log(todoStore);
}

// REFRESH TO-DO LIST
const clearAll = () => {
  todoStore.length = 0;
  list.innerHTML = '';
  // console.log(todoStore);

}

// HANDLE ENTER KEY AND MOUSE CLICK EVENTS
addItem.addEventListener('keyup', executeToDo);
addButton.addEventListener('click', executeToDo);
refreshList.addEventListener('click', clearAll);
list.addEventListener('click', deleteToDo);
// SELECT ELEMENTS
const list = document.querySelector('.list');
const addItem = document.querySelector('.addItem');
const textToDo = document.querySelector('.textToDo');
const addButton = document.querySelector('.fa-plus-circle');
const itemToDo = document.querySelector('.item');
const colorButton = document.querySelector('.transparent');
const todoColors = document.querySelector('.todoColors');
const colors = document.querySelectorAll('.colors');
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const color3 = document.querySelector('.color3');
const color4 = document.querySelector('.color4');
const refreshButton = document.querySelector('.fa-sync-alt');
const input = document.querySelector('.inputToDo');
const alertToDo = document.querySelector('.alertPopUp');
const alertPhrase = document.querySelector('.alertPopUp span');
const alertButton = document.querySelector('.alertPopUp a');
const alertIconToDo = document.querySelector('.fa-exclamation-circle');

// FUNCTION TO OPEN TODO PALLET COLOR
const openPalletColor = () => {
  if (todoColors.style.display === 'flex') {
    todoColors.style.display = 'none';
  } else {
    todoColors.style.display = 'flex';
    todoColors.style.setProperty('gap', '12px');
    colorButton.style.setProperty('margin-right', '12px');
    colors.forEach((item, index) => {
      colors[index].addEventListener('click', () => {
        todoColors.style.removeProperty('gap', '12px');
        colorButton.style.removeProperty('margin-right', '12px');
        todoColors.style.display = 'none';
      })
    })
  }
};

// FUNCTION TO CHANGE TODO COLOR
const selectColor = (event) => {
  const colorID = event.target.id;
  const colorClicked = event.target;

  // PALLET COLOR CHANGE
  const changeColor = (id) => {
    if (colorClicked.classList.contains('fas') && colorButton.classList.contains('far')) {
      const colorSaved = colorClicked.classList.item(3);
      colorClicked.className = `far fa-square colors transparent animation${id}`;
      colorButton.className = `fas fa-square ${colorSaved}`;
    } else if (colorClicked.classList.contains('far') && colorButton.classList.contains('fas')) {
      const colorSaved = colorButton.classList.item(2);
      colorButton.className = `far fa-square transparent`;
      colorClicked.className = `fas fa-square colors ${colorSaved} animation${id}`;
    } else if (colorClicked.classList.contains('fas') && colorButton.classList.contains('fas')) {
      const colorSaved1 = colorClicked.classList.item(3);
      const colorSaved2 = colorButton.classList.item(2);
      colorButton.className = `fas fa-square ${colorSaved1}`;
      colorClicked.className = (`fas fa-square colors ${colorSaved2} animation${id}`);
    }
  }
  changeColor(colorID);
}


// FUNCTION ADD TO-DO
const addToDo = (text, backgColor) => {
  const toDo = `
  <li class= "item" style="background-color:${backgColor};">
    <i class="far fa-circle"></i>
    <p class="textToDo">${text}</p>
    <i class="far fa-trash-alt"></i>
  </li>`

  list.insertAdjacentHTML("beforeend", toDo);
}


// ADD TO-DO WITH ENTER KEY AND MOUSE CLICK AND SHOW TO-DO LIMIT ALERT
const todoStore = [];
let backgColor = 'transparent'

const executeToDo = (event) => {
  if ((event.key === 'Enter' || event.type === 'click') && todoStore.length < 9) {
    // SET TODO COLOR
    switch (colorButton.classList.item(2)) {
      case 'transparent':
        backgColor = 'transparent';
        break;
      case 'color1':
        backgColor = 'cornflowerblue';
        break;
      case 'color2':
        backgColor = 'darkviolet';
        break;
      case 'color3':
        backgColor = 'tomato';
        break;
      case 'color4':
        backgColor = 'darkgoldenrod';
    }

    // CREATE TODO ITEM OBJECT
    const text = input.value;
    if (text) {
      addToDo(text, backgColor);
      todoStore.push({
        text: text,
        backgColor: backgColor
      });
      // ANIMATION OF PLUS CIRCLE BUTTON
      addButton.style.animation = 'rotation 1s ease-out';
      setTimeout(() => {
        addButton.style.removeProperty('animation');
      }, 1000);
    }
    input.value = '';
    // console.log(todoStore);
    // DISPLAY LIMIT ALERT
  } else if ((event.key === 'Enter' || event.type === 'click') && todoStore.length >= 9) {
    if (alertIconToDo.classList.contains('fa-exclamation-circle')) {
      alertIconToDo.classList.remove('fa-exclamation-circle');
      alertIconToDo.classList.add('fa-hand-paper');
    }

    alertToDo.style.display = 'flex';
    alertPhrase.innerHTML = '<h1>You have reached the to-do items limit.</h1>';
    alertButton.addEventListener('click', () => {
      alertToDo.style.display = 'none';
    })
    input.value = '';
  }
};

// FUNCTION DELETE A TO-DO
const deleteToDo = (event) => {
  const itemClicked = event.target;
  const itemClickedClass = event.target.classList.value;

  if (itemClickedClass === 'far fa-trash-alt') {
    const itemClickedText = event.target.previousElementSibling.textContent;
    itemClicked.parentElement.remove();

    todoStore.forEach((item, index) => {
      if (itemClickedText == item) {
        todoStore.splice(index, 1)
      }
    })
  }
  // console.log(todoStore);
};


// REFRESH TO-DO LIST
const clearAll = () => {
  if (todoStore.length > 0) {
    todoStore.length = 0;
    list.innerHTML = '';
    // console.log(todoStore);

    refreshButton.classList.add("fa-spin");
    setTimeout(() => {
      refreshButton.classList.remove("fa-spin");
    }, 1000);
  }
};

// HANDLE ENTER KEY AND MOUSE CLICK EVENTS
colorButton.addEventListener('click', openPalletColor);
todoColors.addEventListener('click', selectColor);
addItem.addEventListener('keyup', executeToDo);
addButton.addEventListener('click', executeToDo);
refreshButton.addEventListener('click', clearAll);
list.addEventListener('click', deleteToDo);
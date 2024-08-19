//form ==> submit ==> create new todo ==> object{id, createAt, title: , isCompleted}
//const todos = [] ==> todos.push(...)
//let todos = [];
let filterValue = "all";
// selecting
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const selectFilter = document.querySelector(".filter-todos");

//events
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
});
todoForm.addEventListener("submit", addNewTodo);

function addNewTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(), //time stamp
    createdAt: new Date().toISOString(), // تاریخ اونروز به فرمت isos
    title: todoInput.value,
    isCompleted: false,
  };

  //todos.push(newTodo);
  //console.log(todos);
  saveTodos(newTodo);
  //create todos on DOM
  //createTodos(todos);// باید به جاش فیلتر بذاریم
  filterTodos();
}

//create todos on DOM
function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
            <p class="todo__title ${todo.isCompleted && "completed"}">${
      todo.title
    }</p>
            <span class="todo__createdAt">${new Date(
              todo.createdAt
            ).toLocaleDateString("fa-IR")}</span>
            <button class="todo__check" data-todo-id=${
              todo.id
            }><i class="far fa-check-square"></i></button>
             <button class="todo__remove" data-todo-id=${
               todo.id
             }><i class="far fa-trash-alt"></i></button>
             <button class="todo__edit" data-todo-id=${
               todo.id
             }><i class="far fa-edit"></i></button>
             <div>
             <div class="backdrop hidden"></div>
              <div class="modal hidden">
              <div class="modal__header">
              <h2>${todo.title}</h2>
              <button class="close-modal" data-todo-id=${todo.id}>❌</button>
              </div>
              </div>
              <div>
          </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));

  const editBtns = [...document.querySelectorAll(".todo__edit")];
  editBtns.forEach((btn) => btn.addEventListener("click", editTodo));

  const modal = document.querySelector(".modal");
  const closeModalBtn = [...document.querySelectorAll(".close-modal")];
  closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));
  const backDrop = [...document.querySelectorAll(".backdrop")];
  backDrop.forEach((btn) => btn.addEventListener("click", closeModal));

  //selectFilter.addEventListener("change", filterTodos);
  selectFilter.addEventListener("change", (e) => {
    filterValue = e.target.value;
    filterTodos();
  });
}

function filterTodos() {
  //console.log(e.target.value);
  //switch
  // const filter = e.target.value;
  const todos = getAllTodos(); //دیگه تودوز گلوبال نیست باید از لوکال استرویج بگیره
  switch (filterValue) {
    case "all": {
      // all todos
      //add all todos to DOM
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((todo) => todo.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((todo) => !todo.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    default: {
      createTodos(todos);
    }
  }
}

// ///////////removeButton.addEventListener("click", ()=>{}) !!!!!!!! does not exist in HTML
function removeTodo(e) {
  //   //console.log(e.target.dataset);
  let todos = getAllTodos(); //دیگه تودوز گلوبال نیست باید از لوکال استرویج بگیره
  const todoId = Number(e.target.dataset.todoId);
  const filteredTodos = todos.filter((todo) => todo.id !== todoId);
  todos = filteredTodos;
  //createTodos(todos);// باید به جاش فیلتر بذاریم
  saveTodostoLocalStorage(todos);
  filterTodos();
}

function checkTodo(e) {
  //console.log(e.target.dataset.todoId);
  let todos = getAllTodos(); //دیگه تودوز گلوبال نیست باید از لوکال استرویج بگیره
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveTodostoLocalStorage(todos);
  //createTodos(todos);// باید به جاش فیلتر بذاریم
  filterTodos();
}

function editTodo(e) {
  showModal();
  let todos = getAllTodos(); //دیگه تودوز گلوبال نیست باید از لوکال استرویج بگیره
  console.log("todos: ", todos);

  // const todoId = Number(e.target.dataset.todoId);
  // const todo = todos.find((todo) => todo.id === todoId);
  // todo.title = e.target.value;
  // saveTodostoLocalStorage(todos);
}

function showModal() {
  const modal = document.querySelector(".modal");
  const backDrop = document.querySelector(".backdrop");
  modal.classList.remove("hidden");
  backDrop.classList.remove("hidden");
}
function closeModal() {
  const modal = document.querySelector(".modal");
  const backDrop = document.querySelector(".backdrop");
  modal.classList.add("hidden");
  backDrop.classList.add("hidden");
}

//local storage == web API
//localStorage.setItem("todos", todos)!!!!
// localStorage.setItem("todos", JSON.stringify(todos));
// JSON.parse(localStorage.getItem("todos"));

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  //یا const savedTodos = JSON.parse(localStorage.getItem("todos")) ? JSON.parse(localStorage.getItem("todos")): [];
  return savedTodos;
}

function saveTodos(todo) {
  const savedTodos = getAllTodos();
  //یا const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveTodostoLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

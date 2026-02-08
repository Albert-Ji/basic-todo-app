import "../style.css";

// Get the necessary DOM elements
const todoListElement = document.getElementById("todo-list");
const inputNewTodo = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");

// Define the state of our app
let todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];
let nextTodoId = 4;
let filter = "all"; // can be 'all', 'active', or 'completed'

// Function to render the todos based on the current filter
function renderTodos() {
  // Clear the current list to avoid duplicates
  todoListElement.innerHTML = "";

  // Filter todos based on the current filter setting
  let filteredTodos = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (filter === "all") {
      filteredTodos.push(todo);
    } else if (filter === "completed" && todo.completed === true) {
      filteredTodos.push(todo);
    } else if (filter === "active" && todo.completed === false) {
      filteredTodos.push(todo);
    }
  }

  // Loop through the filtered todos and add them to the DOM
  for (let i = 0; i < filteredTodos.length; i++) {
    const todo = filteredTodos[i];

    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");

    const todoText = document.createElement("div");
    todoText.id = `todo-text-${todo.id}`;
    todoText.classList.add("todo-text");
    if (todo.completed) {
      todoText.classList.add("line-through");
    }
    todoText.innerText = todo.text;
    todoItem.appendChild(todoText);

    const todoEdit = document.createElement("input");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;
    todoItem.appendChild(todoEdit);

    todoListElement.appendChild(todoItem);
  }
}

// Function to handle adding a new todo
function handleKeyDownToCreateNewTodo(event) {
  const newTodoInput = event.target;
  const todoText = newTodoInput.value.trim();
  if (event.key === "Enter" && todoText !== "") {
    todos.push({ id: nextTodoId++, text: todoText, completed: false });
    newTodoInput.value = ""; // clear the input
    renderTodos();
  }
}

// Event handler to filter the todos based on the navbar selection
const handleClickOnNavbar = (event) => {
  // if the clicked element is an anchor tag
  if (event.target.tagName === "A") {
    const hrefValue = event.target.href;
    filter = hrefValue.split("/").pop() || "all";
    renderTodoNavBar(hrefValue);
    renderTodos();
  }
};

// Helper function to update the class list of a navbar element
const updateClassList = (element, isActive) => {
  const classes = [
    "underline",
    "underline-offset-4",
    "decoration-rose-800",
    "decoration-2",
  ];
  if (isActive) {
    element.classList.add(...classes);
  } else {
    element.classList.remove(...classes);
  }
};

// Function to update the navbar anchor elements
const renderTodoNavBar = (href) => {
  Array.from(todoNav.children).forEach((element) => {
    updateClassList(element, element.href === href);
  });
};

// Function to toggle the completed status of a todo
function handleClickOnTodoList(event) {
  let todo = null;
  if (event.target.id !== null && event.target.id.includes("todo-text")) {
    todo = event.target;
  }

  let todoIdNumber = -1;
  if (todo) {
    const todoId = event.target.id.split("-").pop();
    todoIdNumber = Number(todoId);
  }

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoIdNumber) {
      todos[i].completed = !todos[i].completed;
    }
  }

  // Re-render the app UI
  renderTodos();
}

// Add the event listeners
todoListElement.addEventListener("click", handleClickOnTodoList);
inputNewTodo.addEventListener("keydown", handleKeyDownToCreateNewTodo);
todoNav.addEventListener("click", handleClickOnNavbar);
document.addEventListener("DOMContentLoaded", renderTodos);

// Loop through the filtered todos and add them to the DOM
filteredTodos.forEach((todo) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("p-4", "todo-item");
  todoListElement.appendChild(todoItem);

  const todoText = document.createElement("div");
  todoText.id = `todo-text-${todo.id}`;
  todoText.classList.add("todo-text");
  if (todo.completed) {
    todoText.classList.add("line-through");
  }
  todoText.innerText = todo.text;
  todoItem.appendChild(todoText);

  const todoEdit = document.createElement("input");
  todoEdit.classList.add("hidden", "todo-edit");
  todoEdit.value = todo.text;
  todoItem.appendChild(todoEdit);
});

// Helper function to create todo text element
const createTodoText = (todo) => {
  const todoText = document.createElement("div");
  todoText.id = `todo-text-${todo.id}`;
  todoText.classList.add(
    "todo-text",
    ...(todo.completed ? ["line-through"] : []),
  );
  todoText.innerText = todo.text;
  return todoText;
};

// Helper function to create todo edit input element
const createTodoEditInput = (todo) => {
  const todoEdit = document.createElement("input");
  todoEdit.classList.add("hidden", "todo-edit");
  todoEdit.value = todo.text;
  return todoEdit;
};

// Helper function to create a todo item
const createTodoItem = (todo) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("p-4", "todo-item");
  todoItem.append(createTodoText(todo), createTodoEditInput(todo));
  return todoItem;
};

filteredTodos.forEach((todo) => {
  todoListElement.appendChild(createTodoItem(todo));
});

// Helper function to filter todos based on the current filter setting
const filterTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return [...todos];
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "active":
      return todos.filter((todo) => !todo.completed);
    default:
      return [...todos];
  }
};


const completedTodos = todos.filter((todo) => todo.completed);

// Function to render the todos based on the current filter
// Function to render the todos based on the current filter
const renderTodos = () => {
  todoListElement.replaceChildren(
    ...filterTodos(todos, filter).map(createTodoItem),
  );
};

todos.push({ id: nextTodoId++, text: todoText, completed: false });

// Helper function to create a new array with the existing todos and a new todo item
const addTodo = (todos, newTodoText, newTodoId) => [
  ...todos,
  { id: newTodoId, text: newTodoText, completed: false },
];

// Event handler to create a new todo item
const handleKeyDownToCreateNewTodo = (event) => {
  if (event.key === "Enter") {
    const todoText = event.target.value.trim();
    if (todoText) {
      todoApp.addTodo(todoText);
      event.target.value = ""; // Clear the input
      renderTodos();
    }
  }
};


// Helper function to toggle the completed status of a todo item
const toggleTodo = (todos, todoId) =>
  todos.map((todo) =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
  );

  // Helper function to find the target todo element
const findTargetTodoElement = (event) =>
  event.target.id?.includes("todo-text") ? event.target : null;

// Helper function to parse the todo id from the todo element
const parseTodoId = (todo) => (todo ? Number(todo.id.split("-").pop()) : -1);

// Event handler to toggle the completed status of a todo item
const handleClickOnTodoList = (event) => {
  todos = toggleTodo(todos, parseTodoId(findTargetTodoElement(event)));
  renderTodos();
};

// Factory function to create a todo app
const createTodoApp = () => {
  // Define the state of our app
  let todos = [];
  let nextTodoId = 1;
  let filter = "all"; // can be 'all', 'active', or 'completed'

  return {
    addTodo: (newTodoText) => {
      todos = addTodo(todos, newTodoText, nextTodoId++);
    },
    toggleTodo: (todoId) => {
      todos = toggleTodo(todos, todoId);
    },
    setFilter: (newFilter) => {
      filter = newFilter;
    },
    getTodos: () => filterTodos(todos, filter),
  };
};

const todoApp = createTodoApp();



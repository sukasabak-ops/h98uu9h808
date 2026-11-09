const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

// Загружаем задачи из памяти браузера
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Сохраняем задачи
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Показываем задачи
function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "↩" : "✓";
        completeButton.title = "Изменить статус";
        completeButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            showTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    counter.textContent = "Всего задач: " + tasks.length;
}

// Добавляем новую задачу
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Введите задачу!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    showTasks();
}

// Нажатие кнопки
addButton.addEventListener("click", addTask);

// Добавление через Enter
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Первый запуск
showTasks();
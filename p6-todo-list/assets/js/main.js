const tasks = [];
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addBtn = document.getElementById("addTaskBtn");
const tasksList = document.getElementById("tasksList");

function getPriority(task) {
    let priority = task.priority;
    switch (priority) {
        case "high": {
            return 0;
        }
        case "medium": {
            return 1;
        }
        case "low": {
            return 2;
        }
        default: {
            return -1;
        }
    }
}

function resetPriority() {
    prioritySelect.options[1].selected = true;
}

function checkDuplicate() {
    if (tasks.some(task => taskInput.value.trim() === task.taskName)) {
        Swal.fire({
            icon: "warning",
            text: "Task already exists!",
            timer: 1500,
            timerProgressBar: true,
            heightAuto: false
        });
        return true;
    }

    return false;
}

function isEmpty() {
    if (taskInput.value.trim() === "") return true;
    return false;
}

function displayTasks() {

    if (!tasks.length) {
        tasksList.innerHTML = `
                    <div class="empty-state">
                        <h3>Ready to get started?</h3>
                        <p>Add your first task and let's make today productive!</p>
                    </div>
                `
        return;
    }

    let htmlContent = "";

    tasks.forEach(function (task) {
        htmlContent +=
            `
                        <div class="task-item">
                            <div class="task-content">
                                <div class="task-text">${task.taskName}</div>
                                <div class="priority-badge priority-${task.priority}">
                                    <span class="priority-text">${task.priority} PRIORITY</span>
                                </div>
                            </div>
                            <button class="btn btn-danger delete-btn" title="Delete task" onclick="deleteTask(${task.id})">
                                <img src="./assets/images/trash-can-regular.svg" alt="trash-can-icon">
                            </button>
                        </div>
                    `
    })

    tasksList.innerHTML = htmlContent;
}

function addTask() {

    let task = {
        id: new Date().getTime(),
        taskName: taskInput.value.trim(),
        priority: prioritySelect.value
    }

    tasks.push(task);
    tasks.sort((a, b) => getPriority(a) - getPriority(b));

    taskInput.value = "";

    resetPriority();
}

function deleteTask(id) {
    let index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
        Swal.fire({
            icon: "error",
            text: "Task not found!",
            timer: 1500,
            timerProgressBar: true,
            heightAuto: false
        });
        return;
    }
    tasks.splice(index, 1);
    displayTasks();
}

$(document).ready(function () {
    $(taskInput).on("animationend", function () {
        $(this).removeClass("shake-horizontal");
    });

    $(addBtn).on("click", function () {
        $(taskInput).removeClass("error");

        if (checkDuplicate()) return;

        if (isEmpty()) {
            $(taskInput).addClass("error shake-horizontal");
            return;
        }

        addTask();
        displayTasks();
    })

    $(taskInput).on("keypress", function (e) {
        if (e.key === "Enter") {

            $(taskInput).removeClass("error");

            if (checkDuplicate()) return;

            if (isEmpty()) {
                $(taskInput).addClass("error shake-horizontal");
                return;
            }

            addTask();
            displayTasks();
        }
    })
})
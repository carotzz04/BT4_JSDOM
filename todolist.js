    //  task: {text: string, 
    //         completed:boolean, 
    //         status: string, 
    //         category: string}

// tasks: [{text: string, completed:boolean}]

document.getElementById("formTask").onsubmit = function(event) {
    event.preventDefault();
    const inputNode = document.getElementById("inputTask");
    const taskText = inputNode.value.trim();
    const category = document.getElementById("selectCategory").value;
    const status = document.getElementById("selectStatus").value;

    if (taskText !== "" && category !== "") {
        const task={
            text: taskText,
            completed: false,
            status: status,
            category: category
        };
        addTask(task, true);
    }
}

document.getElementById("formCategory").onsubmit = function(event) {
    event.preventDefault();
    const inputCategory = document.getElementById("inputCategory").value.trim();
    if (inputCategory !== "") {
        addCategory(inputCategory, true);
    }
}

document.getElementById("saveBtn").addEventListener("click", function(event) {
    event.preventDefault();
    const taskList = document.getElementById("tasks"); 
    const tasks=[];
    for (let taskItem of taskList.getElementsByTagName("li")) {
        const task= {
            text: taskItem.childNodes[0].textContent,
            completed: taskItem.classList.contains("completed"),
            status: taskItem.getAttribute("data-status"),
            category: taskItem.getAttribute("data-category")
        };
        tasks.push(task);
    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
})

// Khôi phục danh sách Tasks
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if (savedTasks) {
    for (let task of savedTasks) {
        addTask(task, false);  
    }
}

// Khôi phục danh sách Categories
const savedCategories = JSON.parse(localStorage.getItem("categories"));
if (savedCategories) {
    for (let category of savedCategories) {
        addCategory(category, false);
    }
}

function addTask(task, check) {
    const taskList = document.getElementById("tasks");
    const taskItem = document.createElement("li");

    if (check) {
        taskItem.textContent = `${task.text} [${task.status}] [${task.category}]`;
        taskItem.setAttribute("data-status", task.status);
        taskItem.setAttribute("data-category", task.category);
    }
    else taskItem.textContent = task.text;

    if (task.completed) {
        taskItem.classList.toggle("completed");
    }
    taskItem.addEventListener("click", function () {
        taskItem.classList.toggle("completed");
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
}

function addCategory(category, check) {
    const selectCategory = document.getElementById("selectCategory");
    // Lấy danh sách các Categories hiện tại
    const existingCategories = Array.from(selectCategory.options).map(option => option.value);

    // chỉ check khi thêm mới, check = true
    if (check) {
        if (existingCategories.includes(category)) {
            alert("Category already exists!");
            return;
        }
    }

    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;

    selectCategory.appendChild(option);
    
    if (check) {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        categories.push(category);
        localStorage.setItem("categories", JSON.stringify(categories));
    }
 
}


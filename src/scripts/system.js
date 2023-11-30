// Write username in header
const userObject = JSON.parse(localStorage.getItem("loggedInUser"));

const headerSelect = document.querySelector("header");
const usernameDiv = document.createElement("div");
usernameDiv.setAttribute('class','username-div text-white ps-3 ps-md-5 ps-lg-0');

usernameDiv.innerText = `Olá, ${userObject.username}!`;
headerSelect.appendChild(usernameDiv);

    /* logout button*/
const logoutDiv = document.createElement("div");

const logoutLink = document.createElement("a");
logoutLink.setAttribute('href', '#');
logoutLink.textContent = "Sair";
logoutLink.setAttribute('class','logout-div text-white pe-3 pe-md-5 pe-lg-0');

logoutDiv.appendChild(logoutLink);
headerSelect.appendChild(logoutDiv);

// Onclick Logout Function

logoutLink.addEventListener('click', (event) => {
    event.preventDefault();

    localStorage.removeItem("loggedInUser")

    window.location.href = "http://127.0.0.1:5500/index.html";
} )

// Create task and register in users key

function registerTask() {
    var taskName = document.getElementById('task-name-input').value;
    var taskDateBegin = document.getElementById('task-date-begin').value;
    var taskDateEnd = document.getElementById('task-date-end').value;
    var taskHourBegin = document.getElementById('task-hour-begin').value;
    var taskHourEnd = document.getElementById('task-hour-end').value
    var taskDescription = document.getElementById('task-description').value
    if (taskName && taskDateBegin && taskDateEnd 
        && taskHourBegin && taskHourEnd && taskDescription)
        {
            const newTask = {
                name: taskName,
                dateBegin: taskDateBegin,
                dateEnd: taskDateEnd,
                hourBegin: taskHourBegin,
                hourEnd: taskHourEnd,
                description: taskDescription,
                accomplished: false
            };

            // Ensure userObject.tasks is initialized as an array
            userObject.tasks = userObject.tasks || [];
    
            // Push the new task to the tasks array
            userObject.tasks.push(newTask);
    
            // Update localStorage with the modified userObject
            localStorage.setItem("loggedInUser", JSON.stringify(userObject));
    
            // Additional logic for updating the users array if needed
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const loggedInUserIndex = users.findIndex(user => user.username === userObject.username);
    
            if (loggedInUserIndex !== -1) {
                users[loggedInUserIndex].tasks = userObject.tasks;
            }
    
            localStorage.setItem("users", JSON.stringify(users));

            generateTaskList();
        } else {
            alert('Por favor, preencha todos os campos corretamente.')
        }
}

function generateTaskList() {
    const taskList = document.getElementById('task-list');

    // Clear existing content in the taskList
    taskList.innerHTML = '';

    // Create a Bootstrap table
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    
    // Create a table head
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th class="col-3">Tarefa</th><th class="col-3">Início</th><th class="col-3">Término</th><th>Status</th><th>Alterar</th></tr>';
    table.appendChild(thead);

    // Create a table body
    const tbody = document.createElement('tbody');

    // Iterate through each task in the user's tasks
    const users = JSON.parse(localStorage.getItem("users"))
    const loggedInUserIndex = users.findIndex(user => user.username === userObject.username);

    if (users[loggedInUserIndex].tasks && users[loggedInUserIndex].tasks.length > 0) {
        for (let i = 0; i < users[loggedInUserIndex].tasks.length; i++) {
            let tasksWrite = users[loggedInUserIndex].tasks[i];

            // Create a new row for each task
            const row = document.createElement('tr');

            // Task Name
            const taskNameCell = document.createElement('td');
            taskNameCell.innerText = tasksWrite.name;
            row.appendChild(taskNameCell);

            function brazilianDateFormate(data) {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            }
            // Date Begin and Hour Begin
            const dateBeginCell = document.createElement('td');
            dateBeginCell.innerText = `${brazilianDateFormate(tasksWrite.dateBegin)} às ${tasksWrite.hourBegin}`;
            row.appendChild(dateBeginCell);

            // Date End and Hour End
            const dateEndCell = document.createElement('td');
            dateEndCell.innerText = `${brazilianDateFormate(tasksWrite.dateEnd)} às ${tasksWrite.hourEnd}`;
            row.appendChild(dateEndCell);

            // Status
            const statusCell = document.createElement('td');
            const statusParagraph = document.createElement('p')

            var currentDate = new Date();
            var dateEnd = new Date(tasksWrite.dateEnd + ' ' + tasksWrite.hourEnd);
            var dateBegin = new Date(tasksWrite.dateBegin + ' ' + tasksWrite.hourBegin)
           

                if (tasksWrite.accomplished) {}
                else if (dateEnd.toISOString() < currentDate.toISOString()) 
                {
                statusParagraph.innerText = 'Em atraso';
                statusParagraph.classList.add('text-danger');
                } 
                else if (dateBegin.toISOString() > currentDate.toISOString()) 
                {
                statusParagraph.innerText = 'Pendente';
                statusParagraph.classList.add('text-warning');
                } 
                else if (dateBegin.toISOString() <= currentDate.  toISOString() && currentDate.toISOString() <= dateEnd.toISOString())
                {
                statusParagraph.innerText = 'Em andamento';
                statusParagraph.classList.add('text-primary');
                }

            statusCell.appendChild(statusParagraph);
            row.appendChild(statusCell);
            
            // Edit
            const editCell = document.createElement('td');
            const editParagraph = document.createElement('p')
            editParagraph.setAttribute('class','btn btn-warning fw-semibold')
            editParagraph.innerText = 'Alterar'
            editCell.appendChild(editParagraph)
            row.appendChild(editCell);

            // Final appends
            tbody.appendChild(row);

            taskList.appendChild(table);
            table.appendChild(tbody);
        }
    }
}

generateTaskList();


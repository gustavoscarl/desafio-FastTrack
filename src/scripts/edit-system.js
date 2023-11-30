// Initial values
var taskName = document.getElementById('task-name-input');
var taskDateBegin = document.getElementById('task-date-begin');
var taskDateEnd = document.getElementById('task-date-end');
var taskHourBegin = document.getElementById('task-hour-begin');
var taskHourEnd = document.getElementById('task-hour-end')
var taskDescription = document.getElementById('task-description')

var taskDetails = JSON.parse(localStorage.getItem("editTask"))

taskName.value = taskDetails.name;
taskDateBegin.value = taskDetails.dateBegin;
taskDateEnd.value = taskDetails.dateEnd;
taskHourBegin.value = taskDetails.hourBegin;
taskHourEnd.value = taskDetails.hourEnd;
taskDescription.value = taskDetails.description;

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

function changeTask() {
  var taskName = document.getElementById('task-name-input').value;
  var taskDateBegin = document.getElementById('task-date-begin').value;
  var taskDateEnd = document.getElementById('task-date-end').value;
  var taskHourBegin = document.getElementById('task-hour-begin').value;
  var taskHourEnd = document.getElementById('task-hour-end').value;
  var taskDescription = document.getElementById('task-description').value;

  if (taskName && taskDateBegin && taskDateEnd 
    && taskHourBegin && taskHourEnd && taskDescription) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const users = JSON.parse(localStorage.getItem("users"));
    const taskId = JSON.parse(localStorage.getItem("editTaskIndex")).id;

    const loggedInUserIndex = users.findIndex(user => user.username === loggedInUser.username);

    if (loggedInUserIndex !== -1) {
        const userObject = users[loggedInUserIndex];

        if (userObject.tasks && userObject.tasks.length > 0) {
            const updatedTasks = userObject.tasks.map(task => {
                if (task.id === taskId) {
                    task.name = taskName;
                    task.dateBegin = taskDateBegin;
                    task.dateEnd = taskDateEnd;
                    task.hourBegin = taskHourBegin;
                    task.hourEnd = taskHourEnd;
                    task.description = taskDescription;
                }
                return task;
            });

            // Save the updated tasks back to localStorage
            userObject.tasks = updatedTasks;
            localStorage.setItem("users", JSON.stringify(users));

            // Clear the editTaskId
            localStorage.removeItem("editTaskIndex")

            // Redirect to the task list or another page
            window.location.href = "system.html";
        }
    }
} else {
    alert('Por favor, preencha todos os campos corretamente.');
}
}

function deleteTask() {
  const taskId = JSON.parse(localStorage.getItem("editTaskIndex")).id;
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const users = JSON.parse(localStorage.getItem("users"));
  const loggedInUserIndex = users.findIndex(user => user.username === loggedInUser.username);

  if (loggedInUserIndex !== -1) {
      const userObject = users[loggedInUserIndex];

      if (userObject.tasks && userObject.tasks.length > 0) {
          // Remove the task from the userObject
          userObject.tasks = userObject.tasks.filter(task => task.id !== taskId);

          // Save the updated userObject back to localStorage
          users[loggedInUserIndex] = userObject;
          localStorage.setItem("users", JSON.stringify(users));

          // Remove the task from the loggedInUser
          const updatedLoggedInUser = { ...loggedInUser };
          updatedLoggedInUser.tasks = updatedLoggedInUser.tasks.filter(task => task.id !== taskId);

          // Save the updated loggedInUser back to localStorage
          localStorage.setItem("loggedInUser", JSON.stringify(updatedLoggedInUser));

          // Redirect to the task list or another page
          window.location.href = "system.html";
      }
  }
}






function addTaskOnClickEvent() {
    var x = document.getElementById("add-task-form");
    var y = document.getElementById("add-task-button");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.classList.remove("is-primary");
      y.classList.add("is-danger");
      y.innerHTML = `
      <span class="icon">
        <i class="fas fa-times"></i>
      </span> 
      <strong>Cancel</strong>
      `;

    } else {
      x.style.display = "none";
      y.classList.add("is-primary");
      y.classList.remove("is-danger");
      y.innerHTML = `
        <span class="icon">
            <i class="fas fa-plus"></i>
        </span> 
        <strong>Add Task</strong>
        `;
    }

  } 

function addTaskFormComplete() {
    var x = document.getElementById("add-task-form");
    var taskNameField = document.getElementById("task-name-field");
    var classNameField = document.getElementById("class-name-field");
    var dueDateField = document.getElementById("due-date-field");
    var scheduleDateField = document.getElementById("schedule-date-field");
    
    var taskNameValue = taskNameField.value;
    var classNameValue = classNameField.value;
    var dueDateValue = dueDateField.value;
    var scheduleDateValue = scheduleDateField.value;

    //var nameValue = document.getElementById("uniqueID").value;
    //var nameValue = document.getElementById("uniqueID").value;
    //var nameValue = document.getElementById("uniqueID").value;
console.log(taskNameValue)
    //x.submit();
    x.reset();
 }
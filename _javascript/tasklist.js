




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
    x.reset();
  } 

function addTaskFormComplete() {
    var x = document.getElementById("add-task-form");
    var y = document.getElementById("thisweek-section-task");
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

    //x.submit();

    taskObj = `
    <div class="columns  is-vcentered task-display-hover">
    <div class="column is-1">
        <label class="checkbox subtitle is-5">
          <input type="checkbox">
        </label>
    </div>

    <div class="column is-10">
      <div class="is-size-5" href="JavaScript:void(0)">
        ${taskNameValue}
      </div>

      <div class="columns is-gapless is-vcentered">
        <div class="column is-size-7 has-text-left">
          <strong>${classNameValue}</strong>
        </div>
        <div class="column is-size-7 has-text-right">
            <span class="icon">
                <i class="fas fa-clock"></i>
            </span>
            ${dueDateValue}
        </div>
      </div>
    </div>
    
    <div class="column is-1 task-display-hoverable" >
      <a class="button is-light" href="javascript:void(0)">
      <span class="icon">
          <i class="fas fa-edit"></i>
      </span>
      </a>
    </div>
  </div>
    `;

    y.insertAdjacentHTML("beforeend", taskObj);
    addTaskOnClickEvent();
 }





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
    document.getElementById("not-all-submissions").style.display = "none";
    document.getElementById("task-add-success").style.display = "none";
  } 

function addTaskFormComplete() {
    var x = document.getElementById("add-task-form");
    var thisweekList = document.getElementById("thisweek-section-task");
    var tomorrowList = document.getElementById("tomorrow-section-task");
    var todayList = document.getElementById("today-section-task");

    var taskNameField = document.getElementById("task-name-field");
    var classNameField = document.getElementById("class-name-field");
    var dueDateField = document.getElementById("due-date-field");
    var scheduleDateField = document.getElementById("schedule-date-field");
    
    var taskNameValue = taskNameField.value;
    var classNameValue = classNameField.value;
    var dueDateValue = dueDateField.value;
    var scheduleDateValue = scheduleDateField.value;



    if (!!taskNameValue && !!classNameValue && !! dueDateValue && scheduleDateValue) {
        console.log("nullified");



        taskObjInsert(taskNameValue, classNameValue, dueDateValue,scheduleDateValue);

        


        addTaskOnClickEvent();
        document.getElementById("task-add-success").style.display = "inline-block";
    }
    else {
        document.getElementById("not-all-submissions").style.display = "inline-block";
    }


    
 }

 function taskObjInsert(taskNameValue, classNameValue, dueDateValue, scheduleDateValue) {
    var thisweekList = document.getElementById("thisweek-section-task");
    var tomorrowList = document.getElementById("tomorrow-section-task");
    var todayList = document.getElementById("today-section-task");
    
    var dueDate = new Date(dueDateValue)
    var scheduleDate = new Date(scheduleDateValue);
    var currentDate = new Date();
    var tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    var dueDateString = currentDate.toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit'
    });
    
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

    if (scheduleDate.setHours(0,0,0,0) >= tomorrowDate.setHours(0,0,0,0)) {
        thisweekList.insertAdjacentHTML("beforeend", taskObj);
    }
    else if (scheduleDate >= currentDate.setHours(0,0,0,0)) {
        tomorrowList.insertAdjacentHTML("beforeend", taskObj);
    }
    else {
        todayList.insertAdjacentHTML("beforeend", taskObj);
    }
 }
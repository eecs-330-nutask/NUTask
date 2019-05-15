

var taskJSON = taskList;

var filterList = ["All", "Today", "Tomorrow", "This Week"];

document.addEventListener('DOMContentLoaded', function () {

    console.log('hello!');

    //console.log(taskJSON);
    generateFilters();
    generateTasks();


  });

function generateFilters() {
    var filter;
    for (filter in filterList) {
        var filterObj = `
        <option value="${filterList[filter]}">${filterList[filter]}</option>
        `;
        document.getElementById('task-filter-selector').insertAdjacentHTML("beforeend", filterObj);

    }
}

function resetTaskList() {
    var thisweekList = document.getElementById("thisweek-section-task");
    var tomorrowList = document.getElementById("tomorrow-section-task");
    var todayList = document.getElementById("today-section-task");

    thisweekList.style.display = "block";
    tomorrowList.style.display = "block";
    todayList.style.display = "block";

    todayList.innerHTML=`
        <h1 class="title">Today</h1>
        <div class="subtitle is-divider"></div>
        `;
    
    tomorrowList.innerHTML=`
        <h1 class="title">Tomorrow</h1>
        <div class="subtitle is-divider"></div>
        `;

    thisweekList.innerHTML=`
        <h1 class="title">This Week</h1>
        <div class="subtitle is-divider"></div>
        `;
}

function generateTasks() {
    var task;

    for (task in taskJSON) {

        var taskNameValue = taskJSON[task]["taskNameValue"];
        var classNameValue = taskJSON[task]["classNameValue"];
        var dueDateValue = taskJSON[task]["dueDateValue"];
        var scheduleDateValue = taskJSON[task]["scheduleDateValue"];

        taskObjInsert(taskNameValue, classNameValue, dueDateValue,scheduleDateValue);

        if (!filterList.includes(classNameValue)) {
            filterList.push(classNameValue);
            var filterObj = `
                <option value="${classNameValue}">${classNameValue}</option>
                `;
            document.getElementById('task-filter-selector').insertAdjacentHTML("beforeend", filterObj);
        }
    }
}

function filterTasks() {
    var selectorValue = document.getElementById('task-filter-selector').value;
    var thisweekList = document.getElementById("thisweek-section-task");
    var tomorrowList = document.getElementById("tomorrow-section-task");
    var todayList = document.getElementById("today-section-task");



    console.log(selectorValue);
    resetTaskList();
    switch(selectorValue) {

        case "All":
            console.log("All");
            generateTasks();
            break;

        case "Today":
            generateTasks();
            tomorrowList.style.display="none";
            thisweekList.style.display="none";
            break;

        case "Tomorrow":
            generateTasks();
            thisweekList.style.display="none";
            break;


        case "This Week":
            generateTasks();

            break;

        default:

            var task;

            for (task in taskJSON) {
    
                var taskNameValue = taskJSON[task]["taskNameValue"];
                var classNameValue = taskJSON[task]["classNameValue"];
                var dueDateValue = taskJSON[task]["dueDateValue"];
                var scheduleDateValue = taskJSON[task]["scheduleDateValue"];

                if (classNameValue === selectorValue) {
    
                    taskObjInsert(taskNameValue, classNameValue, dueDateValue,scheduleDateValue);
                }

            }
            break;
        


    }

}

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

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
        



        taskObjInsert(taskNameValue, classNameValue, dueDateValue,scheduleDateValue);

        


        addTaskOnClickEvent();
        document.getElementById("task-add-success").style.display = "inline-block";

        if (!filterList.includes(classNameValue)) {
            filterList.push(classNameValue);
            var filterObj = `
                <option value="${classNameValue}">${classNameValue}</option>
                `;
            document.getElementById('task-filter-selector').insertAdjacentHTML("beforeend", filterObj);
        }

        var newID = makeid(6);

        taskJSON[`${newID}`] = {
            "taskNameValue" : taskNameValue,
            "classNameValue" : classNameValue,
            "dueDateValue" : dueDateValue,
            "scheduleDateValue" : scheduleDateValue
        };

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

    var dueDateString = dueDate.toLocaleDateString(undefined, {
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
            ${dueDateString}
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
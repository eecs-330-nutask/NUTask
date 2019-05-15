"use strict";

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
        var filterObj = "\n        <option value=\"" + filterList[filter] + "\">" + filterList[filter] + "</option>\n        ";
        document.getElementById('task-filter-selector').insertAdjacentHTML("beforeend", filterObj);
    }
}

function resetTaskList() {
    var thisweekList = document.getElementById("thisweek-section-task");
    var tomorrowList = document.getElementById("tomorrow-section-task");
    var todayList = document.getElementById("today-section-task");
    var laterList = document.getElementById("later-section-task");

    thisweekList.style.display = "block";
    tomorrowList.style.display = "block";
    todayList.style.display = "block";
    laterList.style.display = "block";

    todayList.innerHTML = "\n        <h1 class=\"title\">Today</h1>\n        <div class=\"subtitle is-divider\"></div>\n        ";

    tomorrowList.innerHTML = "\n        <h1 class=\"title\">Tomorrow</h1>\n        <div class=\"subtitle is-divider\"></div>\n        ";

    thisweekList.innerHTML = "\n        <h1 class=\"title\">This Week</h1>\n        <div class=\"subtitle is-divider\"></div>\n        ";

    laterList.innerHTML = "\n    <h1 class=\"title\">Later</h1>\n    <div class=\"subtitle is-divider\"></div>\n    ";
}

function generateTasks() {
    var task;

    for (task in taskJSON) {

        var taskNameValue = taskJSON[task]["taskNameValue"];
        var classNameValue = taskJSON[task]["classNameValue"];
        var dueDateValue = taskJSON[task]["dueDateValue"];
        var scheduleDateValue = taskJSON[task]["scheduleDateValue"];

        taskObjInsert(taskNameValue, classNameValue, dueDateValue, scheduleDateValue);

        if (!filterList.includes(classNameValue)) {
            filterList.push(classNameValue);
            var filterObj = "\n                <option value=\"" + classNameValue + "\">" + classNameValue + "</option>\n                ";
            document.getElementById('task-filter-selector').insertAdjacentHTML("beforeend", filterObj);
            var classListObj = "\n            <option value=\"" + classNameValue + "\">\n            ";
            document.getElementById('classes-list').insertAdjacentHTML("beforeend", classListObj);
        }
    }
}

function filterTasks() {
    var selectorValue = document.getElementById('task-filter-selector').value;
    var thisweekList = document.getElementById("thisweek-section-task");
    var tomorrowList = document.getElementById("tomorrow-section-task");
    var todayList = document.getElementById("today-section-task");
    var laterList = document.getElementById("later-section-task");

    console.log(selectorValue);
    resetTaskList();
    switch (selectorValue) {

        case "All":
            console.log("All");
            generateTasks();
            break;

        case "Today":
            generateTasks();
            tomorrowList.style.display = "none";
            thisweekList.style.display = "none";
            laterList.style.display = "none";
            break;

        case "Tomorrow":
            generateTasks();
            thisweekList.style.display = "none";
            laterList.style.display = "none";
            break;

        case "This Week":
            generateTasks();
            laterList.style.display = "none";
            break;

        default:

            var task;

            for (task in taskJSON) {

                var taskNameValue = taskJSON[task]["taskNameValue"];
                var classNameValue = taskJSON[task]["classNameValue"];
                var dueDateValue = taskJSON[task]["dueDateValue"];
                var scheduleDateValue = taskJSON[task]["scheduleDateValue"];

                if (classNameValue === selectorValue) {

                    taskObjInsert(taskNameValue, classNameValue, dueDateValue, scheduleDateValue);
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
        y.innerHTML = "\n      <span class=\"icon\">\n        <i class=\"fas fa-times\"></i>\n      </span> \n      <strong>Cancel</strong>\n      ";
    } else {
        x.style.display = "none";
        y.classList.add("is-primary");
        y.classList.remove("is-danger");
        y.innerHTML = "\n        <span class=\"icon\">\n            <i class=\"fas fa-plus\"></i>\n        </span> \n        <strong>Add Task</strong>\n        ";
    }
    x.reset();
    document.getElementById("not-all-submissions").style.display = "none";
    document.getElementById("task-add-success").style.display = "none";
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
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

    if (!!taskNameValue && !!classNameValue && !!dueDateValue && scheduleDateValue) {

        taskObjInsert(taskNameValue, classNameValue, dueDateValue, scheduleDateValue);

        addTaskOnClickEvent();
        document.getElementById("task-add-success").style.display = "inline-block";

        if (!filterList.includes(classNameValue)) {
            filterList.push(classNameValue);
            var filterObj = "\n                <option value=\"" + classNameValue + "\">" + classNameValue + "</option>\n                ";
            document.getElementById('task-filter-selector').insertAdjacentHTML("beforeend", filterObj);

            var classListObj = "\n            <option value=\"" + classNameValue + "\">\n            ";
            document.getElementById('classes-list').insertAdjacentHTML("beforeend", classListObj);
        }

        var newID = makeid(6);

        taskJSON["" + newID] = {
            "taskNameValue": taskNameValue,
            "classNameValue": classNameValue,
            "dueDateValue": dueDateValue,
            "scheduleDateValue": scheduleDateValue
        };
    } else {
        document.getElementById("not-all-submissions").style.display = "inline-block";
    }
}

function taskObjInsert(taskNameValue, classNameValue, dueDateValue, scheduleDateValue) {
    var thisweekList = document.getElementById("thisweek-section-task");
    var tomorrowList = document.getElementById("tomorrow-section-task");
    var todayList = document.getElementById("today-section-task");
    var nextweekList = document.getElementById("later-section-task");

    var dueDate = new Date(dueDateValue);
    var dueDateComp = new Date(dueDateValue);
    dueDateComp.setMinutes(dueDateComp.getMinutes() + dueDateComp.getTimezoneOffset());
    var scheduleDate = new Date(scheduleDateValue);

    var currentDate = new Date();
    var tomorrowDate = new Date();
    var nextWeekDate = new Date();
    nextWeekDate.setDate(currentDate.getDate() + 7);
    tomorrowDate.setDate(currentDate.getDate() + 1);

    var dueDateString = dueDateComp.toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit'
    });

    var taskObj;
    taskObj = "\n    <div class=\"columns  is-vcentered task-display-hover\">\n    <div class=\"column is-1\">\n        <label class=\"checkbox subtitle is-5\">\n          <input type=\"checkbox\">\n        </label>\n    </div>\n\n    <div class=\"column is-10\">\n      <div class=\"is-size-5\" href=\"JavaScript:void(0)\">\n        " + taskNameValue + "\n      </div>\n\n      <div class=\"columns is-gapless is-vcentered\">\n        <div class=\"column is-size-7 has-text-left\">\n          <strong>" + classNameValue + "</strong>\n        </div>\n        <div class=\"column is-size-7 has-text-right\">\n            <span class=\"icon\">\n                <i class=\"fas fa-clock\"></i>\n            </span>\n            " + dueDateString + "\n        </div>\n      </div>\n    </div>\n    \n    <div class=\"column is-1 task-display-hoverable\" >\n      <a class=\"button is-light\" href=\"javascript:void(0)\">\n      <span class=\"icon\">\n          <i class=\"fas fa-edit\"></i>\n      </span>\n      </a>\n    </div>\n  </div>\n    ";

    if (dueDate.setHours(0, 0, 0, 0) >= nextWeekDate.setHours(0, 0, 0, 0)) {
        nextweekList.insertAdjacentHTML("beforeend", taskObj);
    } else if (dueDate.setHours(0, 0, 0, 0) >= tomorrowDate.setHours(0, 0, 0, 0)) {
        thisweekList.insertAdjacentHTML("beforeend", taskObj);
    } else if (dueDate >= currentDate.setHours(0, 0, 0, 0)) {
        tomorrowList.insertAdjacentHTML("beforeend", taskObj);
    } else {
        todayList.insertAdjacentHTML("beforeend", taskObj);
    }
}
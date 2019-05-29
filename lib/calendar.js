'use strict';

var calendarEl = document.getElementById('calendar');

var eventNameEl = document.getElementById('event-name-field');
var startTimeEl = document.getElementById('start-time');
var startDayEl = document.getElementById('start-date');
var endTimeEl = document.getElementById('end-time');
var endDayEl = document.getElementById('end-date');

var repeatSelectEl = document.getElementById('repeat-select');
var repeatUntilEl = document.getElementById('repeat-until-input');

var sunEl = document.getElementById("day-0");
var monEl = document.getElementById("day-1");
var tueEl = document.getElementById("day-2");
var wedEl = document.getElementById("day-3");
var thuEl = document.getElementById("day-4");
var friEl = document.getElementById("day-5");
var satEl = document.getElementById("day-6");

var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['timeGrid'],
    nowIndicator: true,
    minTime: "08:00:00",
    maxTime: "20:00:00",
    allDaySlot: false,
    height: $(window).height() * 0.5,
    eventClick: eventOnClick
});

if (window.localStorage.getItem("userID") == "0") {
    var calJSON = calList0;
}
if (window.localStorage.getItem("userID") == "1") {
    var calJSON = calList1;
}

document.addEventListener('DOMContentLoaded', function () {

    // TODO: add line for default dates and times
    sunEl.disabled = true;
    monEl.disabled = true;
    tueEl.disabled = true;
    wedEl.disabled = true;
    thuEl.disabled = true;
    friEl.disabled = true;
    satEl.disabled = true;
    repeatUntilEl.disabled = true;

    calendar.render();

    for (event in calJSON) {
        if (calJSON[event]["repeat"]) {
            calendar.addEvent({
                title: calJSON[event]['title'],
                startTime: calJSON[event]['startTime'],
                endTime: calJSON[event]['endTime'],
                daysOfWeek: calJSON[event]['daysOfWeek'],
                startRecur: calJSON[event]['startRecur'],
                endRecur: calJSON[event]['endRecur']

            });
        } else {
            calendar.addEvent({
                title: calJSON[event]['title'],
                start: calJSON[event]['start'],
                end: calJSON[event]['end']

            });
        }
    }
});

document.getElementById('repeat-select').onchange = function () {

    if (repeatSelectEl.value == 1) {
        sunEl.disabled = false;
        monEl.disabled = false;
        tueEl.disabled = false;
        wedEl.disabled = false;
        thuEl.disabled = false;
        friEl.disabled = false;
        satEl.disabled = false;

        repeatUntilEl.disabled = false;
        endDayEl.disabled = true;
    } else {
        sunEl.disabled = true;
        monEl.disabled = true;
        tueEl.disabled = true;
        wedEl.disabled = true;
        thuEl.disabled = true;
        friEl.disabled = true;
        satEl.disabled = true;

        repeatUntilEl.disabled = true;
        endDayEl.disabled = false;
    }
};

function eventOnClick(info) {
    if (confirm('Delete ' + info.event.title + '?')) {
        info.event.remove();
    }

    document.getElementById('toasty').innerText = "Event deleted.";
    document.getElementById('toasty').classList.remove('has-text-danger');
    document.getElementById('toasty').classList.remove('has-text-success');
}

function submitForm() {
    var eventName = eventNameEl.value;
    var startTime = startTimeEl.value;
    var endTime = endTimeEl.value;
    var startDate = startDayEl.value;
    var endDate = endDayEl.value;

    var repeatEvent = repeatSelectEl.value;

    var repeatUntil = repeatUntilEl.value;

    var repeatDays = [];

    if (sunEl.checked) repeatDays.push(0);
    if (monEl.checked) repeatDays.push(1);
    if (tueEl.checked) repeatDays.push(2);
    if (wedEl.checked) repeatDays.push(3);
    if (thuEl.checked) repeatDays.push(4);
    if (friEl.checked) repeatDays.push(5);
    if (satEl.checked) repeatDays.push(6);

    var error = 0;

    if (!startTime || !endTime || !startDate || !eventName) {
        error = 1;
    }

    if (repeatEvent == 1) {

        if (repeatDays == [] || !repeatUntil) {
            error = 1;
        }

        startTime = startDate + "T" + startTime;
        endTime = startDate + "T" + endTime;

        startTime = new Date(startTime);
        endTime = new Date(endTime);

        var curDate = new Date();

        if (endTime < startTime) {
            error = 2;
        }

        repeatUntil = new Date(repeatUntil);

        if (repeatUntil < curDate) {
            error = 2;
        }
    } else {
        if (!endDate) {
            error = 1;
        }

        startTime = startDate + "T" + startTime;
        endTime = endDate + "T" + endTime;

        startTime = new Date(startTime);
        endTime = new Date(endTime);

        if (endTime < startTime) {
            error = 2;
        }
    }

    if (error == 0) {

        if (repeatEvent == 1) {

            calendar.addEvent({
                title: eventName,
                startTime: startTime.toTimeString('en-US', { hour12: false }),
                endTime: endTime.toTimeString('en-US', { hour12: false }),
                daysOfWeek: repeatDays,
                startRecur: startTime.toISOString(),
                endRecur: repeatUntil.toISOString()

            });
        } else {
            calendar.addEvent({
                title: eventName,
                start: startTime,
                end: endTime

            });
        }
        var toasty = document.getElementById('toasty');
        toasty.innerText = "Event Added!";
        toasty.classList.remove("has-text-danger");
        toasty.classList.add("has-text-success");

        formReset();
    } else {
        //place error message here
        var toasty = document.getElementById('toasty');

        if (error == 1) {
            toasty.innerText = "*Please fill in all fields.";
            toasty.classList.remove("has-text-success");

            toasty.classList.add("has-text-danger");
        } else if (error == 2) {
            toasty.innerText = "*Invalid dates.";
            toasty.classList.remove("has-text-success");

            toasty.classList.add("has-text-danger");
        }
    }
}

function formReset() {
    sunEl.disabled = false;
    monEl.disabled = false;
    tueEl.disabled = false;
    wedEl.disabled = false;
    thuEl.disabled = false;
    friEl.disabled = false;
    satEl.disabled = false;

    repeatUntilEl.disabled = false;
    endDayEl.disabled = true;
    document.getElementById('form-left').reset();
    document.getElementById('form-right').reset();
    sunEl.disabled = true;
    monEl.disabled = true;
    tueEl.disabled = true;
    wedEl.disabled = true;
    thuEl.disabled = true;
    friEl.disabled = true;
    satEl.disabled = true;

    repeatUntilEl.disabled = true;
    endDayEl.disabled = false;
    document.getElementById('form-left').reset();
    document.getElementById('form-right').reset();
}
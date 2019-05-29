'use strict';

var calendarEl = document.getElementById('calendar');

var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['timeGrid'],
    nowIndicator: true,
    minTime: "08:00:00",
    maxTime: "20:00:00",
    allDaySlot: false,
    height: $(window).height() * 0.5
});

if (window.localStorage.getItem("userID") == "0") {
    var calJSON = calList0;
}
if (window.localStorage.getItem("userID") == "1") {
    var calJSON = calList1;
}

document.addEventListener('DOMContentLoaded', function () {

    calendar.render();

    for (event in calJSON) {
        if (calJSON[event]["repeat"]) {}
    }
});
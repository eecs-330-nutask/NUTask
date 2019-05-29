
var calendarEl = document.getElementById('calendar');

var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'timeGrid' ],
    nowIndicator: true,
    minTime: "08:00:00",
    maxTime: "20:00:00",
    allDaySlot: false,
    height: $(window).height()*0.5
});

if (window.localStorage.getItem("userID") == "0") {
    var calJSON = calList0;
}
if (window.localStorage.getItem("userID") == "1") {
    var calJSON = calList1;
}
    
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("day-0").disabled = true;  
    document.getElementById("day-1").disabled = true;  
    document.getElementById("day-2").disabled = true;  
    document.getElementById("day-3").disabled = true;  
    document.getElementById("day-4").disabled = true;  
    document.getElementById("day-5").disabled = true;  
    document.getElementById("day-6").disabled = true;  
    document.getElementById("repeat-until-input").disabled = true;

    
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

            })
        }
        else {
            calendar.addEvent({
                title: calJSON[event]['title'],
                start: calJSON[event]['start'],
                end: calJSON[event]['end'],


            })
        }
    }

  })
  

document.getElementById('repeat-select').onchange = function() {
    var opt = document.getElementById('repeat-select');

    if (opt.options[opt.selectedIndex].value == 1) {
        document.getElementById("day-0").disabled = false;  
        document.getElementById("day-1").disabled = false;  
        document.getElementById("day-2").disabled = false;  
        document.getElementById("day-3").disabled = false;  
        document.getElementById("day-4").disabled = false;  
        document.getElementById("day-5").disabled = false;  
        document.getElementById("day-6").disabled = false;  
        document.getElementById("repeat-until-input").disabled = false;

    }
    else {
        document.getElementById("day-0").disabled = true;  
        document.getElementById("day-1").disabled = true;  
        document.getElementById("day-2").disabled = true;  
        document.getElementById("day-3").disabled = true;  
        document.getElementById("day-4").disabled = true;  
        document.getElementById("day-5").disabled = true;  
        document.getElementById("day-6").disabled = true;  
        document.getElementById("repeat-until-input").disabled = true;


    }
}
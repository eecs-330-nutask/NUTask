document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'timeGrid' ],
        nowIndicator: true,
        minTime: "08:00:00",
        maxTime: "20:00:00",
        allDaySlot: false,
        height: $(window).height()*0.6
    });
  
    calendar.render();

  })
  
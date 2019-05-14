




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


    document.getElementById("p1").innerHTML = "New text!";
  } 
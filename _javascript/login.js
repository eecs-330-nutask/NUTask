var people = [
    {
        email: "student0@u.northwestern.edu",
        password: "student0",
        name: "John Doe"
    },
    {
        email: "student1@u.northwestern.edu",
        password: "student1",
        name: "Joe Smith"
    }
]

function checkLogin() {
    if (document.getElementById("emailval").value != null &&
        document.getElementById("passwordval").value != null) {

        var email = document.getElementById("emailval").value;
        var password = document.getElementById("passwordval").value;

        for (let i = 0; i < people.length; i++) {
            if (email == people[i].email && password == people[i].password) {
                document.location.href = 'task' + i + '.html';

                window.localStorage.setItem("userID", i);
                return;
            }
        }
        // If wrong login
        document.getElementById("emailval").setAttribute("class","input is-danger");
        document.getElementById("passwordval").setAttribute("class","input is-danger");
        document.getElementById("badlogin").style.display = "inline";
    }   
}

function getUser() {
    return window.localStorage.getItem("userID");
}

function getTaskPage() {
    return 'task' + getUser() + '.html';
}

function getCalendarPage() {
    return 'calendar' + getUser() + '.html';
}

function getSuggestionsPage() {
    return 'suggestions' + getUser() + '.html';
}

function getProfilePage() {
    return 'profile' + getUser() + '.html';
}

function getNavbarPage() {
    return 'navbar' + getUser() + '.html';
}
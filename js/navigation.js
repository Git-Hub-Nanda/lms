function loadMenu() {
    var logindetails = sessionStorage.getItem("user-type");
    var menu = document.getElementById("menu");
    if (logindetails == "ADMIN") {
        var adminmenucontent = "<ul>"
            + '<li><a href="#" onclick="displayComponent(\'approval\');">APPROVALS</a></li>'
            + '<li><a href="#" onclick="displayComponent(\'add\');">ADD BOOK</a></li>'
            + '<li><a href="#" onclick="displayComponent(\'edit\');">EDIT BOOK</a></li>'
            + '<li><a href="#" onclick="displayComponent(\'delete\');">DELETE BOOK</a></li>'
            + "</ul>";
        menu.innerHTML = adminmenucontent;
    } else {
        var studentmenucontent = '<ul>'
            + '<li><a href="#" onclick="displayComponent(\'request\');">REQUEST BOOK</a></li>'
            + '<li><a href="#" onclick="displayComponent(\'return\');">MY REQUESTS</a></li>'
            + '</ul>';
        menu.innerHTML = studentmenucontent;
    }
}

function loadSection() {
    var userType = sessionStorage.getItem("user-type");
    var section = document.getElementById("sec1");
    if (userType == "STUDENT") {
        var studentsection = '<h2>Available Options</h2>'
            + '<ul>'
            + '    <li><strong>Request Book</strong>'
            + '        <p><ul><li>Book request creation.</li></ul></p>'
            + '    </li>'
            + '    <li><strong>Return Book</strong>'
            + '        <p><ul><li>Returning the book after its being used.</li></ul></p>'
            + '    </li>'
            + '    <li><strong>Close Request</strong>'
            + '        <p><ul><li>Request can be closed after the book return is accepted by the admin.</li></ul></p>'
            + '    </li>'
            + '</ul><br>';
        section.innerHTML = studentsection;
    } else {
        var adminsection = '<h2>Available Options</h2>'
            + '<ul>'
            + '    <li><strong>Add Book</strong>'
            + '        <p><ul><li>A new book will be added to the system.</li></ul></p>'
            + '    </li>'
            + '    <li><strong>Edit Book</strong>'
            + '        <p><ul><li>Existing book will be edited updated to the system.</li></ul></p>'
            + '    </li>'
            + '    <li><strong>Delete Book</strong>'
            + '        <p><ul><li>Existing book will be deleted from the system.</li></ul></p>'
            + '    </li>'
            + '    <li><strong>Approvals</strong>'
            + '        <p><ul>'
            + '            <li>Book request approval.</li>'
            + '            <li>Book request Rejection.</li>'
            + '            <li>Book return Acceptance.</li>'
            + '        </ul></p>'
            + '    </li>'
            + '</ul><br>';
        section.innerHTML = adminsection;
    }
}

function displayComponent(componentId) {
    var components = document.getElementById(componentId).parentElement.children;
    for (var itr = 0; itr < components.length; itr++) {
        if (components[itr].id === componentId) {
            components[itr].parentElement.style.display = "block";
            components[itr].style.display = "block";
        } else {
            components[itr].style.display = "none";
        }
    }
}

function cancel(componentId) {
    if (componentId == "edit") {
        document.getElementById("e-reset").click = "";
        document.getElementById("edit-section").style.display = "none";
        document.getElementById("uppercancel").style.display = "block";
    }
    document.getElementById(componentId).style.display = "none";
    document.getElementById(componentId).parentElement.style.display = "none";
}
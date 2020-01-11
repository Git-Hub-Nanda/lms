function loadMenu() {
    var logindetails = sessionStorage.getItem("user-type");
    var menu = document.getElementById("menu");
    if (logindetails == "ADMIN"  ) {
        var adminmenucontent = "<ul>" 
            + '<li><a href="#" onclick="loadComponent(\'approval\');">APPROVALS</a></li>'
            + '<li><a href="#" onclick="loadComponent(\'add\');">ADD BOOK</a></li>'
            + '<li><a href="#" onclick="loadComponent(\'edit\');">EDIT BOOK</a></li>'
            + '<li><a href="#" onclick="loadComponent(\'delete\');">DELETE BOOK</a></li>'
        + "</ul>";
        menu.innerHTML = adminmenucontent;
    } else {
        var studentmenucontent = '<ul class="st-justify-content">' 
            + '<li><a href="#" onclick="loadComponent(\'request\');">REQUEST BOOK</a></li>'
            + '<li><a href="#" onclick="loadComponent(\'return\');">RETURN BOOK</a></li>'
        + '</ul>';
        menu.innerHTML = studentmenucontent; 
    }
}

function loadComponent(componentId) {
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
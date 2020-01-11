
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
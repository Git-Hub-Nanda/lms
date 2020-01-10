
function loadComponent(componentId) {
    var components = document.getElementById(componentId).parentElement.children;
    for (var itr = 0; itr < components.length; itr++) {
        if (components[itr].id === componentId){
            components[itr].parentElement.style.display = "block";
            components[itr].style.display = "block";
        } else {
            components[itr].style.display = "none";
        }
    }
}

function cancel(componentId) {           
    document.getElementById(componentId).style.display = "none";
    document.getElementById(componentId).parentElement.style.display = "none";
}
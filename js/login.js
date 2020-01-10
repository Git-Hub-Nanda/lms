/**
 * Mock users.
 */
const MOCK_USERS = [
    {
        "user-type": "ADMIN",
        "user-name": "1001",
        "password": "1001"
    },
    {
        "user-type": "STUDENT",
        "user-name": "5001",
        "password": "5001"
    }
];

/**
 * Login Actions.
 */
function logIn(){
    var user_type = document.getElementById("user-type").value;
    var user_name = document.getElementById("user-name").value;
    var password = document.getElementById("password").value;
    if(user_type == "" || user_type == undefined){
        alert("Please select the USER TYPE.");
        return false;
    }else if(user_name == "" || user_name == undefined){
        alert("Please select the USER NAME.");
        return false;
    }else if(password == "" || password == undefined){
        alert("Please select the PASSWORD.");
        return false;
    }else{
        var user_exists = MOCK_USERS.filter(user => {
            return user["user-type"] === user_type.trim()
                && user["user-name"] === user_name.trim()
                && user.password === password.trim();
        })
        if(user_exists.length > 0){
            sessionStorage.setItem("user-type", user_type.trim());
            sessionStorage.setItem("user-name", user_name.trim());
            window.location.href = "./lms.html";
        }else{
            alert("Invalid USER NAME or PASSWORD.");
            return false;
        }
    }
}

function logout(){    
    sessionStorage.removeItem("user-type");
    sessionStorage.removeItem("user-name");
    window.location.href = "./login.html";
}
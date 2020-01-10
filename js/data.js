var users = localStorage.getItem("users");
if(users == "" || users == null || users == undefined){
    users = [
        {
            "user-type": "ADMIN",
            "user-name": "Admin",
            "password": "Admin123"
        },
        {
            "user-type": "STUDENT",
            "user-name": "StudentOne",
            "password": "Student123"
        }
    ];
}else{
    users = JSON.parse(users);
}

var books = localStorage.getItem("books");
if(books == "" || books == null || books == undefined){
    books = [];
}else{
    books = JSON.parse(books);
}
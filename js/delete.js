function loadBooksToDelete() {
    var delete_books_container = document.getElementById("delete-books-container");
    var JSONbooks = [];
    var books = localStorage.getItem("books");
    if (books != null && books != undefined && books != "") {
        JSONbooks = JSON.parse(books);
        console.log(JSONbooks);
        if (JSONbooks.length > 0) {
            var table = '<table>'
                + '    <tbody>';
            var row = "";
            JSONbooks.sort((b1, b2) => b1.bookId - b2.bookId);
            console.log(JSONbooks);
            for (var itr = 0; itr < JSONbooks.length; itr++) {
                row += '        <tr class="row">'
                    + '            <td class="col-xs-6 col-md-3"><b>Book Id</b></td>'
                    + '            <td class="col-xs-6 col-md-3">' + JSONbooks[itr].bookId + '</td>'
                    + '            <td class="col-xs-6 col-md-3"><b>Book Name</b></td>'
                    + '            <td class="col-xs-6 col-md-3">' + JSONbooks[itr].bookName + '</td>'
                    + '        </tr>'
                    + '        <tr class="row">'
                    + '            <td class="col-xs-6 col-md-3"><b>Author</b></td>'
                    + '            <td class="col-xs-6 col-md-3">' + JSONbooks[itr].author + '</td>'
                    + '            <td class="col-xs-6 col-md-3"><b>Publisher</b></td>'
                    + '            <td class="col-xs-6 col-md-3">' + JSONbooks[itr].publisher + '</td>'
                    + '        </tr>'
                    + '        <tr class="row">'
                    + '            <td class="col-xs-6 col-md-3"><b>Stocks</b></td>'
                    + '            <td class="col-xs-6 col-md-3">' + JSONbooks[itr].stocks + '</td>'
                    + '            <td class="col-xs-6 col-md-3"><b>Added Date</b></td>'
                    + '            <td class="col-xs-6 col-md-3">' + JSONbooks[itr].addedDate + '</td>'
                    + '        </tr>'
                    + '        <tr class="row">'
                    + '            <td class="col-xs-6 col-md-3"><b>Added By</b></td>'
                    + '            <td class="col-xs-6 col-md-3">' + JSONbooks[itr].addedBy + '</td>'
                    + '            <td class="col-xs-6 col-md-3"><b>Last Edited Date</b></td>'
                    + '            <td class="col-xs-6 col-md-3">';
                if (JSONbooks[itr].lastEditedDate == undefined
                    || JSONbooks[itr].lastEditedDate == ""
                    || JSONbooks[itr].lastEditedDate == null) {
                    row += "--------";
                } else {
                    row += JSONbooks[itr].lastEditedDate;
                }
                row += '</td>'
                    + '        </tr>'
                    + '        <tr class="row">'
                    + '            <td class="col-xs-6 col-md-3"><b> Last Edited By</b></td>'
                    + '            <td class="col-xs-6 col-md-3">';
                if (JSONbooks[itr].lastEditedBy == undefined
                    || JSONbooks[itr].lastEditedBy == ""
                    || JSONbooks[itr].lastEditedBy == null) {
                    row += "--------";
                } else {
                    row += JSONbooks[itr].lastEditedBy;
                }

                row += '</td>'
                    + '            <td class="col-xs-6 col-md-3"><b>Action</b></td>'
                    + '            <td class="col-xs-6 col-md-3"><input type="button" value="delete" onclick="remove(' + JSONbooks[itr].bookId + ');"></td>'
                    + '        </tr>';
            }

            table += row;
            table += '    </tbody>'
                + '</table>';

            delete_books_container.innerHTML = table;
        } else {
            delete_books_container.innerHTML = "<h3>No Boooks Available</h3><br>";
        }
    } else {
        delete_books_container.innerHTML = "<h3>No Boooks Available</h3><br>";
    }
}

function remove(bookId) {
    var books = localStorage.getItem("books");
    books = JSON.parse(books);
    var filterbooks = books.filter(bk => bk.bookId != bookId);
    var dbooks = JSON.stringify(filterbooks);
    var confirmationmessege = confirm("Are you sure you want to delete this book. with book Id: " + bookId);
    if (confirmationmessege == true) {
        alert("Book deleted succesfylly with book Id: " + bookId);
        localStorage.setItem("books", dbooks);
        loadBooksToEdit();
        loadBooksToDelete();
    }
}
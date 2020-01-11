function loadBooksToEdit() {
  var edit_books_container = document.getElementById("edit-books-container");
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
          + '            <td class="col-xs-6 col-md-3"><input type="button" value="Edit" onclick="edit(' + JSONbooks[itr].bookId + ');"></td>'
          + '        </tr>';
      }

      table += row;
      table += '    </tbody>'
        + '</table>';
      edit_books_container.innerHTML = table;
    } else {
      edit_books_container.innerHTML = "<h3>No Boooks Available</h3><br>";
    }
  } else {
    edit_books_container.innerHTML = "<h3>No Boooks Available</h3><br>";
  }
}
function edit(bookId) {
  var JSbooks = [];
  console.log("book Id:", bookId);
  var bookorder = localStorage.getItem("books");
  JSbooks = JSON.parse(bookorder);
  var filterbooks = JSbooks.filter(bk => bk.bookId == bookId);
  console.log("filterbooks :", filterbooks);
  document.getElementById("e_book_name").value = filterbooks[0].bookName;
  document.getElementById("e_author").value = filterbooks[0].author;
  document.getElementById("e_publisher").value = filterbooks[0].publisher;
  document.getElementById("e_stocks").value = filterbooks[0].stocks;
  document.getElementById("Save").removeAttribute("disabled");
  document.getElementById("editing_book_id").value = bookId;
  document.getElementById("edit-section").style.display = "block";
  document.getElementById("uppercancel").style.display = "none";

  var co_ordinates = document.getElementById("edit-section").getBoundingClientRect();
  console.log(co_ordinates);
  window.scrollTo(co_ordinates.x, co_ordinates.y);
}


function save() {
  var book_name = document.getElementById("e_book_name").value;
  var author = document.getElementById("e_author").value;
  var publisher = document.getElementById("e_publisher").value;
  var stocks = document.getElementById("e_stocks").value;
  console.log("book_name : ", book_name);
  console.log("author : ", author);
  console.log("publisher : ", publisher);
  console.log("stocks : ", stocks);
  if (book_name == "" || book_name == null || book_name == undefined) {    /** Checking if the book_name has value or not. */
    alert("Please enter the Book Name.");           /** Displaying message to the user if value is not there. */
    return false;                                   /** Returning out of the function. */
  } else if (!(isItAAlphaNumericData(book_name))) {      /** Checking valid book_name using a function */
    alert("Please enter valid Book Name.");
    return false;
  } else if (author == "" || author == null || author == undefined) {
    alert("Please enter the Author.");
    return false;
  } else if (!(isItAAlphaNumericData(author))) {      /** Checking valid author using a function */
    alert("Please enter valid Author.");
    return false;
  } else if (publisher == "" || publisher == null || publisher == undefined) {
    alert("Please enter the Publisher.");
    return false;
  } else if (!(isItAAlphaNumericData(publisher))) {      /** Checking valid publisher using a function */
    alert("Please enter valid Publisher.");
    return false;
  } else if (stocks == "" || stocks == null || stocks == undefined) {
    alert("Please enter the no of Stocks.");
    return false;
  } else if (!(isItANumericData(stocks))) {      /** Checking valid stocks using a function */
    alert("Please enter valid no of Stocks.");
    return false;
  }
  else {
    var books = localStorage.getItem("books");
    console.log("books : ", books);
    books = JSON.parse(books);
    var bookId = document.getElementById("editing_book_id").value;
    console.log("bookId : ", bookId);
    var filteredbooks = books.filter(bk => bk.bookId == bookId);
    var selectedbook = filteredbooks[0];
    console.log("selectedbook : ", selectedbook);
    selectedbook.bookName = book_name;
    selectedbook.author = author;
    selectedbook.publisher = publisher;
    selectedbook.stocks = stocks;
    var d = new Date();
    var td1 = d.getDate();
    if (td1 <= 9) {
      td1 = "0" + td1;
    }
    var tm = d.getMonth();
    tm = tm + 1;
    if (tm <= 9) {
      tm = "0" + tm;
    }
    var ty = d.getFullYear();
    var th = d.getHours();
    if (th <= 9) {
      th = "0" + th;
    }
    var tmin = d.getMinutes();
    if (tmin <= 9) {
      tmin = "0" + tmin;
    }
    var ts = d.getSeconds();
    if (ts <= 9) {
      ts = "0" + ts;
    }
    // var td = new Date(td1-tm-ty/th-tm-ts);
    selectedbook.lastEditedDate = td1 + "-" + (tm) + "-" + ty + " " + th + ":" + tmin + ":" + ts;
    var UserName = sessionStorage.getItem("user-name");
    console.log(" User Name ", UserName);
    selectedbook.lastEditedBy = UserName;
    console.log("after edit selectedbook ", selectedbook);
    var confirmationmessage = confirm("Are you sure, want to edit book " + selectedbook.bookId + "?");
    if (confirmationmessage == true) {
      console.log("yes");
      books = JSON.stringify(books);
      localStorage.setItem("books", books);
      console.log("final Id ", selectedbook.bookId);
      alert("Book edit completed successfully to the book " + selectedbook.bookId);
      document.getElementById("e_book_name").value = "";
      document.getElementById("e_author").value = "";
      document.getElementById("e_publisher").value = "";
      document.getElementById("e_stocks").value = "";
      // document.getElementById("e-reset").click();
      document.getElementById("edit-section").style.display = "none";
      document.getElementById("uppercancel").style.display = "block";
      loadBooksToEdit();
      window.scrollTo(0, 0);
    }
  }
}
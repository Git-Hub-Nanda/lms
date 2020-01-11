
function loadBooksToRequest() {
  var books = getAvailableBooksForTheLoggedInStudent();
  var requestedBookContainer = document.getElementById("requestedBookContainer");
  console.log("books : ", books);
  if (books != null && books != undefined && books != "") {
    if (books.length > 0) {
      var row = "";
      var table = '<table>'
        + '    <tbody>';
      books.sort((b1, b2) => b1.bookId - b2.bookId);
      console.log(books);
      for (var itr = 0; itr < books.length; itr++) {
        let sbook = books[itr];
        row += '        <tr class="row">'
          + '            <td class="col-xs-6 col-md-3"><b>Book Id</b></td>'
          + '            <td class="col-xs-6 col-md-3">' + sbook.bookId + '</td>'
          + '            <td class="col-xs-6 col-md-3"><b>Book Name</b></td>'
          + '            <td class="col-xs-6 col-md-3">' + sbook.bookName + '</td>'
          + '        </tr>'
          + '        <tr class="row">'
          + '            <td class="col-xs-6 col-md-3"><b>Author</b></td>'
          + '            <td class="col-xs-6 col-md-3">' + sbook.author + '</td>'
          + '            <td class="col-xs-6 col-md-3"><b>Publisher</b></td>'
          + '            <td class="col-xs-6 col-md-3">' + sbook.publisher + '</td>'
          + '        </tr>'
          + '        <tr class="row">'
          + '            <td class="col-xs-6 col-md-3"><b>Stocks</b></td>'
          + '            <td class="col-xs-6 col-md-3">' + sbook.stocks + '</td>'
          + '            <td class="col-xs-6 col-md-3"><b>Added Date</b></td>'
          + '            <td class="col-xs-6 col-md-3">' + sbook.addedDate + '</td>'
          + '        </tr>'
          + '        <tr class="row">'
          + '            <td class="col-xs-6 col-md-3"><b>Added By</b></td>'
          + '            <td class="col-xs-6 col-md-3">' + sbook.addedBy + '</td>'
          + '            <td class="col-xs-6 col-md-3"><b>Last Edited Date</b></td>'
          + '            <td class="col-xs-6 col-md-3">';
        if (sbook.lastEditedDate == undefined
          || sbook.lastEditedDate == ""
          || sbook.lastEditedDate == null) {
          row += "--------";
        } else {
          row += sbook.lastEditedDate;
        }
        row += '</td>'
          + '        </tr>'
          + '        <tr class="row">'
          + '            <td class="col-xs-6 col-md-3"><b> Last Edited By</b></td>'
          + '            <td class="col-xs-6 col-md-3">';
        if (sbook.lastEditedBy == undefined
          || sbook.lastEditedBy == ""
          || sbook.lastEditedBy == null) {
          row += "--------";
        } else {
          row += sbook.lastEditedBy;
        }

        row += '</td>'
          + '            <td class="col-xs-6 col-md-3"><b>Action</b></td>'
          + '            <td class="col-xs-6 col-md-3"><input type="button" value="Request" onclick="request(' + sbook.bookId + ');"></td>'
          + '        </tr>';
      }

      table += row;
      table += '    </tbody>'
        + '</table>';
      requestedBookContainer.innerHTML = table;
    } else {
      requestedBookContainer.innerHTML = "<h3>No Boooks Available</h3><br>";
    }
  }
}


function request(bookId) {
  console.log("book Id:", bookId);
  var books = localStorage.getItem("books");
  books = JSON.parse(books);
  var filterbooks = books.filter(bk => bk.bookId == bookId);
  console.log("filterbooks :", filterbooks);
  var requestedbook = filterbooks[0];
  console.log(requestedbook);
  var requestedBooks = localStorage.getItem("requestedBooks");
  if (requestedBooks == "" || requestedBooks == null || requestedBooks == undefined) {
    requestedBooks = [];
  } else {
    requestedBooks = JSON.parse(requestedBooks);
  }
  let request_id = 0;
  if (requestedBooks.length > 0) {
    requestedBooks.sort((b1, b2) => b2.requestId - b1.requestId);
    request_id = requestedBooks[0].requestId;
  }
  var rb = {};
  rb.requestId = ++request_id;
  rb.bookName = requestedbook.bookName;
  rb.bookId = requestedbook.bookId;
  rb.requestedBy = sessionStorage.getItem("user-name");
  rb.requestedDate = getDateAsDDMMYYYYHHMISS();
  rb.status = "REQUESTED";
  console.log(rb);
  var confirmationmessege = confirm("Are you sure, you want to request the book:" + requestedbook.bookId + "?");
  if (confirmationmessege == true) {
    requestedBooks.push(rb);
    console.log(requestedBooks);
    alert("Book request created successfully for the book : " + requestedbook.bookId
            + "\nRequest Id: " + request_id);
    var requestedBooks = JSON.stringify(requestedBooks);
    localStorage.setItem("requestedBooks", requestedBooks);
    loadBooksToRequest();
  }
}

function getAvailableBooksForTheLoggedInStudent() {
  const ACT_BK_REQ_STATUS = ['REQUESTED', 'ISSUED'];
  let filBksOnStksPlusPrevReq = [];
  try {
    /** Logged In User/Student */
    let loggedInStudent = sessionStorage.getItem("user-name");
    console.log("loggedInStudent : ", loggedInStudent);
    /** Total Books */
    let books = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];
    console.log("books : ", books);
    /** Total requests, includes request from all student. */
    let requestedBooks = localStorage.getItem("requestedBooks") ? JSON.parse(localStorage.getItem("requestedBooks")) : [];
    console.log("requestedBooks : ", requestedBooks);
    let stocksUpdatedBooks = books.map(bk => {
      bk.stocks -= requestedBooks.filter(rbk => {
        return (
          rbk.bookId === bk.bookId
          && ACT_BK_REQ_STATUS.indexOf(rbk.status) > -1
        )
      }).length;
      return bk;
    });
    console.log("stocksUpdatedBooks : ", stocksUpdatedBooks);
    /** Books filtered on availability, that is no of Stocks shoulb be greater than zero */
    let filteredBooksOnStocks = stocksUpdatedBooks.filter(bk => bk.stocks > 0);
    console.log("filteredBooksOnStocks : ", filteredBooksOnStocks);
    /** Filtered logged in student's previously requested and active books */
    let prevReqActBkIds = []
    requestedBooks.map(rbk => {
      if (rbk.requestedBy === loggedInStudent
        && ACT_BK_REQ_STATUS.indexOf(rbk.status) > -1) {
        prevReqActBkIds.push(rbk.bookId);
      }
    });
    console.log("prevReqActBkIds : ", prevReqActBkIds);
    /** Filtered books are filtered again to avoid already requested books */
    filBksOnStksPlusPrevReq = filteredBooksOnStocks.filter(fbks => {
      if (prevReqActBkIds.indexOf(fbks.bookId) === -1) {
        return fbks;
      }
    });
    console.log("filBksOnStksPlusPrevReq : ", filBksOnStksPlusPrevReq);
  } catch (exp) {
    console.log("exp : ", exp);
    filBksOnStksPlusPrevReq = [];
  }
  return filBksOnStksPlusPrevReq;
}
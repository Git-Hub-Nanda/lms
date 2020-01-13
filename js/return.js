function loadMyRequests() {
    var requestedBooks = localStorage.getItem("requestedBooks");
    if (requestedBooks != "" && requestedBooks != undefined && requestedBooks != null) {
        requestedBooks = JSON.parse(requestedBooks);
    } else {
        requestedBooks = [];
    }
    console.log("requestedBooks : ", requestedBooks);
    let myRequestBooks = requestedBooks.filter(bk => bk.requestedBy == sessionStorage.getItem("user-name"));
    console.log("myRequestBooks : ", myRequestBooks);
    let my_request_book_container = document.getElementById("my-request-book-container");
    if (myRequestBooks.length > 0) {
        var table = '<table>    <tbody>';
        var row = "";
        myRequestBooks = myRequestBooks.sort((b1, b2) => b1.requestId - b2.requestId);
        for (var itr = 0; itr < myRequestBooks.length; itr++) {
            let sbook = myRequestBooks[itr];
            let action = '';
            let status = '';
            if (sbook.status === "REQUESTED") {
                status = "Requested";
                action = '<input type="button" value="Cancel" onclick="cancelRequest(' + sbook.requestId + ');">';
            } else if (sbook.status === "ACANCELLED") {
                status = "Admin Cancelled";
                action = '<input type="button" value="Close" onclick="closeRequest(' + sbook.requestId + ');">';
            } else if (sbook.status === "YCANCELLED") {
                status = "You have cancelled";
                action = '<input type="button" value="Close" onclick="closeRequest(' + sbook.requestId + ');">';
            } else if (sbook.status === "ACCEPTED") {
                status = "Return Accepted";
                action = '<input type="button" value="Close" onclick="closeRequest(' + sbook.requestId + ');">';
            } else if(sbook.status === "RETURNED"){
                status = "Returned";
                action = '<input type="button" value="Not Applicable" disabled>';
            }
            else{
                status = "Issued";
                action = '<input type="button" value="Return" onclick="returnRequest(' + sbook.requestId +"," + sbook.bookId +');">';
            }
            row += '        <tr class="row">'
                + '            <td class="col-xs-6 col-md-3"><b>Request Id</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.requestId + '</td>'
                + '            <td class="col-xs-6 col-md-3"><b>Book Id</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.bookId + '</td>'
                + '        </tr>'
                + '        <tr class="row">'
                + '            <td class="col-xs-6 col-md-3"><b>Book Name</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.bookName + '</td>'
                + '            <td class="col-xs-6 col-md-3"><b>Requested By</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.requestedBy + '</td>'
                + '        </tr>'
                + '        <tr class="row">'
                + '            <td class="col-xs-6 col-md-3"><b>Requested Date</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.requestedDate + '</td>'
                + '            <td class="col-xs-6 col-md-3"><b>Status</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + status + '</td>'
                + '        </tr>'
                + '        <tr class="row">'
                + '            <td class="col-xs-6 col-md-3"><b>Action</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + action + '</td>'
                + '        </tr>';
        }
        table += row;
        table += '    </tbody>'
            + '</table>';
        my_request_book_container.innerHTML = table;
    } else {
        my_request_book_container.innerHTML = "<h3>No Requests !!!</h3><br>";
    }
}

function closeRequest(requestId) {
    var requestedBooks = localStorage.getItem("requestedBooks");
    requestedBooks = JSON.parse(requestedBooks);
    requestedBooks = requestedBooks.filter(bk => bk.requestId != requestId);
    var confirmationmessege = confirm("Are you sure you want to the request: " + requestId + "?");
    if (confirmationmessege == true) {
        alert("Request: " + requestId + " closed successfully.");
        requestedBooks = JSON.stringify(requestedBooks);
        localStorage.setItem("requestedBooks", requestedBooks);
        loadMyRequests();
    }
}

function cancelRequest(requestId) {
    console.log("cancel Request callaed");
    let requestedBooks = localStorage.getItem("requestedBooks");
    requestedBooks = JSON.parse(requestedBooks);
    console.log("requestedBooks before filter : ", requestedBooks);
    var confirmationmessege = confirm("Are you sure, you want to cancel the request " + requestId + "?");
    if (confirmationmessege) {
        requestedBooks = requestedBooks.map(bk => {
            if (bk.requestId == requestId) bk.status = "YCANCELLED";
            return bk;
        });
        console.log("requestedBooks :", requestedBooks);
        requestedBooks = JSON.stringify(requestedBooks);
        console.log("requestedBooks :", requestedBooks);
        localStorage.setItem("requestedBooks", requestedBooks);
        loadMyRequests();
        loadBooksToRequest();
    }
}
function returnRequest(requestId, bookId){
    console.log("return Request callaed");
    let requestedBooks = localStorage.getItem("requestedBooks");
    requestedBooks = JSON.parse(requestedBooks);
    console.log("requestedBooks before filter : ", requestedBooks);
    var confirmationmessege = confirm("Are you sure, you want to return the book " + bookId + "?");
    if (confirmationmessege) {
        requestedBooks = requestedBooks.map(bk => {
            if (bk.requestId == requestId) bk.status = "RETURNED";
            return bk;
        });
        console.log("requestedBooks :", requestedBooks);
        requestedBooks = JSON.stringify(requestedBooks);
        console.log("requestedBooks :", requestedBooks);
        localStorage.setItem("requestedBooks", requestedBooks);
        loadMyRequests();
        // loadBooksToRequest();
    }
}
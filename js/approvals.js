function loadRequestApprovals() {
    console.log("load approvals called");
    var requestedBooks = localStorage.getItem("requestedBooks");
    console.log("requestedBooks : ", requestedBooks);
    if (requestedBooks != "" && requestedBooks != undefined && requestedBooks != null) {
        requestedBooks = JSON.parse(requestedBooks);
    } else {
        requestedBooks = [];
    }
    console.log("requestedBooks : ", requestedBooks);
    requestedBooks = requestedBooks.filter(bk => ["REQUESTED", "RETURNED"].indexOf(bk.status) > -1);
    let approval_books_container = document.getElementById("approval-books-container");
    if (requestedBooks.length > 0) {
        var table = '<table>    <tbody>';
        var row = "";
        requestedBooks.sort((b1, b2) => b1.bookId - b2.bookId);
        console.log("Sorted requestedBooks : ", requestedBooks);
        for (var itr = 0; itr < requestedBooks.length; itr++) {
            let sbook = requestedBooks[itr];
            row += '        <tr class="row">'
                + '            <td class="col-xs-6 col-md-3"><b>Request Id</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.requestId + '</td>'
                + '            <td class="col-xs-6 col-md-3"><b>Book Id</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.bookId + '</td>'
                + '        </tr>'
                + '        <tr class="row">'
                + '            <td class="col-xs-6 col-md-3"><b>Book Name</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.bookName + '</td>'
                + '            <td class="col-xs-6 col-md-3"><b>Requested Date</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.requestedDate + '</td>'
                + '        </tr>'
                + '        <tr class="row">'
                + '            <td class="col-xs-6 col-md-3"><b>Requested By</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.requestedBy + '</td>'
                + '            <td class="col-xs-6 col-md-3"><b>Status</b></td>'
                + '            <td class="col-xs-6 col-md-3">' + sbook.status + '</td>'
                + '        </tr>'
                + '        <tr class="row">'
                + '            <td class="col-xs-6 col-md-3"><b>Actions</b></td>'
                + '            <td class="col-xs-6 col-md-3"><input type="button" value="Approve" onclick="approve(' + sbook.requestId + ',\'A\');"></td>'
                + '            <td class="col-xs-6 col-md-3"></td>'
                + '            <td class="col-xs-6 col-md-3"><input type="button" value="Reject" onclick="approve(' + sbook.requestId + ', \'R\');"></td>'
                + '        </tr>';
        }
        table += row;
        table += '    </tbody>'
            + '</table>';
        approval_books_container.innerHTML = table;

    } else {
        approval_books_container.innerHTML = "<h3>No Pending Approvals !!!</h3><br>";
    }
}

function approve(requestId, type) {
    console.log("requestId: ", requestId);
    var requestedBooks = localStorage.getItem("requestedBooks");
    console.log("requestedBooks :", requestedBooks);
    requestedBooks = JSON.parse(requestedBooks);
    console.log("requestedBooks :", requestedBooks);
    let selectedRequests = requestedBooks.filter(bk => (bk.requestId == requestId));
    console.log("selectedRequests: ", selectedRequests);
    let confirmMessageText = "Are you sure you want to ";
    let messageText = "Request " + requestId + " is ";
    if (type === "A") {
        confirmMessageText += "approve";
        messageText += "approved";
    } else {
        confirmMessageText += "reject";
        messageText += "rejected";
    }
    confirmMessageText += " the request: " + requestId + "?";
    messageText += " sucessfully.";
    var confirmationmessage = confirm(confirmMessageText);
    if (confirmationmessage == true) {
        if (type === "A") {
            selectedRequests[0].status = "ISSUED";
        } else {
            selectedRequests[0].status = "ACANCELLED";
        }
        alert(messageText);
        requestedBooks = JSON.stringify(requestedBooks);
        console.log("requestedBooks :", requestedBooks);
        localStorage.setItem("requestedBooks", requestedBooks);
        loadRequestApprovals();
    }
}
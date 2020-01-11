/**
 * Read the book details from user(Admin) and store it in the data.js.
 */
function add() {
    /**
     * Reading input values from ADD form.
     */
    var book_name = document.getElementById("book_name").value;
    var author = document.getElementById("author").value;
    var publisher = document.getElementById("publisher").value;
    var stocks = document.getElementById("stocks").value;
    /**
     * Input validation starts here.
     */
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
    } else {
        /**
         * Now all the user inputs are valid. 
         * Collect them in an object and store it in data.js
         */
        let books = localStorage.getItem("books");
        if (books == "" || books == undefined || books == null) {
            books = [];
        } else {
            books = JSON.parse(books);
        }
        let book_id = 100;
        if (books.length > 0) {
            books.sort((b1, b2) => b2.bookId - b1.bookId);
            book_id = books[0].bookId;
        }
        var today = "";
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
        today = td1 + "-" + (tm) + "-" + ty + " " + th + ":" + tmin + ":" + ts;

        let book = {
            bookId: ++book_id,
            bookName: book_name,
            author: author,
            publisher: publisher,
            stocks: stocks,
            addedDate: today,
            addedBy: sessionStorage.getItem("user-name")
        };
        let books_count_previous = books.length;
        books.push(book);
        let books_count_current = books.length;
        if (books_count_current > books_count_previous) {
            localStorage.setItem("books", JSON.stringify(books));
            alert("Book added successfully with an ID: " + book_id);
            document.getElementById("re-set-btn").click();
            loadBooksToEdit();
            return false;
        } else {
            alert("Failed to add the book, please try later..");
            return false;
        }
    }
}

/**
 * Check the given data is Alpha Numeric or not.
 */
function isItAAlphaNumericData(data) {
    var validCharectors = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let itr = 0; itr < data.length; itr++) {
        let currentCharector = data[itr];
        let indexOfCurrentCharector = validCharectors.indexOf(currentCharector);
        if (indexOfCurrentCharector == -1) {
            return false;
        }
    }
    return true;
}

/**
 * Check the given data is Numeric or not.
 */
function isItANumericData(data) {
    var validCharectors = "0123456789";
    for (let itr = 0; itr < data.length; itr++) {
        let currentCharector = data[itr];
        let indexOfCurrentCharector = validCharectors.indexOf(currentCharector);
        if (indexOfCurrentCharector == -1) {
            return false;
        }
    }
    return true;
}
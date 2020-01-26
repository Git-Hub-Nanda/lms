/**
 * Check the given data is Alpha Numeric or not.
 */
function isItAAlphaNumericData(data) {
    var validCharectors = " _abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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

function getDateAsDDMMYYYYHHMISS(){
    var today = "";
    var date = new Date();
    var day = date.getDate();
    if (day <= 9) {
        day = "0" + day;
    }
    var month = date.getMonth();
    month = month + 1;
    if (month <= 9) {
        month = "0" + month;
    }
    var year = date.getFullYear();
    var hour = date.getHours();
    if (hour <= 9) {
        hour = "0" + hour;
    }
    var minutes = date.getMinutes();
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    var seconds = date.getSeconds();
    if (seconds <= 9) {
        seconds = "0" + seconds;
    }
    today = day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
    return today;
}

function toggleMoreBooks(target) {
    let moreblock = document.querySelector(".see-more>div");
    if (moreblock.style.display) {
        if (moreblock.style.display === "block") {
            moreblock.style.display = "none";
            target.innerText = "Show More";
        } else {
            moreblock.style.display = "block";
            target.innerText = "Show Less";
        }
    } else {
        moreblock.style.display = "block";
        target.innerText = "Show Less";
    }
}

/**
 * Extracting frequently used books based on the requests.
 */
function extractFrequentlyUsedBooks() {
    let frequentlyUsedBooks = [];
    try {
        let requestedBooks = localStorage.getItem("requestedBooks") ?
            JSON.parse(localStorage.getItem("requestedBooks")) : [];
        let bookIdsWithFrequency = {};
        if (requestedBooks.length > 0) {
            requestedBooks.map(r => {
                if (bookIdsWithFrequency[r.bookId]) {
                    bookIdsWithFrequency[r.bookId] += 1;
                } else {
                    bookIdsWithFrequency[r.bookId] = 1;
                }
            });
        }
        let sortedBookIdsWithFrequency = (Object.entries(bookIdsWithFrequency)
            .map(entry => entry.reverse().join(":"))).sort().reverse();
        console.log("bookIdsWithFrequency: ", bookIdsWithFrequency);
        console.log("sortedBookIdsWithFrequency: ", sortedBookIdsWithFrequency);
        let sortedBookIds = sortedBookIdsWithFrequency.map(d => d.split(":")[1]);
        sortedBookIds.map(sbid => {
            let books = localStorage.getItem("books") ?
                JSON.parse(localStorage.getItem("books")) : [];
            let fb = books.filter(bk => bk.bookId == sbid);
            if (fb && fb.length > 0) frequentlyUsedBooks.push(fb[0]);
        });
        if (frequentlyUsedBooks.length >= 5)
            frequentlyUsedBooks = frequentlyUsedBooks.slice(0, 4);
        console.log("frequentlyUsedBooks: ", frequentlyUsedBooks);
    } catch (exp) {
        console.log("exp : ", exp);
    }
    return frequentlyUsedBooks;
}

/**
 * Loading frequently used books.
 */
function loadFrequentlyUsedBooks() {
    let promise = new Promise((resolve) => resolve(extractFrequentlyUsedBooks()));
    promise.then(data => {
        let frequent_books_container =
            document.getElementById("frequent-books-container");
        let content = "<h2>Frequently used books</h2><hr>";
        let top2Books = '', remainingBooks = '';
        if (data && data.length > 0) {
            data.map((dt, index) => {
                let rec = '<div class="frequent-books">'
                    + '    <h3>' + initCap(dt.bookName) + '</h3>'
                    + '    <p><strong>Author: </strong>' + initCap(dt.author) + '</p>'
                    + '    <p><strong>Publisher: </strong>' + initCap(dt.publisher) + '</p>'
                    + '</div>';
                if (index < 2) {
                    top2Books += rec;
                } else {
                    remainingBooks += rec;
                }
            });
            content += top2Books
                + '<div class="see-more" id="see-more"><div>';
            if (remainingBooks != '') {
                content += remainingBooks
                    + '</div><button onclick="toggleMoreBooks(this);">Show More</button>';
            }
            content += '&nbsp;</div>';
        } else {
            content += "<h3>No Data Available.</h3>";
        }
        frequent_books_container.innerHTML = content;
    }).catch(error => {
        console.log("error: ", error);
    });
}

/**
 * 
 * @param {*} text, this is the text in which first letter needs to be capitalized.
 * Capitalize initial letter of the text.
 */
function initCap(text) {
    if (text) {
        if (text.length > 1) {
            return text = text.substr(0, 1).toUpperCase() + text.substr(1);
        } else {
            return text.toUpperCase();
        }
    }
    return text;
}
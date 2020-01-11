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
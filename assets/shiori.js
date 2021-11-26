function checkStorageSupport() {
    var test = "test";
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function getTotalHeight() {
    return document.body.clientHeight;
}

function getSavedPercent() {
    var percent = storageSupported ? loadFromStorage() : loadFromCookie();
    return (percent == null || percent == "") ? 0 : percent;
}


/******* Save *******/

function saveInStorage() {
    localStorage.setItem("scrollPercent", (document.documentElement.scrollTop / getTotalHeight()));
}

function saveCookie() {
    var expDate = new Date();
    expDate.setDate(expDate.getDate() + 7); // start over if it's been more than ___ days
    document.cookie = "scrollPercent=" + (document.documentElement.scrollTop / getTotalHeight())
        + "; " + expDate;
}


/******* Load *******/

function loadFromStorage() {
    return localStorage.getItem("scrollPercent");
}

function loadFromCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)scrollPercent\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}


/******* Remove *******/

function removeFromStorage() {
    localStorage.removeItem("scrollPercent");
}

function removeCookie() {
    document.cookie = "scrollPercent=''";
}


/******* Handler *******/

var saveButton = document.getElementById("saveButton"),
    saved = document.getElementById("saved");

saveButton.onclick = function () {
    storageSupported ? saveInStorage() : saveCookie();
    saved.style.visibility = "visible";
    setTimeout(function () {
        saved.style.visibility = "hidden";
    }, 1500);
};


/******* Logic *******/

var storageSupported = checkStorageSupport(),
    percent = getSavedPercent();

if (percent > 0) {
    if (confirm("挟んだしおりから読みますかね?")) {
        document.documentElement.scrollTop = percent * getTotalHeight(); // with jQuery, $("html, body").animate({ scrollTop: position });
    }
    storageSupported ? removeFromStorage() : removeCookie();
}



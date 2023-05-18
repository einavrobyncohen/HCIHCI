'use strict'

const overlay = document.querySelector(".overlay");

//share popup//
const shareBtn = document.querySelector('.share-btn'),
    sharePopup = document.querySelector('.popup-share'),
    closeSharePopup = sharePopup.querySelector('.close');

//email popup//
const fromInput = document.getElementById("from"),
    toInput = document.getElementById("to"),
    sendBtn = document.getElementById("sendBtn"),
    emailInterface = document.querySelector(".email-interface"),
    regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

//translate popup//
const translateBtn = document.querySelector(".translate-btn"),
    translatePopup = document.querySelector(".popup-translate"),
    closeTranslatePopup = translatePopup.querySelector(".close"),
    translateOptions = translatePopup.querySelectorAll(".icon-wrapper");


//download option//
const downloadBtn = document.getElementById("download");


//**SHARE CONTRACT*/

//clicking on the option to share the contract// 

shareBtn.onclick = () => {
    sharePopup.classList.toggle("show");
    overlay.classList.toggle("show");
    shareBtn.querySelector("i").classList.toggle("selected")
}

closeSharePopup.onclick = () => {
    shareBtn.click();
}

// clicking on the option to share via email// 

function openEmail() {
    emailInterface.classList.add("show");
    sharePopup.classList.remove("show");
    if (userData.loggedIn) {
        fromInput.value = userData.email;
    }
    
}

const enableSendBtn = () => {
    if(regEmail.test(fromInput.value) && regEmail.test(toInput.value)) {
        sendBtn.disabled = false;
    } else {
        sendBtn.disabled = true;
    }
}

function closeEmail() {
    // end tracker sharing option// 
    emailInterface.classList.remove("show");
    overlay.classList.remove("show");
    shareBtn.querySelector("i").classList.remove("selected");
    emailInterface.querySelector("form").reset();
    sendBtn.disabled = true;
}

fromInput.addEventListener("input", enableSendBtn);
toInput.addEventListener("input", enableSendBtn);
sendBtn.addEventListener("click", closeEmail);


//**TRANSLATE CONTRACT*/

translateBtn.onclick = () => {
    if (!userData.loggedIn) {
        translatePopup.classList.toggle("show");
        overlay.classList.toggle("show");
        translateBtn.querySelector("i").classList.toggle("selected");
    } else {
        initializeView('./translated-contract.pdf');
    }
}

closeTranslatePopup.onclick = () => {
    translateBtn.click();
}

translateOptions.forEach(function(option) {
    option.addEventListener("click", function() {
        translateBtn.click();
        // showing translated pdf// 
        initializeView('./translated-contract.pdf');
    })
})

//**DOWNLOAD CONTRACT*/

downloadBtn.addEventListener("click", function() {
    // ending tracker for downloading task //; 
    taskCompleted('download');
});










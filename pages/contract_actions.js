'use strict'

const shareBtn = document.querySelector('.share-btn'),
    sharePopup = document.querySelector('.popup'),
    closeSharePopup = sharePopup.querySelector('.close'),
    overlay = document.querySelector(".overlay"),
    fromInput = document.getElementById("from"),
    toInput = document.getElementById("to"),
    sendBtn = document.getElementById("sendBtn"),
    emailInterface = document.querySelector(".email-interface"),
    regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;


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
}


const enableSendBtn = () => {
    if(regEmail.test(fromInput.value) && regEmail.test(toInput.value)) {
        sendBtn.disabled = false;
    } else {
        sendBtn.disabled = true;
    }
}


function closeEmail() {
    emailInterface.classList.remove("show");
    overlay.classList.remove("show");
    shareBtn.querySelector("i").classList.remove("selected");
    emailInterface.querySelector("form").reset();
    sendBtn.disabled = true;
}

fromInput.addEventListener("input", enableSendBtn);
toInput.addEventListener("input", enableSendBtn);
sendBtn.addEventListener("click", closeEmail)
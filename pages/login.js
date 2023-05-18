

function init() {

    experimentBtn = document.getElementById("image")
    experimentBtn.src = "assests/imgs/start-button.png";
    overlay.classList.toggle("show");

    userData = {
        username: 'user123',
        password: 12345,
        email: 'user123@gmail.com',
        preferredLanguage: 'Dutch',
        loggedIn: false
    };

    loginPopup = document.querySelector(".login-popup");
    userNameInput = document.getElementById("username");
    passwordInput = document.getElementById("password");
    logInButton = document.getElementById("signInBtn");
    userNameInput.addEventListener("input", enableSignIn);
    passwordInput.addEventListener("input", enableSignIn);
    logInButton.addEventListener("click", closePopupWithSignIn);


}

function closePopupWithoutSignIn() {
    loginPopup.classList.toggle('hide');
    overlay.classList.toggle("show");
}

function startExperiment() {
    if (experimentBtn.classList.contains("pause")) {
        participantData.startTime = null;
        experimentBtn.src = "assests/imgs/start-button.png";
        experimentBtn.classList.remove("pause");
    } else {
        clickedOnButton();
        experimentBtn.src = "assests/imgs/pause.png";
        experimentBtn.classList.add("pause");
    }
}

const enableSignIn = () => {
    if ((userNameInput.value == userData.username) && (passwordInput.value == userData.password)) {
            logInButton.disabled = false;
    } else {
        logInButton.disabled = true;
    }  
}

const closePopupWithSignIn = () => {
    userData.loggedIn = true;
    closePopupWithoutSignIn();
}


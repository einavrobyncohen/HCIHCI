'use strict'

var participantData = {
    startTime: null, 
    endTime: null,
    totalTimeSeconds: null,
    loggedIn: null
};

//Time tracker starts when clicking on the enabled "start analyze" button// 

function clickedOnButton() {
    participantData.startTime = new Date();
}

function taskCompleted() {
    participantData.endTime = new Date();
    participantData.totalTimeSeconds = (participantData.endTime - participantData.startTime) / 1000;
    participantData.loggedIn = userData.loggedIn;
    console.log(`participant finished task`, participantData);
}
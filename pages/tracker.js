'use strict'

var participantData = {
    startTime: null, 
    endTime: null,
    totalTimeSeconds: null,
    taskType: null
};

//Time tracker starts when clicking on the enabled "start analyze" button// 

function clickedOnButton() {
    participantData.startTime = new Date();
}

function taskCompleted(task) {
    participantData.endTime = new Date();
    participantData.totalTimeSeconds = (participantData.endTime - participantData.startTime) / 1000;
    participantData.taskType = task;
    console.log(`participant finished task:${task}`, participantData);
}
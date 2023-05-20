'use strict'

var switchButton = document.querySelector('.switch-button');
var switchBtnRight = document.querySelector('.switch-button-case.right');
var switchBtnLeft = document.querySelector('.switch-button-case.left');
var activeSwitch = document.querySelector('.active');

let contractFile;

const stepIndicator = document.querySelector('.step-indicator'),
conractViewArea = document.querySelector('.contract-analyzer-page'),
dropArea = document.querySelector(".drag-area"), 
filesButton = dropArea.querySelector(".browse-files"),
file_input = dropArea.querySelector("input"),
textArea = document.querySelector(".text-input"),
analysisButtonArea = document.querySelector('.button-wrapper'),
analysisButton = analysisButtonArea.querySelector('button');

switchBtnLeft.addEventListener('click', function(){
	switchToFileUpload();
    textArea.querySelector("textarea").value = '';
}, false);

switchBtnRight.addEventListener('click', function(){
	switchToTextInput();
}, false);

// TEXT INPUT //
textArea.addEventListener("input", () => {
    if ((textArea.querySelector("textarea").value).length >= 5) {
        textArea.querySelector("textarea").classList.add('success');
        contractInputSuccess();
    } else {
        textArea.querySelector("textarea").classList.remove('success')
        contractInputNoSuccess();
    }
})

function switchToFileUpload(){
	switchBtnRight.classList.remove('active-case');
	switchBtnLeft.classList.add('active-case');
	activeSwitch.style.left = '0%';
    dropArea.style.display = '';
    textArea.style.display = 'none';
}

function switchToTextInput(){
	switchBtnRight.classList.add('active-case');
	switchBtnLeft.classList.remove('active-case');
	activeSwitch.style.left = '50%';
    dropArea.style.display = 'none';
    textArea.style.display = '';
}

// FILE UPLOAD // 
// SOURCE VIDEO USED FOR SOME OF THE IMPLEMENTATION OF THE DRAG AND DROP FEATURE: https://www.youtube.com/watch?v=0HCiH4Tk04I //

filesButton.onclick = () => {
    file_input.click();
}

file_input.addEventListener("change", function(){
    contractFile = this.files[0]
    checkUpload();
});

// DRAG AND DROP //

// user dragges a contract over the area
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault()
    dropArea.classList.add("active");
});

// user dragges a contract outside the area
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
});

// user drops a contract on the area
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    contractFile = event.dataTransfer.files[0];
    checkUpload();
});

function checkUpload(){
    let contractFileType = contractFile.type
    if(contractFileType === "application/pdf") {
        let fileReader = new FileReader();
        fileReader.onload = () => {}
        fileReader.readAsDataURL(contractFile)
        dropArea.classList.remove("active");
        dropArea.classList.add("success");
        contractInputSuccess();
        dropArea.innerHTML = "<div class='upload-success'>"+
        "<img src='assests/imgs/upload-success.png' alt='contract uploaded successfully'>"+
        "<span class='success-text'>The contract was uploaded successfully!</span>"+
        "</div>"
    } else {
        alert("not a pdf file!")
    }
};


function contractInputSuccess(){
    analysisButton.disabled = false;
    stepIndicator.innerHTML = "<h2 class='step-title'>Step 2: Start the Analysis Process</h2>" +
    "<p class='step-description'>Click the " + '"start analysis"'+ " button to begin the analysis process. " + "This may take a few seconds.";
}

function contractInputNoSuccess() {
    analysisButton.disabled = true;
    stepIndicator.innerHTML = `<h2 class="step-title">Step 1: Contract Input Options</h2><p class="step-description">Submit the contract for analysis by importing it using drag and drop,
        by file upload, or by copying and pasting the contract's content into the text entry box.</p>`;
    textArea.querySelector("textarea").classList.remove('success');
}

function toAnalyzeContract(){
    // intialize contract viewer // 
    initializeView('./contract.pdf');
    switchButton.style.display = 'none';
    document.querySelector('.data-input').style.display = 'none'; 
    stepIndicator.innerHTML = "<h2 class='step-title'>Step 3: Your Analyzed Contract is Ready!</h2>"+
    "<p class='step-description third'>" + 
    "Legal clauses in <span>red</span> indicate problematic legal clauses. <br>" +
    "Legal clauses in <span>orange</span> indicted moderately problematic legal clauses. <br>"+
    "Legal clauses in <span>green</span> indicate unproblematic legal clauses.</p>"
    conractViewArea.style.display = '';
    if (userData.loggedIn) {
        document.getElementById("translate").innerHTML = "Translate to my Language";
    } else {
        document.getElementById("translate").innerHTML = "Translate";
    }
}
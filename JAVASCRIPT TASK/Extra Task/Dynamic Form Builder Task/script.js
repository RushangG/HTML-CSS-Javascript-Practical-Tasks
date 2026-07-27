
// variable declaration
const form = document.getElementById("dynamic-form");
const addButton = document.getElementById("add-button");
const inputBox = document.getElementById("fields-container");
const messageDiv = document.getElementById("message-div");
const submitButton = document.getElementById("submit-button");

const addToForm = document.getElementById("add-to-form");


const formBuilderBox = document.getElementById("form-builder");
const inputForm = document.getElementById("input-form");
const inputFieldForm = document.getElementById("input-field");

const inputType = document.getElementById("input-type");


let i = 0;
let inputNumber = 0;

//submit dynamic form data.
function submitDynamicForm() {


    const formData = new FormData(form); // create a form data object of dynamic form
    console.log("Form Data:", formData);
    const data = {};
    //conver form object to json object
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    console.log("Form Data:", data);
    form.reset(); // reset the form after submission

    localStorage.setItem("formData", JSON.stringify(data));
    console.log("Form Data:", data);



    confirm("Form Submitted Successfully");
}


// 1) get total number of input using prompt 
function getNumberOfInput() {

    inputBox.innerHTML = "";
    i = 0;
    formBuilderBox.style.display = "none";
    inputForm.style.display = "none";


    inputNumber = prompt("Enter total number of Fields In form : ", "3");

    showFormBuilder(inputNumber);

    console.log(inputNumber);


}


// 2) show Builder form.
function showFormBuilder(inputNumber) {

    if (inputNumber <= 0) {
        alert("Enter positive number");
        return;
    }



    i++;
    if (i > inputNumber) {
        formBuilderBox.style.display = "none";

    }
    else {
        formBuilderBox.style.display = "inline-block";

        messageDiv.innerHTML = `Enter detail of ${i}/${inputNumber} input field: `;
        messageDiv.style.fontSize = "20px";
        messageDiv.style.fontWeight = "bold";
    }

}

// get input  field details from formbuilder.
function formBuilder() {


    const labelName = document.getElementById("label-name").value;
    let placeholderText = document.getElementById("placeholder-text").value;
    const inputType = document.getElementById("input-type").value;

    if (labelName == '' || inputType == '') {

        return;
    }

    if (placeholderText == '') {
        placeholderText = `Enter ${labelName}`;
    }

    inputForm.style.display = "inline-block";

    console.log(labelName, placeholderText, inputType);

    // type base input field creation.
    createInputFields(labelName, placeholderText, inputType);

    document.getElementById("label-name").value = "";
    document.getElementById("placeholder-text").value = "";
    document.getElementById("input-type").value = "text";
}




// switch case base on type.
function createInputFields(labelName, placeholderText, inputType) {


    switch (inputType) {

        case "text":
        case "number":
        case "password":
        case "color":
        case "date":
        case "datetime-local":
        case "email":
        case "month":
        case "time":
        case "url":
        case "week":
            console.log(`case : ${inputType}`);
            newInputFields(labelName, placeholderText, inputType);
            break;
        case "textarea":
            console.log("text area case");
            createTextArea(labelName, placeholderText, inputType);
            break;
        case "checkbox":
            console.log("checkbox case");
            checkBoxInput(labelName, placeholderText, inputType);
            break;
        case "radio":
            console.log("radio case");
            radioInput(labelName, placeholderText, inputType);
            break;
        default:
            console.log("no match");
            break;
    }
}


// crete input field based on type.
function newInputFields(labelName, placeholderText, inputType) {


    let inputlabel = document.createElement("label");
    inputlabel.setAttribute("for", `${labelName}`);
    inputlabel.textContent = ` ${labelName} `;

    let inputText = document.createElement("input");
    inputText.setAttribute("type", `${inputType}`);
    inputText.setAttribute("name", `${labelName}`);
    inputText.setAttribute("placeholder", ` ${placeholderText} `);
    inputText.setAttribute("required", "required");

    inputBox.appendChild(document.createElement("br"));

    inputBox.appendChild(inputlabel);
    inputBox.appendChild(inputText);


    inputBox.appendChild(document.createElement("br"));

    showFormBuilder(inputNumber);

}

// create text area field.
function createTextArea(labelName, placeholderText, inputType) {
    let inputlabel = document.createElement("label");
    inputlabel.setAttribute("for", `${labelName}`);
    inputlabel.textContent = ` ${labelName} `;

    let inputText = document.createElement("textarea");
    inputText.setAttribute("name", `${labelName}`);
    inputText.setAttribute("placeholder", ` ${placeholderText} `);
    inputText.setAttribute("required", "required");


    inputBox.appendChild(document.createElement("br"));
    inputBox.appendChild(inputlabel);
    inputBox.appendChild(document.createElement("br"));

    inputBox.appendChild(inputText);
    inputBox.appendChild(document.createElement("br"));

    showFormBuilder(inputNumber);
}



// option get from prompt for checkbox and radio input.
function optionSelected() {

    let optionNumber = prompt("Enter number of options you want to Build", "2");

    if (optionNumber <= 0) {
        alert("Enter positive number");
        optionSelected();
    }

    let options = [];
    for (let i = 0; i < optionNumber; i++) {
        let option = prompt(`Enter option ${i + 1} label`, `Option ${i + 1}`);

        if (option == '') {
            alert("Enter valid option");
            i--;
            continue;
        }
        options.push(option);
    }


    return options;

}


function checkBoxInput(labelName, placeholderText, inputType) {

    // get options using prompt input.
    let options = optionSelected();

    // main label.
    inputBox.appendChild(document.createElement("br"));
    let inputlabel = document.createElement("label");
    inputlabel.setAttribute("for", `${labelName}`);
    inputlabel.textContent = ` ${labelName} `;

    inputBox.appendChild(inputlabel);

    for (let i = 0; i < options.length; i++) {
        let checkBoxText = document.createElement("input");
        checkBoxText.setAttribute("type", `checkbox`);
        checkBoxText.setAttribute("name", `${options[i]}`);
        checkBoxText.setAttribute("value", `${options[i]}`);

        let checkBoxLabel = document.createElement("label");
        checkBoxLabel.setAttribute("for", `${options[i]}`);
        checkBoxLabel.textContent = ` ${options[i]} `;


        inputBox.appendChild(checkBoxText);
        inputBox.appendChild(checkBoxLabel);
    }
    inputBox.appendChild(document.createElement("br"));

    showFormBuilder(inputNumber);
}


function radioInput(labelName, placeholderText, inputType) {
    let options = optionSelected();
    inputBox.appendChild(document.createElement("br"));

    // main label for radio input. 
    let inputlabel = document.createElement("label");
    inputlabel.setAttribute("for", `${labelName}`);
    inputlabel.textContent = ` ${labelName} `;

    inputBox.appendChild(inputlabel);

    for (let i = 0; i < options.length; i++) {
        let radioText = document.createElement("input");
        radioText.setAttribute("type", `radio`);
        radioText.setAttribute("name", `${labelName}`);
        radioText.setAttribute("value", `${options[i]}`);

        let radioLabel = document.createElement("label");
        radioLabel.setAttribute("for", `${options[i]}`);
        radioLabel.textContent = ` ${options[i]} `;

        inputBox.appendChild(radioText);
        inputBox.appendChild(radioLabel);
    }
    inputBox.appendChild(document.createElement("br"));

    showFormBuilder(inputNumber);
}


// event listener to get number of input fields.
addButton.addEventListener("click", getNumberOfInput);

//event listener to submit dynamic form data.
form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitDynamicForm();

})

//event click on form builder submit button.
inputFieldForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formBuilder();
})


// ask user before leaving the page.
window.addEventListener("beforeunload", function (e) {

    e.preventDefault();

});
// TEAM TREEHOUSE FULL STACK TECH DEGREE PROJECT 3
// ERIN RAMOS

// focus on the name field upon loading
document.getElementById("name").focus();

// job role section
const otherJobRole = document.getElementById("other-job-role");
const jobRole = document.getElementById("title");

// default state
otherJobRole.style.display = "none";

// make the other job role box visible if "other" is selected
jobRole.addEventListener("change", () => {
    if (jobRole.value === "other") {
        otherJobRole.style.display = "block";
    } else {
        otherJobRole.style.display = "none";
    }
});

// t shirt info section
const colorSelect = document.getElementById("color");
const colorDesign = document.getElementById("design");

// default state
colorSelect.disabled = true;

// practice dynamic select menus - team treehouse practice
colorDesign.addEventListener("change", () => {
    colorSelect.disabled = false;

    const colorOptions = document.querySelectorAll("option[data-theme]");

    // only display the color options that correspond to the chosen design 
    for (let i = 0; i < colorOptions.length; i++) {
        if (colorDesign.value !== colorOptions[i].getAttribute("data-theme")) {
            colorOptions[i].hidden = true;
            colorOptions[i].disabled = true;
        } else {
            colorOptions[i].hidden = false;
            colorOptions[i].disabled = false;
        }
    }
});


// activities section
const activities = document.querySelector("#activities");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const activitiesCost = document.getElementById("activities-cost");
const activityCost = document.getElementsByClassName("activity-cost");

// set initial total cost
let totalCost = 0;

activities.addEventListener("change", (e) => {

    // get the cost of each activitiy
    let cost = e.target.getAttribute("data-cost");

    // change total cost as activities are checked / unchecked 
    if (e.target.checked) {
        totalCost += parseInt(cost);
    } else if (!e.target.checked) {
        totalCost -= parseInt(cost);
    }
    // display final total cost
    activitiesCost.innerText = `Total: $${totalCost}`;

    return totalCost;
});

// activities accessibility - Focus the current activity for better visibility
for (let i = 0; i < checkboxes.length; i++) {
    //3.
    checkboxes[i].addEventListener("focus", (e) => {
        e.target.parentElement.classList.add('focus');
    });
    checkboxes[i].addEventListener("blur", (e) => {
        e.target.parentElement.classList.remove('focus');
    });
}


// payment info section
const paymentSelect = document.getElementById("payment")
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

// default state
creditCard.hidden = false;
paypal.hidden = true;
bitcoin.hidden = true;
document.querySelector("#payment").value = "credit-card";

// check the payment type and display only the relevant information
paymentSelect.addEventListener("change", () => {

    const paymentOption = paymentSelect.value;

    if (paymentOption === "credit-card") {
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    } else if (paymentOption === "paypal") {
        paypal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
    } else if (paymentOption === "bitcoin") {
        bitcoin.hidden = false;
        paypal.hidden = true;
        creditCard.hidden = true;
    }

});

// form validation section
const form = document.querySelector("form");
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const ccInput = document.querySelector('#cc-num');
const zipInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');
const activitiesInput = document.querySelector("#activities");
const activitiesHint = document.querySelector("#activities-hint");

// validation functions
const isValidName = () => /^[A-Za-z]{1,}[A-Za-z\s]*$/.test(nameInput.value);
const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
const isValidCc = () => /^\d{13,16}$/.test(ccInput.value);
const isValidZip = () => /^\d{5}$/.test(zipInput.value);
const isValidCvv = () => /^\d{3}$/.test(cvvInput.value);

// on submit...
form.addEventListener('submit', (e) => {

    // check if the input is valid - if true, no display. if false, display hint and error border
    const validator = (inputElement, validationFunction) => {
        if (validationFunction) {
            inputElement.closest('label').className = 'valid';
            inputElement.nextElementSibling.style.display = 'none';
        } else {
            e.preventDefault();
            inputElement.closest('label').className = "not-valid";
            inputElement.nextElementSibling.style.display = 'block';
        }
    };

    validator(nameInput, isValidName());
    validator(emailInput, isValidEmail());

    // check cc details only if credit card is the selected payment method
    if (paymentSelect.value === "credit-card") {
        validator(ccInput, isValidCc());
        validator(zipInput, isValidZip());
        validator(cvvInput, isValidCvv());
    }

    // if no activities have been selected, display an error 
    if (totalCost === 0) {
        e.preventDefault();
        activitiesInput.className = "activities not-valid";
        activitiesHint.style.display = 'block';
    } else {
        activitiesInput.className = 'activities valid';
        activitiesHint.style.display = 'none';
    }

});
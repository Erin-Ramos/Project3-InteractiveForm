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
const activities = document.getElementById("activities-box");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const activitiesCost = document.getElementById("activities-cost");
const activityCost = document.getElementsByClassName("activity-cost");

let totalCost = 0;

activities.addEventListener("change", (e) => {

    let cost = e.target.getAttribute("data-cost");

    if (e.target.checked) {
        totalCost += parseInt(cost);
    } else if (!e.target.checked) {
        totalCost -= parseInt(cost);
    }
    activitiesCost.innerText = `Total: $${totalCost}`;

});


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

// form validation
/* 
this is mostly copied and pasted from the form validation workspace that I did
with some adjustments made to match the id's and names in this project
*/
const form = document.getElementById("form-hint");
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

const isValidName = () => /^[a-zA-Z]+$/.test(nameInput.value);
const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);

form.addEventListener('submit', (e) => {

    const validator = (inputElement, validationFunction) => {
        if (validationFunction) {
            inputElement.closest('label').className = 'valid';
            inputElement.nextElementSibling.style.display = 'none';
        } else {
            e.preventDefault();
            inputElement.closest('label').className = 'hint';
            inputElement.nextElementSibling.style.display = 'block';
        }
    };

    validator(nameInput, isValidName());
    validator(emailInput, isValidEmail());

});

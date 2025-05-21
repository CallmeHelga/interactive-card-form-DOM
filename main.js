const cardholderName = document.getElementById('cardholder-name')
const nameOnCard = document.querySelector('.card-name')
const nameErrorMessage = document.getElementById('cardholder-error')

const cardNumber = document.getElementById('card-number')
const numberOnCard = document.querySelector('.card-number')
const numberErrorMessage = document.getElementById('card-number-error')

const cardMonth = document.getElementById('month')
const cardYear = document.getElementById('year')
const expirationOnCard = document.querySelector('.card-expiration')
const cardDateError = document.getElementById('date-error')

const cardCvc = document.getElementById('cvc-code')
const cvcOnCard = document.querySelector('.card-cvc')
const cardCvcError = document.getElementById('cvc-error')


cardholderName.addEventListener("input", function () {
    const nameValue = cardholderName.value
    if (nameValue === "") {
        cardholderName.classList.add('error')
        nameErrorMessage.textContent = "Can't be blank";
        nameOnCard.textContent = "JANE APPLESEED";
    } else {
        cardholderName.classList.remove('error');
        nameErrorMessage.textContent = "";
        nameOnCard.textContent = nameValue;
    }
});

cardNumber.addEventListener('input', function () {
    const digitsOnly = cardNumber.value.replace(/\s/g, "");
    const formatted = digitsOnly.match(/.{1,4}/g)?.join(" ") || "";
    cardNumber.value = formatted;

    if (digitsOnly === "") {
        cardNumber.classList.add('error')
        numberErrorMessage.textContent = "Can't be blank";
        numberOnCard.textContent = "0000 0000 0000 0000"
    } else if (digitsOnly.length > 16) {
        cardNumber.classList.add('error')
        numberErrorMessage.textContent = "Wrong format, 16 digits only";
        numberOnCard.textContent = "0000 0000 0000 0000"
    } else if (!/^\d+$/.test(digitsOnly)) {
        cardNumber.classList.add('error')
        numberErrorMessage.textContent = "Wrong format, numbers only";
        numberOnCard.textContent = "0000 0000 0000 0000"
    } else {
        cardNumber.classList.remove('error');
        numberErrorMessage.textContent = "";
        numberOnCard.textContent = formatted;
    }
})

function updateExpiration() {
    const mm = cardMonth.value.trim();
    const yy = cardYear.value.trim();


    let hasError = false;

    if (mm === "") {
        cardMonth.classList.add('error');
        cardDateError.textContent = "Can't be blank";
        hasError = true;
    } else if (isNaN(mm) || parseInt(mm) < 1 || parseInt(mm) > 12) {
        cardMonth.classList.add('error');
        cardDateError.textContent = "Invalid value";
        hasError = true;
    } else {
        cardMonth.classList.remove('error');
    }

    if (yy === "") {
        cardYear.classList.add('error');
        cardDateError.textContent = "Can't be blank";
        hasError = true;
    } else if (isNaN(yy) || yy.length > 2) {
        cardYear.classList.add('error');
        cardDateError.textContent = "Invalid value";
        hasError = true;
    } else {
        cardYear.classList.remove('error');
    }

    if (!hasError) {
        cardDateError.textContent = "";
        expirationOnCard.textContent = `${mm}/${yy}`;
    }
}

cardMonth.addEventListener('input', updateExpiration);
cardYear.addEventListener('input', updateExpiration)

cardCvc.addEventListener('input', function () {
    const cvcValue = cardCvc.value;

    if (cvcValue === "") {
        cardCvc.classList.add('error');
        cardCvcError.textContent = "Can't be blank";
        cvcOnCard.textContent = "000";
    } else if (cvcValue.length !== 3 || !/^\d{3}$/.test(cvcValue)) {
        cardCvc.classList.add('error');
        cardCvcError.textContent = "Numbers only";
        cvcOnCard.textContent = "000";
    } else {
        cardCvc.classList.remove('error');
        cardCvcError.textContent = "";
        cvcOnCard.textContent = cvcValue;
    }
})

// Thank you page //

const formSection = document.querySelector('.form-section')
const thankYouSection = document.querySelector('.thank_you')
const confirmButton = document.getElementById('confirm-btn')
const continueButton = document.getElementById('continue-btn')

confirmButton.addEventListener('click', function (e) {
    e.preventDefault();

    cardholderName.dispatchEvent(new Event('input'));
    cardNumber.dispatchEvent(new Event('input'));
    cardMonth.dispatchEvent(new Event('input'));
    cardYear.dispatchEvent(new Event('input'));
    cardCvc.dispatchEvent(new Event('input'));


    const errors = document.querySelectorAll('.error')
    const emptyFields = [...document.querySelectorAll('input')].some(input => input.value.trim() === '');

    if (errors.length === 0 && !emptyFields) {
        formSection.classList.add('hidden');
        thankYouSection.classList.remove('hidden');
    }
})

continueButton.addEventListener('click', function () {
    formSection.classList.remove('hidden');
    thankYouSection.classList.add('hidden');

    document.querySelectorAll('input').forEach(input => {
        input.value = "";
        input.classList.remove('error');
    });

    document.querySelectorAll('.error-message').forEach(msg => {
        msg.textContent = "";
    })

    nameOnCard.textContent = "JANE APPLESEED";
    numberOnCard.textContent = "0000 0000 0000 0000";
    cvcOnCard.textContent = "000";
    expirationOnCard.textContent = '00/00'
})

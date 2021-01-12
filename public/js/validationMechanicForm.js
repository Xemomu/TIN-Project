
function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const birthDateInput = document.getElementById('birthDate');
    const salaryInput = document.getElementById('salary');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorBirthDate = document.getElementById('errorBirthDate');
    const errorSalary = document.getElementById('errorSalary');
    const errorSummary = document.getElementById('errorSummary');

    resetErrors([firstNameInput, lastNameInput, birthDateInput, salaryInput], [errorFirstName, errorLastName, errorBirthDate, errorSalary], errorSummary);

    let valid = true;

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');


    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(birthDateInput.value)) {
        valid = false;
        birthDateInput.classList.add("error-input");
        errorBirthDate.innerText = "Pole jest wymagane";
    } else if (checkDateIfAfter(birthDateInput.value, nowString)) {
        valid = false;
        birthDateInput.classList.add("error-input");
        errorBirthDate.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "Pole jest wymagane";
    } else if (!checkNumber(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(salaryInput.value, 2000, 1000000)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "Pole powinno być liczbą z zakresu (2000 - 1000000)";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}


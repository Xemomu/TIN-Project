
function validateForm() {
    const nameInput = document.getElementById('name');
    const whereInput = document.getElementById('university');

    const errorName = document.getElementById('errorName');
    const errorWhere = document.getElementById('errorWhere');
    const errorSummary = document.getElementById('errorSummary');

    resetErrors([nameInput, whereInput], [errorName, errorWhere], errorSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 80)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(whereInput.value)) {
        valid = false;
        whereInput.classList.add("error-input");
        errorWhere.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(whereInput.value, 2, 60)) {
        valid = false;
        whereInput.classList.add("error-input");
        errorWhere.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

function validateForm() {
    console.log("validating mechSpec form");

    const mechanicInput = document.getElementById('mechId');
    const specInput = document.getElementById('spec');
    const dateFromInput = document.getElementById('date');
    const lvlInput = document.getElementById('specLvl');

    const errorMechanic = document.getElementById('errorMechanic');
    const errorSpec = document.getElementById('errorSpec');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorLvl = document.getElementById('errorLvl');
    const errorSummary = document.getElementById('errorSummary');

    resetErrors([mechanicInput, specInput, dateFromInput, lvlInput], [errorMechanic, errorSpec, errorDateFrom, errorLvl], errorSummary);

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


    if (!checkRequired(mechanicInput.value)) {
        valid = false;
        mechanicInput.classList.add("error-input");
        errorMechanic.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(specInput.value)) {
        valid = false;
        specInput.classList.add("error-input");
        errorSpec.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateFromInput.value)) {
        valid = false;
        dateFromInput.add("error-input");
        errorDateFrom.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateFromInput.value, nowString)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(lvlInput.value)) {
        valid = false;
        lvlInput.classList.add("error-input");
        errorLvl.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}


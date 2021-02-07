const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.pattern.invert.base":
                err.message = 'Pole zawiera niedozwolone znaki!';
                break;
            case "number.disallow":
                err.message = 'Pole zawiera niedozwolone znaki!';
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaków`;
                break;
            case "number.min":
                err.message = `Wartość powinna wynosić co najmniej ${err.local.limit} zł`;
                break;
            case "number.max":
                err.message = `Wartość powinna wynosić co najwyżej ${err.local.limit} zł`;
                break;
            case "date.max":
                err.message = `Data nie może być z przyszłości`;
                break;
            case "date.base":
                err.message = `Pole jest wymagane`;
                break;
            case "number.base":
                err.message = `Pole jest wymagane`;
                break;
                // err.message = `Pole powinno być liczbą z zakresu (2000 - 1000000)`;
            default:
                break;
        }
    });
    return errors;
}

const specialCharacters = new RegExp(/^.*[@#?`!';<>{}$].*$/s);
const now = Date.now();

const mechSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
        .error(errMessages),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .regex(specialCharacters, { invert: true })
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .regex(specialCharacters, { invert: true })
        .required()
        .error(errMessages),
    birthDate: Joi.date()
        .required()
        .max(now)
        .error(errMessages),
    salary: Joi.number()
        .min(2000)
        .max(1000000)
        .disallow(new RegExp(/^.*[@#?`!';<>{}$].*$/s))
        .required()
        .error(errMessages),
});


module.exports = mechSchema;
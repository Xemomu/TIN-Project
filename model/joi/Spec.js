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
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaków`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const specialCharacters = new RegExp(/^.*[@#?`!';<>{}$].*$/s);

const specSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
        .error(errMessages),
    name: Joi.string()
        .min(2)
        .max(80)
        .regex(specialCharacters, { invert: true })
        .required()
        .error(errMessages),
    university: Joi.string()
        .min(2)
        .max(80)
        .regex(specialCharacters, { invert: true })
        .required()
        .error(errMessages)
});


module.exports = specSchema;
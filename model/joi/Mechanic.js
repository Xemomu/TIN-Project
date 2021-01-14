const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
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
            default:
                break;
        }
    });
    return errors;
}

const now = Date.now();

const mechSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
        .error(errMessages),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    birthDate: Joi.date()
        .required()
        .max(now)
        .error(errMessages),
    salary: Joi.number()
        .min(2000)
        .max(1000000)
        .required()
        .error(errMessages),
});


module.exports = mechSchema;
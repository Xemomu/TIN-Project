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
                err.message = `Wybierz spośród podanych poziomów ${err.local.limit}`;
                break;
            case "number.max":
                err.message = `Wybierz spośród podanych poziomów ${err.local.limit}`;
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
            case "string.base":
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
    mechId: Joi.string()
        .required()
        .error(errMessages),
    specId: Joi.string()
        .required()
        .error(errMessages),
    date: Joi.date()
        .required()
        .max(now)
        .error(errMessages),
    specLvl: Joi.number()
        .min(1)
        .max(3)
        .required()
        .error(errMessages),
});


module.exports = mechSchema;
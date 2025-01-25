import Ajv from 'ajv';
import createHttpError from 'http-errors';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, $data: true, coerceTypes: true });
addFormats(ajv)

export const validateSchema = (schema) => {
    const validate = ajv.compile(schema);
    return (req, res, next) => {
        const isValid = validate(req.body);
        if (!isValid) {
            const error = validate.errors.map((err) => `${err.instancePath} ${err.message}`).join(', ');
            return next(createHttpError(400, `Validation error: ${error}`));
        }
        next();
    }
}
export const pickUpdateFields = (body, allowedFields) => {
    return allowedFields.reduce((acc, key) => {
        if (body[key] !== undefined) acc[key] = body[key];
        return acc
    }, {});
}
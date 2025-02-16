export const successResponse = (status, message = null, metadata = null, data = null) => {
    return {
        message,
        status,
        metadata,
        data
    };
};

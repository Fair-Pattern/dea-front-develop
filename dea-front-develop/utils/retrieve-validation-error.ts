export const retrieveErrorMessage = (error: any, fieldName: string | null = null) => {
    if (!fieldName) return error?.response?.message || null;
    let validationError = ((error?.response?.errors || {})[fieldName]) || null;
    return validationError
        ? Array.isArray(validationError)
            ? validationError[0]
            : validationError
        : null;
};
export const hasNullValue = (obj) => {
    for (let key in obj) {
        if (obj[key] === null || obj[key] === '')
            return true;
    }

    return false;
}
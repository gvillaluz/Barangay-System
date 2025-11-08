export const hasNullValues = (obj) => {
    for (var key in obj) {
        if (obj[key] == null || obj[key] === "") 
            return true
    }

    return false
}
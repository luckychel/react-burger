
export const random = <T extends unknown> (arr: T[] | undefined): T | null => {
    if (typeof arr === 'undefined' || (arr && arr.length === 0)) return null
    return (arr as T[])[Math.floor((Math.random()*(arr as T[]).length))];
}

export const shuffle = <T extends unknown> (arr: T[] | undefined, n: number = 0): T[] | null => {
    if (typeof arr === 'undefined' || (arr && arr.length === 0)) return null
    return Array.from(arr as T[]).sort(() => 0.5 - Math.random()).slice(0, n > 0 ? n : Math.floor(Math.random() * ((arr as T[]).length) + 1));
}


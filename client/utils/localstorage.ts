const persistentDataInLocalStorage = (keyLocalStorage: string, data: unknown) => {
    let array = [];
    // Parse the serialized data back into an array of objects
    array = JSON.parse(localStorage.getItem(keyLocalStorage) as string) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    array.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem(keyLocalStorage, JSON.stringify(array));
};

export { persistentDataInLocalStorage };

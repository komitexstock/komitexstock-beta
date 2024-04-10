// server timestamp to milliseconds
const serverTImestampToMilliseconds = (timestamp) => {
    return timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
}

// server timestamp to ISO string
const serverTimestampToISOString = (timestamp) => {
    let totalMilliseconds = timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000;
    let date = new Date(totalMilliseconds);
    return date.toISOString();
}


export const time = { serverTImestampToMilliseconds, serverTimestampToISOString }
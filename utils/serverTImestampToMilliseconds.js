export const serverTImestampToMilliseconds = (timestamp) => {
    return timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
}
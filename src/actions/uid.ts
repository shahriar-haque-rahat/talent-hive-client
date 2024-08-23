export function generateRandomDigits() {
    const bangladeshOffset = 6 * 60 * 60 * 1000;
    const bangladeshTimestamp = Date.now() + bangladeshOffset;

    const timestamp = bangladeshTimestamp.toString().slice(-7);

    const randomDigits = Math.floor(100 + Math.random() * 900).toString();

    return timestamp + randomDigits;
};

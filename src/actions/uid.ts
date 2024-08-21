export function generateRandomDigits() {
    const bangladeshOffset = 6 * 60 * 60 * 1000;
    const bangladeshTimestamp = Date.now() + bangladeshOffset;

    const timestamp = bangladeshTimestamp.toString();

    return timestamp;
};
function generateRandomToken(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
}
const paymentCodeSpan = document.getElementById("payment-code");

paymentCodeSpan.textContent = generateRandomToken(6);
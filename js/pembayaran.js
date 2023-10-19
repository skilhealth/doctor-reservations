function generateRandomToken(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
}

// Get the element with id "payment-code"
const paymentCodeSpan = document.getElementById("payment-code");

// Generate a random 6-character token and set it as the content of the span
paymentCodeSpan.textContent = generateRandomToken(6);
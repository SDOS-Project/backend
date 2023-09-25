"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandomAlphanumericWithLength(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }
    return result;
}
exports.default = generateRandomAlphanumericWithLength;
//# sourceMappingURL=utils.js.map
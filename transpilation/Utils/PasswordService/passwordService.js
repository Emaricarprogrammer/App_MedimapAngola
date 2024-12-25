"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordService {
    static async hashPassword(password) {
        const saltRounds = 12;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    static async PasswordCompare(password, hashedPassword) {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
}
exports.PasswordService = PasswordService;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEncryptPassword = exports.compareByCryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 *
 * @param password user password
 * @returns encrypted password
 */
const generateEncryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
exports.generateEncryptPassword = generateEncryptPassword;
/**
 *
 * @param inputPassword password entered by user
 * @param originalPassword user actual password
 * @returns boolean if password matches or not
 */
const compareByCryptPassword = (originalPassword, inputPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(originalPassword, inputPassword);
});
exports.compareByCryptPassword = compareByCryptPassword;
//# sourceMappingURL=bcrypt-helper.js.map
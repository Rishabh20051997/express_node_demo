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
exports.registerUserValidator = exports.authValidator = void 0;
const express_validator_1 = require("express-validator");
const validators_1 = require("./validators");
const _constant_1 = require("@constant");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const user_model_1 = __importDefault(require("@model/user-model"));
const strings_1 = require("@common/strings");
const response_transmitter_1 = require("@services/response-transmitter");
const loginValidator = [
    (0, express_validator_1.body)('userName').exists().isString().withMessage('User Name is required'),
    (0, express_validator_1.body)('password').exists().isString().withMessage('Password is required'),
];
exports.authValidator = [
    ...loginValidator,
    validators_1.errorValidator
];
exports.registerUserValidator = [
    ...loginValidator,
    (0, express_validator_1.body)('userType').exists().withMessage('User Type is required').isString().isIn(Object.values(_constant_1.USER_TYPES)).withMessage('User Type should be of valid type'),
    validators_1.errorValidator,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // check for duplicate usernames in the db
        const duplicate = yield (0, user_use_cases_1.getUserByUserName)(user_model_1.default, { userName: req.body.userName });
        //Conflict -> User already exists
        if (duplicate) {
            return response_transmitter_1.sendResponse.conflictRequest(res, { message: strings_1.AUTHORIZATION_STRINGS.ALREADY_EXISTS });
        }
        next();
    })
];
//# sourceMappingURL=auth-validators.js.map
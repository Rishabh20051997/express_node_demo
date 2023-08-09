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
exports.registerUserController = void 0;
const bcrypt_helper_1 = require("@helpers/bcrypt-helper");
const user_type_roles_helpers_1 = require("@helpers/user-type-roles-helpers");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const user_model_1 = __importDefault(require("@model/user-model"));
/**
 *
 * @param {userName: string, password: string, userType: IUserTypes } req request from client
 * @param res response instance to be sent
 * @returns register new user using userName & password & responds back
 */
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, userType } = req.body;
    try {
        //encrypt the password
        const hashedPwd = yield (0, bcrypt_helper_1.generateEncryptPassword)(password);
        const userRoles = (0, user_type_roles_helpers_1.getRolesOnBasisOfUserType)(userType);
        //create and store the new user
        const result = yield (0, user_use_cases_1.createUser)(user_model_1.default, {
            userName,
            hashedPwd,
            userRoles
        });
        response_transmitter_1.sendResponse.createdRequest(res, {
            message: `New user ${userName} created! Please Login to continue.`,
            data: result
        });
    }
    catch (err) {
        response_transmitter_1.sendResponse.serverError(res, { message: err.message });
    }
});
exports.registerUserController = registerUserController;
//# sourceMappingURL=register-controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNewUser = void 0;
const strings_1 = require("@common/strings");
const bcrypt_helper_1 = require("@helpers/bcrypt-helper");
const user_type_roles_helpers_1 = require("@helpers/user-type-roles-helpers");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const { INVALID_PARAMS, ALREADY_EXISTS } = strings_1.AUTHORIZATION_STRINGS;
/**
 *
 * @param {userName: string, password: string, userType: IUserTypes } req request from client
 * @param res response instance to be sent
 * @returns register new user using userName & password & responds back
 */
const handleNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, userType } = req.body;
    // validating params failed
    if (!userName || !password) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: INVALID_PARAMS
        });
    }
    // check for duplicate usernames in the db
    const duplicate = yield (0, user_use_cases_1.getUserByUserName)(userName);
    //Conflict -> User already exists
    if (duplicate) {
        return (0, response_transmitter_1.sendConflictsRequestResponse)(res, { message: ALREADY_EXISTS });
    }
    try {
        //encrypt the password
        const hashedPwd = (0, bcrypt_helper_1.generateEncryptPassword)(password);
        const userRoles = (0, user_type_roles_helpers_1.getRolesOnBasisOfUserType)(userType);
        //create and store the new user
        const result = yield (0, user_use_cases_1.createNewUserEntry)({
            userName,
            hashedPwd,
            userRoles
        });
        (0, response_transmitter_1.sendNewItemCreatedRequestResponse)(res, {
            message: `New user ${userName} created! Please Login to continue.`,
            data: result
        });
    }
    catch (err) {
        (0, response_transmitter_1.sendServerErrorRequestResponse)(res, { message: err.message });
    }
});
exports.handleNewUser = handleNewUser;
//# sourceMappingURL=register-controller.js.map
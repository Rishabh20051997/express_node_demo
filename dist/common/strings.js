"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_MISSING = exports.EMPLOYEE_LIST_RESPONSE_LABEL = exports.TASK_LIST_RESPONSE_LABEL = exports.SOMETHING_WENT_WRONG_MESSAGE = exports.LOGOUT_STRINGS = exports.CORS_ERROR_MESSAGE = exports.AUTHORIZATION_STRINGS = exports.USER_LIST_RESPONSE_LABEL = exports.SUCCESS_RESPONSE_MESSAGE = void 0;
const AUTHORIZATION_STRINGS = {
    INCORRECT_CREDENTIALS: 'User Name or Password is incorrect',
    INVALID_PARAMS: 'Username and password are required.',
    ALREADY_EXISTS: 'User Already Exists. Please Login to continue'
};
exports.AUTHORIZATION_STRINGS = AUTHORIZATION_STRINGS;
const LOGOUT_STRINGS = {
    TOKEN_MISSING: 'Token Missing',
    NO_USER_FOUND: 'Log out'
};
exports.LOGOUT_STRINGS = LOGOUT_STRINGS;
const USER_LIST_RESPONSE_LABEL = {
    NO_USER: 'No users found',
    ID_REQUIRED: 'User ID required',
    USER_NOT_FOUND: `User not found`
};
exports.USER_LIST_RESPONSE_LABEL = USER_LIST_RESPONSE_LABEL;
const TASK_LIST_RESPONSE_LABEL = {
    NO_TASK: 'No task found',
    TASK_REQUIRED: 'Task is required'
};
exports.TASK_LIST_RESPONSE_LABEL = TASK_LIST_RESPONSE_LABEL;
const EMPLOYEE_LIST_RESPONSE_LABEL = {
    NO_EMPLOYEES: 'No employees found.',
    PARAMS_REQUIRED: 'First and last names are required',
    ID_MISSING: 'ID parameter is required.',
    NO_EMPLOYEE_FOUND: 'No employee Found'
};
exports.EMPLOYEE_LIST_RESPONSE_LABEL = EMPLOYEE_LIST_RESPONSE_LABEL;
const SUCCESS_RESPONSE_MESSAGE = 'Success';
exports.SUCCESS_RESPONSE_MESSAGE = SUCCESS_RESPONSE_MESSAGE;
const SOMETHING_WENT_WRONG_MESSAGE = 'Something Went Wrong';
exports.SOMETHING_WENT_WRONG_MESSAGE = SOMETHING_WENT_WRONG_MESSAGE;
const CORS_ERROR_MESSAGE = 'Not allowed by CORS';
exports.CORS_ERROR_MESSAGE = CORS_ERROR_MESSAGE;
const ACCESS_MISSING = 'Access Missing';
exports.ACCESS_MISSING = ACCESS_MISSING;
//# sourceMappingURL=strings.js.map
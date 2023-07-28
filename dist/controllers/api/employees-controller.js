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
exports.getEmployee = exports.deleteEmployee = exports.updateEmployee = exports.createNewEmployee = exports.getAllEmployees = void 0;
const strings_1 = require("@common/strings");
const employee_use_cases_1 = require("@use-cases/employee-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
/**
 *
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all employees list
 */
const getAllEmployees = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield (0, employee_use_cases_1.getAllEmployeesList)();
    // if employee list is empty
    if (!employees.length) {
        return (0, response_transmitter_1.sendSuccessRequestForNoDataResponse)(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEES,
            data: []
        });
    }
    (0, response_transmitter_1.sendSuccessRequestResponse)(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: employees
    });
});
exports.getAllEmployees = getAllEmployees;
/**
 *
 * @param { firstname: string , lastname : string} req request from client
 * @param res response instance to be sent
 * @returns new employee created response
 */
const createNewEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const firstName = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.firstname;
    const lastName = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.lastname;
    // if params are not proper -> return
    if (!firstName || !lastName) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.PARAMS_REQUIRED
        });
    }
    try {
        const result = yield (0, employee_use_cases_1.createNewEmployeeEntry)({
            firstName,
            lastName
        });
        (0, response_transmitter_1.sendNewItemCreatedRequestResponse)(res, {
            message: strings_1.SUCCESS_RESPONSE_MESSAGE,
            data: result
        });
    }
    catch (err) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: err === null || err === void 0 ? void 0 : err.toString()
        });
    }
});
exports.createNewEmployee = createNewEmployee;
/**
 *
 * @param { id: string, firstname: string , lastname : string} req request from client
 * @param res response instance to be sent
 * @returns update the existing employee data using its id & sends back response
 */
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const id = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.id;
    const firstName = (_d = req.body) === null || _d === void 0 ? void 0 : _d.firstname;
    const lastName = (_e = req.body) === null || _e === void 0 ? void 0 : _e.lastname;
    // if id param is not there
    if (!id) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        });
    }
    const employee = yield (0, employee_use_cases_1.findEmployeeById)(id);
    // if employee doesn't exists
    if (!employee) {
        return (0, response_transmitter_1.sendSuccessRequestForNoDataResponse)(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        });
    }
    const result = yield (0, employee_use_cases_1.updateEmployeeData)(employee, {
        firstName,
        lastName
    });
    return (0, response_transmitter_1.sendSuccessRequestResponse)(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: result
    });
});
exports.updateEmployee = updateEmployee;
/**
 *
 * @param { id: string} req request from client
 * @param res response instance to be sent
 * @returns delete the existing employee data using its id & sends back response
 */
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const id = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.id;
    // if id param is not there
    if (!id) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        });
    }
    const employee = yield (0, employee_use_cases_1.findEmployeeById)(id);
    // if employee doesn't exists
    if (!employee) {
        return (0, response_transmitter_1.sendSuccessRequestForNoDataResponse)(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        });
    }
    const result = yield (0, employee_use_cases_1.deleteEmployeeEntry)(employee); //{ _id: req.body.id }
    return (0, response_transmitter_1.sendSuccessRequestResponse)(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: result
    });
});
exports.deleteEmployee = deleteEmployee;
/**
 *
 * @param { id: string} req request from client
 * @param res response instance to be sent
 * @returns finds the existing employee data using its id & sends back response
 */
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const id = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.id;
    // if id param is not there
    if (!id) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.ID_MISSING
        });
    }
    const employee = yield (0, employee_use_cases_1.findEmployeeById)(id);
    // if employee doesn't exists
    if (!employee) {
        return (0, response_transmitter_1.sendSuccessRequestForNoDataResponse)(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        });
    }
    return (0, response_transmitter_1.sendSuccessRequestResponse)(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: employee
    });
});
exports.getEmployee = getEmployee;
//# sourceMappingURL=employees-controller.js.map
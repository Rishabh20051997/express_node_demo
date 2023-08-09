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
exports.getEmployeeController = exports.deleteEmployeeController = exports.updateEmployeeController = exports.createEmployeeController = exports.employeeListController = void 0;
const strings_1 = require("@common/strings");
const employee_use_cases_1 = require("@use-cases/employee-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const employee_model_1 = __importDefault(require("@model/employee-model"));
/**
 *
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all employees list
 */
const employeeListController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield (0, employee_use_cases_1.getEmployeesList)(employee_model_1.default);
    response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: employees
    });
});
exports.employeeListController = employeeListController;
/**
 *
 * @param { firstname: string , lastname : string} req request from client
 * @param res response instance to be sent
 * @returns new employee created response
 */
const createEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const firstName = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.firstname;
    const lastName = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.lastname;
    try {
        const result = yield (0, employee_use_cases_1.createEmployee)(employee_model_1.default, {
            firstName,
            lastName
        });
        response_transmitter_1.sendResponse.createdRequest(res, {
            message: strings_1.SUCCESS_RESPONSE_MESSAGE,
            data: result
        });
    }
    catch (err) {
        return response_transmitter_1.sendResponse.serverError(res, {
            message: err === null || err === void 0 ? void 0 : err.toString()
        });
    }
});
exports.createEmployeeController = createEmployeeController;
/**
 *
 * @param { id: string, firstname: string , lastname : string} req request from client
 * @param res response instance to be sent
 * @returns update the existing employee data using its id & sends back response
 */
const updateEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    const firstName = (_d = req.body) === null || _d === void 0 ? void 0 : _d.firstname;
    const lastName = (_e = req.body) === null || _e === void 0 ? void 0 : _e.lastname;
    const employee = yield (0, employee_use_cases_1.getEmployeeById)(employee_model_1.default, { id });
    // if employee doesn't exists
    if (!employee) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        });
    }
    const result = yield (0, employee_use_cases_1.updateEmployee)(employee, {
        firstName,
        lastName
    });
    return response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: result
    });
});
exports.updateEmployeeController = updateEmployeeController;
/**
 *
 * @param { id: string} req request from client
 * @param res response instance to be sent
 * @returns delete the existing employee data using its id & sends back response
 */
const deleteEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const id = (_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.id;
    const employee = yield (0, employee_use_cases_1.getEmployeeById)(employee_model_1.default, { id });
    // if employee doesn't exists
    if (!employee) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        });
    }
    const result = yield (0, employee_use_cases_1.deleteEmployee)(employee); //{ _id: req.body.id }
    return response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: result
    });
});
exports.deleteEmployeeController = deleteEmployeeController;
/**
 *
 * @param { id: string} req request from client
 * @param res response instance to be sent
 * @returns finds the existing employee data using its id & sends back response
 */
const getEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const id = (_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.id;
    const employee = yield (0, employee_use_cases_1.getEmployeeById)(employee_model_1.default, { id });
    // if employee doesn't exists
    if (!employee) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: strings_1.EMPLOYEE_LIST_RESPONSE_LABEL.NO_EMPLOYEE_FOUND,
            data: id
        });
    }
    return response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: employee
    });
});
exports.getEmployeeController = getEmployeeController;
//# sourceMappingURL=employees-controller.js.map
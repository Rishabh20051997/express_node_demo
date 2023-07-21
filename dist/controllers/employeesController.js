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
exports.getEmployee = exports.deleteEmployee = exports.updateEmployee = exports.createNewEmployee = exports.getAllEmployees = void 0;
const constant_1 = require("../common/constant");
const Employee_1 = __importDefault(require("../model/Employee"));
const loggerService_1 = require("../service/loggerService");
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield Employee_1.default.find();
    if (!employees) {
        return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.NO_CONTENT, message: 'No employees found.', data: [] });
    }
    res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.SUCCESS, message: 'Success', data: employees });
});
exports.getAllEmployees = getAllEmployees;
const createNewEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.firstname) || !((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.lastname)) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, message: 'First and last names are required' });
    }
    try {
        const result = yield Employee_1.default.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        res.status(constant_1.STATUS_CODE.CREATED).json({ status: constant_1.STATUS_CODE.CREATED, message: 'Success', data: result });
    }
    catch (err) {
        console.error(err);
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, message: 'Something went wrong', error: err });
    }
});
exports.createNewEmployee = createNewEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    if (!((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.id)) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, message: 'ID parameter is required.' });
    }
    const employee = yield Employee_1.default.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.NO_CONTENT, "message": `No employee matches ID ${req.body.id}.` });
    }
    if ((_d = req.body) === null || _d === void 0 ? void 0 : _d.firstname) {
        employee.firstname = req.body.firstname;
    }
    if ((_e = req.body) === null || _e === void 0 ? void 0 : _e.lastname) {
        employee.lastname = req.body.lastname;
    }
    const result = yield employee.save();
    return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.SUCCESS, "message": `Success`, data: result });
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    if (!((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.id)) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, message: 'Employee ID required.' });
    }
    const employee = yield Employee_1.default.findOne({ _id: req.body.id }).exec();
    (0, loggerService_1.log)('employee :', employee);
    if (!employee) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = yield employee.deleteOne(); //{ _id: req.body.id }
    (0, loggerService_1.log)('result :', result);
    return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.SUCCESS, "message": `Success`, data: result });
});
exports.deleteEmployee = deleteEmployee;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    if (!((_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.id)) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, message: 'Employee ID required.' });
    }
    const employee = yield Employee_1.default.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.NO_CONTENT, "message": `No employee matches ID ${req.params.id}.` });
    }
    return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.SUCCESS, "message": `Success`, data: employee });
});
exports.getEmployee = getEmployee;
//# sourceMappingURL=employeesController.js.map
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
exports.deleteEmployeeEntry = exports.createNewEmployeeEntry = exports.getAllEmployeesList = exports.updateEmployeeData = exports.findEmployeeById = void 0;
const employee_model_1 = __importDefault(require("@model/employee-model"));
const getAllEmployeesList = () => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield employee_model_1.default.find();
    return list || [];
});
exports.getAllEmployeesList = getAllEmployeesList;
const createNewEmployeeEntry = ({ firstName, lastName }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.default.create({
        firstname: firstName,
        lastname: lastName
    });
    return result;
});
exports.createNewEmployeeEntry = createNewEmployeeEntry;
const findEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield employee_model_1.default.findOne({ _id: id }).exec();
});
exports.findEmployeeById = findEmployeeById;
const updateEmployeeData = (employeeInstance, { firstName = '', lastName = '' }) => __awaiter(void 0, void 0, void 0, function* () {
    if (firstName) {
        employeeInstance.firstname = lastName;
    }
    if (lastName) {
        employeeInstance.lastname = lastName;
    }
    return yield employeeInstance.save();
});
exports.updateEmployeeData = updateEmployeeData;
const deleteEmployeeEntry = (employeeInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield employeeInstance.deleteOne();
});
exports.deleteEmployeeEntry = deleteEmployeeEntry;
//# sourceMappingURL=employee-use-cases.js.map
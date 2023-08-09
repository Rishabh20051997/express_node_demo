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
exports.deleteEmployee = exports.createEmployee = exports.getEmployeesList = exports.updateEmployee = exports.getEmployeeById = void 0;
const getEmployeesList = (Employee) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield Employee.find();
    return list || [];
});
exports.getEmployeesList = getEmployeesList;
const createEmployee = (Employee, { firstName, lastName }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Employee.create({
        firstname: firstName,
        lastname: lastName
    });
    return result;
});
exports.createEmployee = createEmployee;
const getEmployeeById = (Employee, { id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Employee.findOne({ _id: id }).exec();
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (employeeInstance, { firstName = '', lastName = '' }) => __awaiter(void 0, void 0, void 0, function* () {
    if (firstName) {
        employeeInstance.firstname = lastName;
    }
    if (lastName) {
        employeeInstance.lastname = lastName;
    }
    return yield employeeInstance.save();
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (employeeInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield employeeInstance.deleteOne();
});
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employee-use-cases.js.map
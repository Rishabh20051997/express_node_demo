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
exports.deleteInsurance = exports.createInsurance = exports.getInsurancesList = exports.updateInsurance = exports.getInsuranceById = void 0;
const getInsurancesList = (Insurance) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield Insurance.find();
    return list || [];
});
exports.getInsurancesList = getInsurancesList;
const createInsurance = (Insurance, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Insurance.create(data);
    return result;
});
exports.createInsurance = createInsurance;
const getInsuranceById = (Insurance, { id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Insurance.findOne({ _id: id }).exec();
});
exports.getInsuranceById = getInsuranceById;
const updateInsurance = (insuranceInstance, data) => __awaiter(void 0, void 0, void 0, function* () {
    for (const key in data) {
        insuranceInstance[key] = key;
    }
    return yield insuranceInstance.save();
});
exports.updateInsurance = updateInsurance;
const deleteInsurance = (insuranceInstance) => __awaiter(void 0, void 0, void 0, function* () {
    return yield insuranceInstance.deleteOne();
});
exports.deleteInsurance = deleteInsurance;
//# sourceMappingURL=insurance-use-cases.js.map
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
exports.getInsuranceController = exports.deleteInsuranceController = exports.updateInsuranceController = exports.createInsuranceController = exports.insuranceListController = void 0;
const strings_1 = require("@common/strings");
const insurance_use_cases_1 = require("@use-cases/insurance-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const insurance_model_1 = __importDefault(require("@model/insurance-model"));
/**
 *
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all insurances list
 */
const insuranceListController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const insurances = yield (0, insurance_use_cases_1.getInsurancesList)(insurance_model_1.default);
    response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: insurances
    });
});
exports.insuranceListController = insuranceListController;
/**
 *
 * @param req request from client
 * @param res response instance to be sent
 * @returns new insurance created response
 */
const createInsuranceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const insuranceData = req === null || req === void 0 ? void 0 : req.body;
    try {
        const result = yield (0, insurance_use_cases_1.createInsurance)(insurance_model_1.default, insuranceData);
        response_transmitter_1.sendResponse.createdRequest(res, {
            message: strings_1.SUCCESS_RESPONSE_MESSAGE,
            data: result
        });
    }
    catch (err) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: err === null || err === void 0 ? void 0 : err.toString()
        });
    }
});
exports.createInsuranceController = createInsuranceController;
/**
 *
 * @param req request from client
 * @param res response instance to be sent
 * @returns update the existing insurance data using its id & sends back response
 */
const updateInsuranceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const insuranceData = req.body;
    const insurance = yield (0, insurance_use_cases_1.getInsuranceById)(insurance_model_1.default, { id });
    // if insurance doesn't exists
    if (!insurance) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: strings_1.INSURANCE_LIST_RESPONSE_LABEL.NO_DATA_FOUND,
            data: id
        });
    }
    const result = yield (0, insurance_use_cases_1.updateInsurance)(insurance, insuranceData);
    return response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: result
    });
});
exports.updateInsuranceController = updateInsuranceController;
/**
 *
 * @param { id: string} req request from client
 * @param res response instance to be sent
 * @returns delete the existing insurance data using its id & sends back response
 */
const deleteInsuranceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    const insurance = yield (0, insurance_use_cases_1.getInsuranceById)(insurance_model_1.default, { id });
    // if insurance doesn't exists
    if (!insurance) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: strings_1.INSURANCE_LIST_RESPONSE_LABEL.NO_DATA_FOUND,
            data: id
        });
    }
    const result = yield (0, insurance_use_cases_1.deleteInsurance)(insurance); //{ _id: req.body.id }
    return response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: result
    });
});
exports.deleteInsuranceController = deleteInsuranceController;
/**
 *
 * @param { id: string} req request from client
 * @param res response instance to be sent
 * @returns finds the existing insurance data using its id & sends back response
 */
const getInsuranceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    const insurance = yield (0, insurance_use_cases_1.getInsuranceById)(insurance_model_1.default, { id });
    // if insurance doesn't exists
    if (!insurance) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: strings_1.INSURANCE_LIST_RESPONSE_LABEL.NO_DATA_FOUND,
            data: id
        });
    }
    return response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: insurance
    });
});
exports.getInsuranceController = getInsuranceController;
//# sourceMappingURL=insurance-controller.js.map
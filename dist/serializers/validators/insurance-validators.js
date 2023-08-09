"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInsuranceValidator = exports.updateInsuranceValidator = exports.getInsuranceValidator = exports.insuranceCreateValidator = void 0;
const express_validator_1 = require("express-validator");
const validators_1 = require("./validators");
const mongoIdValidator = [
    (0, express_validator_1.param)('id').exists().withMessage('Id is required').isMongoId().withMessage('Valid Id required'),
    validators_1.errorValidator
];
const ValidateInsuranceStructure = [
    (0, express_validator_1.body)('policyCreatedAt').exists().withMessage('Policy Date Required').isDate().withMessage('Policy Date is invalid'),
    (0, express_validator_1.body)('companyName').exists().withMessage('Company Name Required').isString().isLength({ min: 3 }).withMessage('Company Name is invalid'),
    (0, express_validator_1.body)('companyAgentName').exists().withMessage('Company Agent Required').isString().isLength({ min: 3 }).withMessage('Company Agent is invalid'),
    (0, express_validator_1.body)('policyNumber').exists().withMessage('Policy Number Required').isString().isLength({ min: 3 }).withMessage('Policy Number is invalid'),
    (0, express_validator_1.body)('customerName').exists().withMessage('Customer Name Required').isString().isLength({ min: 3 }).withMessage('Customer Name is invalid'),
    (0, express_validator_1.body)('contactNumber').exists().withMessage('Contact Number Required').isMobilePhone('en-IN').isLength({ min: 3 }).withMessage('Contact Number is invalid'),
    (0, express_validator_1.body)('insurerName').exists().withMessage('Insurer Name Required').isString().isLength({ min: 3 }).withMessage('Insurer Name is invalid'),
    (0, express_validator_1.body)('vehicleNumber').exists().withMessage('Vehicle Number Required').isString().isLength({ min: 3 }).withMessage('Vehicle Number is invalid'),
    (0, express_validator_1.body)('insuredDeclaredValue').exists().withMessage('Insured Declared Value Required').isNumeric().isLength({ min: 1 }).withMessage('Insured Declared Value is invalid'),
    (0, express_validator_1.body)('ownDamageValue').exists().withMessage('Own Damage Value Required').isNumeric().isLength({ min: 1 }).withMessage('Own Damage Value is invalid'),
    (0, express_validator_1.body)('policyTotalValue').exists().withMessage('Policy Total Value Required').isNumeric().isLength({ min: 1 }).withMessage('Policy Total Value is invalid'),
    (0, express_validator_1.body)('modeOfPayment').exists().withMessage('Payment Mode Required').isString().isLength({ min: 3 }).withMessage('Payment Mode is invalid'),
    (0, express_validator_1.body)('policyDueDate').exists().withMessage('Policy Due Date Required').isDate().withMessage('Policy Due Date is invalid'),
    (0, express_validator_1.body)('reference').optional().isString().withMessage('Reference is invalid'),
    (0, express_validator_1.body)('discountProvided').optional().isNumeric().withMessage('Discount is invalid'),
    (0, express_validator_1.body)('remarks').optional().isString().withMessage('Remarks is invalid'),
    (0, express_validator_1.body)('paymentOut').optional().isNumeric().withMessage('Payment Out is invalid'),
    (0, express_validator_1.body)('paymentOutMemberName').optional().isString().withMessage('Payment Out Member name is invalid'),
];
exports.insuranceCreateValidator = [
    ...ValidateInsuranceStructure,
    validators_1.errorValidator
];
exports.getInsuranceValidator = [...mongoIdValidator];
exports.updateInsuranceValidator = [
    (0, express_validator_1.oneOf)([
        ...ValidateInsuranceStructure
    ]),
    //validate not other key present
    // body('policyCreatedAt').exists().withMessage('Policy Date Required').isDate().withMessage('Policy Date is invalid'), 
    ...mongoIdValidator
];
exports.deleteInsuranceValidator = [...mongoIdValidator];
//# sourceMappingURL=insurance-validators.js.map
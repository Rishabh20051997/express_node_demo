"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Insurance schema
const Schema = mongoose_1.default.Schema;
const insuranceSchema = new Schema({
    policyCreatedAt: {
        type: Date,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyAgentName: {
        type: String,
        required: true
    },
    policyNumber: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    insurerName: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    insuredDeclaredValue: {
        type: Number,
        required: true
    },
    ownDamageValue: {
        type: Number,
        required: true
    },
    policyTotalValue: {
        type: Number,
        required: true
    },
    modeOfPayment: {
        type: String,
        required: true
    },
    policyDueDate: {
        type: Date,
        required: true
    },
    reference: {
        type: String,
        required: false,
        default: ''
    },
    discountProvided: {
        type: Number,
        required: false,
        default: 0
    },
    remarks: {
        type: String,
        required: false,
        default: ''
    },
    paymentOut: {
        type: Number,
        required: false,
        default: 0
    },
    paymentOutMemberName: {
        type: String,
        required: false,
        default: ''
    }
});
const insuranceModelSchema = mongoose_1.default.model('Insurance', insuranceSchema);
// type employeeModelType = InferSchemaType<typeof employeeSchema>;
exports.default = insuranceModelSchema;
//# sourceMappingURL=insurance-model.js.map
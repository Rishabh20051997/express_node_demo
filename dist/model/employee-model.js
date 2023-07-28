"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});
const employeeModelSchema = mongoose_1.default.model('Employee', employeeSchema);
// type employeeModelType = InferSchemaType<typeof employeeSchema>;
exports.default = employeeModelSchema;
//# sourceMappingURL=employee-model.js.map
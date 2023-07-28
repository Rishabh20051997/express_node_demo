"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Task schema
const Schema = mongoose_1.default.Schema;
const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
});
const taskModelSchema = mongoose_1.default.model('Task', taskSchema);
exports.default = taskModelSchema;
//# sourceMappingURL=task-model.js.map
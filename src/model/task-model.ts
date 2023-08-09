import mongoose from "mongoose";

// Task schema
const Schema = mongoose.Schema;
const taskSchema = new Schema<ITaskSchema>({
    task: {
        type: String,
        required: true
    },
});

const taskModelSchema = mongoose.model('Task', taskSchema);
export default taskModelSchema

export type TaskModalSchema = typeof taskModelSchema
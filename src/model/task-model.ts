import mongoose from "mongoose";

const Schema = mongoose.Schema;
const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
});

export default mongoose.model('Task', taskSchema);
import mongoose from "mongoose";

// User schema
const Schema = mongoose.Schema;

const userSchema = new Schema<IUserSchema>({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

export default mongoose.model('User', userSchema);
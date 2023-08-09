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

const userModelSchema = mongoose.model('User', userSchema);

export default userModelSchema

export type UserModalSchema = typeof userModelSchema

import User from '@model/user-model'

const createNewUserEntry = async ({ userName, hashedPwd, userRoles }) => {
    await User.create({
        "username": userName,
        "password": hashedPwd,
        "roles": userRoles
    });
}

const getAllUsersList = async () => {
    const list = await User.find();
    return list || []
}

const getUserByUserId = async(userId) => {
    return await User.findOne({ _id: userId }).exec();
}

const getUserByUserName = async (userName) => {
    const foundUser = await User.findOne({ username: userName }).exec();
    return foundUser
}

const getUserByRefreshToken = async (refreshToken) => {
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    return foundUser
}

const updateUserRefreshToken = async(refreshToken, user) => {
    user.refreshToken = refreshToken;
    await user.save();
}

const deleteUserRefreshToken = async(user) => {
    user.refreshToken = '';
    await user.save();
}

const deleteUserByUserId = async(user, userId) => {
    await user.deleteOne({ _id: userId });
}


export {
    createNewUserEntry,
    getAllUsersList,
    getUserByUserName,
    updateUserRefreshToken,
    getUserByRefreshToken,
    deleteUserRefreshToken,
    getUserByUserId,
    deleteUserByUserId
}
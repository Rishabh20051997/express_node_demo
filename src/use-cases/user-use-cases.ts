
import User from '@model/user-model'

const createNewUserEntry = async ({ userName, hashedPwd, userRoles }): Promise<IUserModelDocType> => {
    return await User.create({
        "username": userName,
        "password": hashedPwd,
        "roles": userRoles
    });
}

const getAllUsersList = async (): Promise<IUserModelDocType[]> => {
    const list = await User.find();
    return list || []
}

const getUserByUserId = async(userId: string): Promise<IUserModelDocType> => {
    return await User.findOne({ _id: userId }).exec();
}

const getUserByUserName = async (userName: string): Promise<IUserModelDocType> => {
    const foundUser = await User.findOne({ username: userName }).exec();
    return foundUser
}

const getUserByRefreshToken = async (refreshToken: string) : Promise<IUserModelDocType> => {
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    return foundUser
}

const updateUserRefreshToken = async(refreshToken: string, user: IUserModelDocType): Promise<IUserModelDocType> => {
    user.refreshToken = refreshToken;
    return await user.save();
}

const deleteUserRefreshToken = async(user: IUserModelDocType) => {
    user.refreshToken = '';
    await user.save();
}

const deleteUserByUserId = async(user: IUserModelDocType, userId: string) => {
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
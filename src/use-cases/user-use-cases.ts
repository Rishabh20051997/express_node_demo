const createUser = async (User: UserModalSchema, { userName, hashedPwd, userRoles }): Promise<IUserModelDocType> => {
    return await User.create({
        "username": userName,
        "password": hashedPwd,
        "roles": userRoles
    });
}

const getUsersList = async (User: UserModalSchema): Promise<IUserModelDocType[]> => {
    const list = await User.find();
    return list || []
}

const getUserByUserId = async(User: UserModalSchema, {userId } : { userId: string}): Promise<IUserModelDocType> => {
    return await User.findOne({ _id: userId }).exec();
}

const getUserByUserName = async (User: UserModalSchema, {userName } : {userName: string}): Promise<IUserModelDocType> => {
    const foundUser = await User.findOne({ username: userName }).exec();
    return foundUser
}

const getUserByRefreshToken = async (User: UserModalSchema, {refreshToken } : { refreshToken: string }) : Promise<IUserModelDocType> => {
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
    createUser,
    getUsersList,
    getUserByUserName,
    updateUserRefreshToken,
    getUserByRefreshToken,
    deleteUserRefreshToken,
    getUserByUserId,
    deleteUserByUserId
}
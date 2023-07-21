import User from '../model/User'


export const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({
            status: 204, // session expire code
            message: 'Token Missing'
        });
    }

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        return res.status(403).json({
            status: 440, // session expire code
            message: 'Log out'
        });

    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    return res.sendStatus(204)
}
import jwt from 'jsonwebtoken'
import User from '../model/User'
import { TOKEN_EXPIRE_TIME } from '../common/constant';

// TODO:  Add type of found user
const deleteRefreshToken = (foundUser) => {
    foundUser.refreshToken = '';
    foundUser.save();
}

export const handleRefreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({
            status: 440, // session expire code
            message: 'Log out'
        });
    }

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        //Forbidden 
        deleteRefreshToken(foundUser)
        return res.status(403).json({
            status: 440, // session expire code
            message: 'Log out'
        });
    }

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                //Forbidden 
                deleteRefreshToken(foundUser)
                return res.status(403).json({
                    status: 440, // session expire code
                    message: 'Log out'
                });
            }

            const roles = Object.values(foundUser?.roles || {});
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: TOKEN_EXPIRE_TIME }
            );

            res.status(200).json({
                user: {
                    userId: foundUser._id,
                    userName: foundUser.username,
                    roles,
                },
                accessToken,
                refreshToken
            });
        }
    );
}
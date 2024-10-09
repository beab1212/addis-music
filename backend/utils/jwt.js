import jwt from 'jsonwebtoken';
import config from '../config.js';


const signUser = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        username: user?.username
    }, config.JWT_SECRET);
}

export { signUser };

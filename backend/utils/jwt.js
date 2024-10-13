import jwt from 'jsonwebtoken';
import config from '../config.js';


const signUser = (user) => {
    return jwt.sign({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user?.username
    }, config.JWT_SECRET);
}

export { signUser };

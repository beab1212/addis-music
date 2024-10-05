import StatusCode from 'http-status-codes';
import CustomError from '../errors/index.js';
import User from '../models/User.js';
import redisClient from '../db/redis.js';

const AuthController = {
    async singin (req, res) {
        
    },

    async singup (req, res) {
        const { email, password, rePassword } = req.body;
        if (!email || !password || !rePassword) {
            throw new CustomError.BadRequest('Please provide sing up information properly');
        }

        if (!email.includes('@')) {
            throw new CustomError.BadRequest('Please enter valid email address');
        }

        if (password !== rePassword) {
            throw new CustomError.BadRequest('Password doesn\'t match');
        }

        if (password.length < 8) {
            throw new CustomError.BadRequest('Use strong password');
        }

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) {
            throw new CustomError.BadRequest('Email already registered');
        }

        // TODO: use more unique username instead email prefix
        const user = new User({
            email,
            username: email.split('@')[0],
            password
        });

        await user.save();

        const token = 'tokenasdfhjklwertyuio';
        await redisClient.set(`test`, user._id.toString(), 'EX', 2592000);

        return res.status(StatusCode.CREATED).json({ success: true, message: 'account created successfully', data: { sessionToken: `auth_${token}` } });
    },

    async signout (req, res) {

    }
}

export default AuthController;

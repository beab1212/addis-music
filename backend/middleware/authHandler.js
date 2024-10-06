import redisClient from '../db/redis.js';
import UnauthenticatedError from '../errors/unauthenticatedError.js';

const authHandler = async (req, res, next) => {
    const token = req.headers['session-token'] || req.signedCookies['session-token'] || null;
    
    const user = await redisClient.get(`auth_${token}`);

    if (!token || !user) {
        throw new UnauthenticatedError('Unauthorized');
    }
    req.user = JSON.parse(user);
    return next();
};

export default authHandler;


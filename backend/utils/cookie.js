const setSessionCookie = (res, value) => {
    res.cookie('session-token', value, {
        httpOnly: true,
        // sameSite: 'None',
        secure: false, // Set to true if your site is served over HTTPS
        signed: true,
        expires: new Date(Date.now() + 2592000000)
    });
};

const clearSessionCookie = (res) => {
    res.cookie('session-token', '', {
        httpOnly: true,
        // sameSite: 'None',
        secure: false, // Set to true if your site is served over HTTPS
        signed: true,
        expires: new Date(Date.now())
    });
}

export { setSessionCookie, clearSessionCookie };

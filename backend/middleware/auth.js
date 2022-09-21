const auth = (req, res, next) => {
    const handleAuthError = (res) => {
        return res.status(401).send({ message: 'Authorization failed' })
    }

    const { authorization } = req.headers;
    if( !authorization || !authorization.startsWith('Bearer ')) {
        handleAuthError(res)
    }
    const token = authorization.replace('Bearer ','');
    let payload;
    try {
        payload = jwt.verify(token, 'encoding-string')
    }
    catch(err) {
        handleAuthError(res);
    }
    req.user = payload;
    next();
} 

module.exports = {
    auth
}
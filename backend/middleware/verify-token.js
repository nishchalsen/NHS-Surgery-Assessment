const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, 'J9dah7kPbo');

        req.userData = decoded;
        next();
        
    } catch (error) {
        // If i get any error I catch it here.
        // For example if token does not exist or if [1] is not the token
        return res.status(401).json({
            message: "Authorisation failed."
        });
    }
}
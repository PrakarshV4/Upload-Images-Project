const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    try{
        console.log("usermiddle ="+req.headers)
        const token = req?.headers?.authorization;

        if(!token){
            console.log("token = "+ token );
            return res.json({ message: 'Unauthorized' });
        }
        const decodedtoken =jwt.verify(JSON.parse(token),"Pro13421241")
        console.log("decodedtoken = "+ decodedtoken.email);
        req.email = decodedtoken?.email;
        next();
    }catch (err) {
        console.log("Erroring = "+err)
    }

}
module.exports = userMiddleware;
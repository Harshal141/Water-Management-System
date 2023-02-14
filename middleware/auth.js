const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {
    // get token from header
    const token = req.header['x-auth-token'];

    // check if not token
    if(!token){
        return res.redirect('/login');
    }
     
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }catch(err){
        res.redirect('/login');
    }
}
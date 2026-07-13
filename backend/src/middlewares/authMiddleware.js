const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    const authHeader = req.headers.authorization; // format: "Bearer <token>"

    if(!authHeader){
        return res.status(401).json({message: 'Token tidak ditemukan'});
    }

    const token = authHeader.split(' ')[1]; // Memisah kata "Bearer" dari token

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message: 'Token tidak valid atau kadaluwarsa'});
    }
}

function authorizeRole(allowedRoles){
    return (req,res,next) =>{
        if (!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message: 'Kamu tidak punya akses untuk fitur ini'})
        }
        next();
    };
}

module.exports = {verifyToken, authorizeRole};
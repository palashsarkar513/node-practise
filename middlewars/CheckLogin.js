require("dotenv").config();
const jwt = require("jsonwebtoken");

const CheckLogin = (req,res,next)=>{
    const {token,name} = req.cookies;
    
    try{
        if(token){
            const data = jwt.verify(token,process.env.PRIVATEKEY);
            req.userName = data.userName;
            req.userId = data.userId;
            next()
        }else{
            res.status(500).json({
                msg : "Login first"
            })
        }
    }catch(Err){
        res.status(500).json({
            Err
        })
    }
}
module.exports = CheckLogin;
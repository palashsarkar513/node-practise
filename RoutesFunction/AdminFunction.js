require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Consumer,userSchema} = require("../Schemas/Schemas");

// Defined Consumer model
const ConsumerModel = new mongoose.model("Consumer",Consumer);
const newUserModel = new mongoose.model("user",userSchema);

const Home = async(req,res)=>{
    try{
        const data = await"Hello world from home routes functions.";
        res.send(data);
    }catch(err){
        res.send(err)
    }
};

const HomePost = async(req,res)=>{
    try{
        const data = await "data get successfully.";
        res.status(200).json({
            msg : data
        })
    }catch(err){
        res.status(500).json({
            msg : err
        })
    }
    
};

const ConsumerPost = async(req,res)=>{
    try{
        const data = await new ConsumerModel(req.body);
        res.status(200).json({
            msg : "data send successfully to mongo database."
        });
        data.save()
    }catch(err){
        res.status(500).json({
            msg : err
        })
    }
    
};

// find active routes
const FindActive = async(req,res)=>{
    try{
        const data = await ConsumerModel.find().findByName("jira");
        res.status(200).json({
            msg : data
        })
    }catch(err){
        res.status(500).json({
            msg : "Server side error!"
        })
    }
};

// Signup methods for user collection
const Signup = async (req,res)=>{
    /*try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const data = await new newUserModel({
            name : req.body.name,
            userName : req.body.userName,
            password : hashedPassword
        });
        await data.save();
        res.status(200).json({
            msg : "sign up successfully!"
        })
        
    }catch{
        res.status(500).json({
            smg : "signup problem!"
        })
    }*/

    // Second attempt
    try{
        const bcryptPass = await bcrypt.hash(req.body.password,10);
        const newUser = await new newUserModel({
            name : req.body.name,
            userName : req.body.userName,
            password : bcryptPass
        });
        newUser.save()
        res.status(200).json({
            msg : "data add successfully to database!"
        })

    }catch(err){
        res.status(500).json({
            err
        })
    }

};


// Login router handlers
const login = async(req,res)=>{
    try{
        // check username
        // check hashed password
        // generate token
        const hasUserName = await newUserModel.find().hasData(req.body.userName);
        if(hasUserName && hasUserName.length > 0){
            const hasPassword = await bcrypt.compare(req.body.password,hasUserName[0].password);
            if(hasPassword){
                const token= jwt.sign({
                    userName:hasUserName[0].userName,
                    userId : hasUserName[0].id
                },process.env.PRIVATEKEY,{expiresIn: '1h'});
                res.cookie('token',token,{ expires: new Date(Date.now()+10000), httpOnly: true });
                res.status(200).json({
                    msg : "Login successfully!"
                })
            }else{
                res.status(500).json({
                    msg : "Login failed!"
                })
            }
        }else{
            
            res.status(500).json({
                err :"server side error "
            })
        };
        
        res.end()

    }catch(error){
        res.status(500).json({
            err: error
        })
    }
}





// consumer post


module.exports = {Home,HomePost,ConsumerPost,FindActive,Signup,login};
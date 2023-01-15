const express = require('express');
const {UserModel} = require('../models/User.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async(req,res)=>{
    const {email,pass,name,age} = req.body;
    const saltRounds = 10;
    try{
        bcrypt.hash(pass,saltRounds,async(err,secure_password)=>{
            //Store hash in your password DB.
          if(err){
            console.log(err);
          }else{
            const user = new UserModel({email,pass:secure_password,name,age});
            await user.save();
            res.send("Registered");
          }
        })
      
    }catch(err){
        res.send("Error in registering the user");
       console.log("register error",err);
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try{
       const user = await UserModel.find({email});
       const hashed_pass = user[0].pass;
       if(user.length>0){
        bcrypt.compare(pass, hashed_pass, (err, result)=> {
            if(result){
                const token = jwt.sign({userID:user[0]._id},'masai');
                res.send({"msg":"login Successfull","token":token});
            }else if(err){
                res.send("Wrong credntials");
                console.log(err);
            }
           });
       }else{
        res.send("user not found!")
       }
    }catch(err){
        res.send("email or password not valid");
        console.log("register error",err);
    }
})

module.exports = {userRouter};
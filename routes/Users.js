const express = require('express')
const users = express.Router()
const cors =require("cors")
const jwt=require("jsonwebtoken")
const bcrypt =require("bcrypt")
const User = require("../models/User")

users.use(cors())

process.env.SECRET_KEY ='secret'

//register
users.post('/register',(req,res)=>{
    const today = new Date()
    const userData={
        user_name: req.body.user_name,
        mobile_number: req.body.mobile_number,
        email_id :req.body.email_id,
        password:req.body.password,
        created:today
         }
    
    User.findOne({
        where:{
            email_id:req.body.email_id
         }
    })
    .then(user=>{
        if(!user){
            const hash =bcrypt.hashSync(userData.password,10)
            userData.password=hash
            console.log("data",userData)
            User.create(userData)
            .then(user=>{
                let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                    expiresIn:5678
                })
                res.json({token:token})
            })
            .catch(err=>{
                res.send('error'+ err   )
            })
        }else{
            res.json({error:'user already existes'})
        }
    })
    .catch(err=>{
        
        res.send('error:' + err)
    })
    
})

//login
users.post('/login', async (req,res)=>{
    const user = await User.findOne({ where : {email_id : req.body.email_id }});
    if(user){
       const password_valid = await bcrypt.compare(req.body.password,user.password);
       if(password_valid){
           token = jwt.sign({ "id" : user.id,"email" : user.email_id,"user_name":user.user_name },process.env.SECRET_KEY);
           res.status(200).json({ token : token });
       } else {
         res.status(400).json({ error : "Password Incorrect" });
       }
     
     }else{
       res.status(404).json({ error : "User does not exist" });
     }
     
     });
           

module.exports = users
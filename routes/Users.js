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
users.post('/login',(req,res)=>{
            User.findOne({where:{
                email_id:req.body.email_id,
            }})
            .then(user=>{
                
                if(bcrypt.compareSync(req.body.password,user.password)){
                     let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                     expiresIn:2000
                    })
                    res.json({token:token})
                    
                }else{
                    res.send("invalid password")
                    
                }
            })
            .catch(err=>{
                res.send('error'+ err)
            })

           
})
module.exports = users
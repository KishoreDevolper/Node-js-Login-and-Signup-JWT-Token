const Sequelize = require("sequelize")
const db ={}
const sequelize = new Sequelize("registerpage","root","1234",{
    host:"localhost",
    dialect:"mysql",
    operatorsAliases:0,
    pool:{
       max:90,
       min:0,
       acquire:30000,
       idle:10000 
    }
})
db.sequelize= sequelize

db.Sequelize= Sequelize

module.exports = db
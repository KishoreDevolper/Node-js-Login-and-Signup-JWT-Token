var express= require("express")
var cors =require("cors")
var bodyParser= require("body-parser")
var app = express()
var port =process.env.PORT || 3000
app.use(bodyParser.json())
app.use(cors())
app.use(
    
  bodyParser.urlencoded({extended:false})
)
var Users = require("./routes/Users")
app.use("/Users", Users)
app.listen(port,function(){
    console.log("server runnning on port" + port)
})
module.exports = Users
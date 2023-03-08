const express = require("express")
const app = express()
const equipes = require('./equipes')

app.use(express.json())

app.get('/', (req,res,next)=>{
    res.send(equipes)
})







app.listen('9000','0.0.0.0',function(){
    console.log('App Starting in port 9000')
})
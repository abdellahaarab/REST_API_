const express = require("express")
const app = express()
const equipes = require('./equipes')
var fs = require('fs');

app.use(express.json())

// list of all the equipes
app.get('/equipes', (req,res)=>{
    // res.send(equipes)
    res.status(200).json(equipes)
})

// get one equipe by id
app.get('/equipes/:id', (req,res)=>{
    const id = req.params.id;
    const equipe = equipes.find( equipe => equipe.id == id)
    // res.send(equipe)
    res.status(200).json(equipe)

})

// add one equipe by id
app.post('/equipes', (req,res)=>{
    equipes.push(req.body)
    let data = JSON.stringify(equipes);
    fs.writeFile('equipes.json', data, 'utf8',  err => {
                                                            if(err) throw err;
                                                        });
    res.send(req.body)
})

// PUT one equipe by id
app.put('/equipes/:id', (req,res)=>{
    const id = req.params.id;
    const equipe = equipes.filter( equipe => equipe.id == id)

    equipe[0].id = req.body.id;
    equipe[0].name = req.body.name;
    equipe[0].contry = req.body.contry;

    let data = JSON.stringify(equipes);
    fs.writeFile('equipes.json', data, 'utf8',  err => {
                                                            if(err) throw err;
                                                        });   
    res.send(equipe)
})

// Delete one equipe by id
app.delete('/equipes/:id', (req,res)=>{
    try{
        const id = req.params.id;
        const obj = equipes.find( equipe => equipe.id == id)
        const index = equipes.indexOf(obj)
        equipes.splice(index,1)
        let data = JSON.stringify(equipes);
        fs.writeFile('equipes.json', data, 'utf8',  err => {if(err) throw err;});   
        res.send({'message':"Deleted success !!"})
    }catch(e){
        res.send({'message':"Not deleted !!"})
    }
})







app.listen('9000','0.0.0.0',function(){
    console.log('App Starting in port 9000')
})
const path=require('path');
const express=require('express');
const MongoDB = require('./utils') ;


const app=express();

const publicPath = path.join(__dirname,'../public') ;

app.use(express.static(publicPath));


app.get('/getByName',async (req,res)=>{
    const name=req.query.user ;
    if(!name)
     return res.send({error:"User is not set"}) ;
   MongoDB.GetUserName(name).then(results=>{
    res.json(results) ;
   }).catch(err=>{
    res.json(err) ;
   });
});

app.get('/getByEmail',(req,res)=>{
    const mail=req.query.mail;
    if(!mail)
    return res.json({error:'You must specify an email'}) ;
    MongoDB.GetUserByEmail(mail).then(results=>{
        res.json(results);
    }).catch(err=>{
        res.json(err);
    });
});

app.get('/getByAge',(req,res)=>{
    const min =req.query.min ;
    const max =req.query.max ;
    if(!min ||!max)
     return res.json ({error:"Min & Max age must be specified"}) ;
    MongoDB.GetUserByAge(min,max).then(users=>{
        res.json(users);
    }).catch(err=>{
        res.json(err);
    })
});

// MongoDB.UpdateTasks(false);
// MongoDB.DeleteUsersByAge(0,18);
app.listen(3000,()=>{
    console.log("Express Is Running");
})



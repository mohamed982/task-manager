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
     try{
         const users= await MongoDB.GetUserName(name);
         res.json(users);
     }catch(error){
         res.json({error:error.message});
     }
});

app.get('/getByEmail',(req,res)=>{
    const mail=req.query.mail;
    if(!mail)
     {
        return res.json({error:'You must specify an email'}) ;
     }
    MongoDB.GetUserByEmail(mail,(err,users)=>{
        if(err)
         {
            res.json(err) ;
         }else{
             res.json(users) ;
         }
    });
});
app.listen(3000,()=>{
    console.log("Express Is Running");
})



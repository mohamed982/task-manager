const express=require('express');
const MongoDB = require('./utils') ;

// MongoDB.AddUser(
//      {name:'Lamia Mahmoud',
//      age:36,
//      emai:'lamia@gmail.com',
//      phone:"01011001513"}
//      ).then(result=>{
//          console.log(result) ;
//      }).catch(err=>{
//          console.log(err);
//      });

// MongoDB.AddUser(
//     {
//         name:'Lamia Mahmoud',
//         age:36 ,
//         emai:'lamia@gmail.com',
//         phone:"00201011001513"
//     },
//     (err,result)=>{
//         if(err)
//          return console.log(err.message);
//         console.log(result) ;
//     }
// )
const app=express();


app.get('',(req,res)=>{
    res.send('Welcome to MongoDB');
});

app.get('/getUser',async (req,res)=>{
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

app.listen(3000,()=>{
    console.log("Express Is Running");
})



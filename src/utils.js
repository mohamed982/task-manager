const mongodb=require('mongodb').MongoClient;
const { argv, command } = require('yargs');
const yargs=require('yargs');

const connectionURL="mongodb://192.168.1.2:1982";
const databaseName="task-manager" ;

// const MongoClient=new mongodb.MongoClient(connectionURL,{useUnifiedTopology: true});

//  MongoClient.connect((error,client)=>{
//    if(error)
//     return console.log("Error Can't connect to database");
  
//     const database = client.db(databaseName);
//     const collection=database.collection('users') ;
//     collection.insertOne({
//       name:"Moez Mohamed Nabil Zaki",
//       age:6 ,
//       email:"moez@mnztrading.com"
//     },(err,result)=>{
//       if(err)
//        console.log(err) ;
//       else
//        console.log("Record was added successfully") ;
//        client.close();
//     });
   
//  });

// const MongoClient=new mongodb.MongoClient(connectionURL,{useUnifiedTopology:true,useNewUrlParser:true}) ;

// MongoClient.connect((error,client)=>{
//   if(error)
//    return console.log("Error Connection to the database " , error.message ) ;
//   const database =client.db(databaseName) ;
//   const collection=database.collection('tasks') ;
//   collection.insertMany([
//     {
//       name:"Buy Groceries" ,
//       status:true
//     },
//     {
//       name:"Do workouts" ,
//       status:true 
//     },
//     {
//       name:"Study nodeJS",
//       status:false
//     }
//   ],(err,result)=>{
//     if(err)
//      console.log("Error Adding document to the collection " , err.message) ;
//     else
//      console.log(result.ops);
//     client.close();
//   })
// });


// Define the mongo client



//Adding single user
let AddUser=async ({name,age,emai,phone}={},callback)=>{
  const MongoClient=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
   try{
    const MongoClient=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
    const connection=await MongoClient.connect();
    const db=MongoClient.db(databaseName);
    const collection=db.collection('users');
    const result=await collection.insertOne({
      name,
      age,
      emai,
      phone
    });
     if(callback)
      callback(undefined,result.ops) ;
      return result.ops;
   }catch(error){
     if(callback)
       callback(error,undefined);
     throw new Error(error);
   }finally{
     await MongoClient.close();
   }
};

let AddTasks=async (tasks,callback)=>{
  const MongoClient=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
  try{
    const connection=await MongoClient.connect();
    const db=MongoClient.db(databaseName) ;
    const collection=db.collection('tasks') ;
    const result =await collection.insertMany(tasks) ;
    if(callback)
      callback(undefined,result.ops);
    return result.ops;
  }catch(error){
    if(callback)
      callback(error,undefined);
    throw new Error(error);
  }finally{
    await MongoClient.close();
  }
}

let GetUserName=async (name,callback)=>{
   const MongoClient=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
   try{
    const conn=await MongoClient.connect();
    const db=MongoClient.db(databaseName) ;
    const collection=db.collection('users') ;
    const documents= await collection.find({}).toArray();
    const reg=new RegExp(`^${name}`,'i');
    const users=documents.filter(user=>user.name.search(reg)>=0);
    if(callback)
      callback(undefined,users);
      return users;
   }catch(error){
     if(callback)
      callback(error,undefined);
      throw new Error(error);
   }finally{
    await MongoClient.close();
   }
};


let GetTasks = async (status,callback)=>{
  const MongoClient=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
  try{
    const conn= await MongoClient.connect();
    const db=MongoClient.db(databaseName) ;
    const collection=db.collection('tasks')  ;
    const tasks =await collection.find({status}).toArray() ;
    if(callback)
      callback(undefined,tasks);
    return tasks ;
  }catch(error){
    if(callback)
      callback(error,undefined);
    throw new Error(error);
  }finally{
    await MongoClient.close();
  }
};


let GetUserByAge = async (max=100,min=0,callback)=>{
  const MongoClient=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
  try{
    const conn= await MongoClient.connect();
    const db=MongoClient.db(databaseName) ;
    const collection=db.collection('users');
    const allUsers=await collection.find({}).toArray();
    const users = allUsers.filter(user=>user.age<=max && user.age>=min);
    if(callback)
      callback(undefined,users) ;
    return users ;
  }catch(error){
    if(callback)
      callback(error,undefined);
    throw new Error(error);
  }finally{
    await MongoClient.close();
  }
};


module.exports={
  AddUser ,
  AddTasks ,
  GetUserName ,
  GetTasks ,
  GetUserByAge
};

// var tasks =[

//   {
//     task:"Buy Groceries",
//     time :"12:00PM" ,
//     status:true
//   },
//   {
//     task:"Do Workouts",
//     time:"16:00",
//     status:true 
//   },
//   {
//     task :"Study NodeJS",
//     time : " 18:00",
//     status: false
//   }
// ];

//AddTasks(tasks);

// yargs.command({
//   command : "AddUser",
//   description: "Add new user",
//   builder:{
//       name :{
//         describe :"User Name",
//         type:"string" ,
//         demandOption:true
//       },
//       email:{
//         describe:'User Email',
//         type:"string" ,
//         demandOption:true 
//       },
//       age:{
//         describe : 'User age',
//         type:"number" ,
//         demandOption:true 
//       },
//       phone:{
//         describe:'User Mobile',
//         type :"string",
//         demandOption:false
//       }
//   },
//   handler : (argv)=>{
//     AddUser(argv.name,argv.age,argv.email,argv.phone);
//   } 
// });

// yargs.command({
//   command:'GetUserName',
//   description:'Get User by name',
//   builder :{
//     name :{
//       describe:'User Name',
//       demandOption:true ,
//       type :"string"
//     }
//   },
//   handler:(argv)=>{
//     GetUserName(argv.name);
//   }
// });

// yargs.command({
//   command:'GetUserByAge',
//   description:'Get User by Age',
//   builder :{
//     maxAge :{
//       describe:'Max Age',
//       demandOption:true ,
//       type :"integer"
//     },
//     minAge:{
//       describe:"Min Age",
//       demandOption:true ,
//       type:"integer"
//     }
//   },
//   handler:(argv)=>{
//     GetUserByAge(argv.maxAge,argv.minAge);
//   }
// });

// yargs.command({
//   command:'GetTasks',
//   description:'Get Tasks By status',
//   builder :{
//     status :{
//       describe:'Task status',
//       demandOption:true ,
//       type :"boolean"
//     }
//   },
//   handler:(argv)=>{
//     GetTasks(argv.status);
//   }
// });

// yargs.parse();
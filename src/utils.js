const mongodb=require('mongodb').MongoClient;
const { argv, command } = require('yargs');
const yargs=require('yargs');

const connectionURL="mongodb://localhost:27017";
const databaseName="task-manager" ;

//Adding single user
let AddUser=async ({id,name,age,email,phone}={},callback)=>{
  const MongoClient=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
   try{
    const MongoClient=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
    const connection=await MongoClient.connect();
    const db=MongoClient.db(databaseName);
    const collection=db.collection('users');
    const result=await collection.insertOne({
      id,
      name,
      age,
      email,
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

const GetUserByEmail =async (email,callback)=>{
  const client=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
  try{
    const conn= await client.connect() ;
    const allUsers = await client.db(databaseName).collection('users').find({}).toArray();
    const reg=new RegExp(`^${email}`,'i') ;
    users=allUsers.filter(u=>u.email && u.email.search(reg)>=0);
    if(callback)
     {
       callback(undefined,{count:users.length , users});
     }
    else
     {
       return users ;
     }
  }catch(error){
    if(callback)
     {
       callback({error:error.message}) ;
     }
     else
      {
        throw new Error({error :error.message}) ;
      }
  }finally{
    await client.close();
  }
};


module.exports={
  AddUser ,
  AddTasks ,
  GetUserName ,
  GetTasks ,
  GetUserByAge,
  GetUserByEmail
};

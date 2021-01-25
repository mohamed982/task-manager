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

let GetUserName=async (name)=>{
   const client=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
   try{
    await client.connect();
    const regexp=new RegExp(`^${name}.*`,"i");
    const users=await client.db(databaseName).collection('users').find(
      {
        name :regexp
      }
    ).toArray();
    return users;
   }catch(error){
    throw new Error (error.message);
   }finally{
    await client.close();
   }
   
};

const GetUserByEmail =async (email)=>{
  const client=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
  try{
    const conn= await client.connect() ;
    const reg=new RegExp(`^${email}`,'i') ;
    const users = await client.db(databaseName).collection('users').find({
     email :reg
    }).toArray();
    return users;
  }catch(err){
    throw new Error (err.message);
  }finally{
    await client.close();
  }
};

let GetTasks = async (status)=>{
  const client=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
  try{
    await client.connect();
    const tasks=client.db(databaseName).collection('tasks').find(
      {status}
    ).toArray();
      return tasks
  }catch(error){
    throw new Error(error.message);
  }finally{
    await client.close();
  }
};


let GetUserByAge = async (min,max)=>{
  const client=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true});
  try{
   const connection = await client.connect();
   const Max=new Number(max) ; 
   const Min=new Number(min);
   const users=await client.db(databaseName).collection('users').find({
     age:{$lte:Max , $gte: Min}
   }).toArray();
    return users ;
  }catch(error){
    throw new Error(error.message);
  }finally{
    await MongoClient.close();
  }
};



const UpdateTasks = (status)=>{
  const client=new mongodb(connectionURL,{useNewUrlParser:true , useUnifiedTopology:true}) ;
  client.connect().then(()=>{
    return client.db(databaseName).collection('tasks').updateMany(
      {$and:[{status:false},{name:"Buy Groceries"}]},
      {$set:{status : true}}
    )
  }).then(result=>{
     console.log(result);
  }).catch(error=>{
     console.log(error.message);
  }).finally(()=>{
    client.close();
  });
};

const DeleteUsersByAge = (min,max)=>{
  const client=new mongodb(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true}) ;
  client.connect().then(()=>{
    return client.db(databaseName).collection('users').deleteMany(
      {
        $and : [ {age:{$gte:min}} , {age:{$lte:max}} ]
      }
    )
  }).then(result=>{
    console.log(result) ;
  }).catch(error=>{
    console.log(error);
  }).finally(()=>{
    client.close();
  })
};
module.exports={
  AddUser ,
  AddTasks ,
  GetUserName ,
  GetTasks ,
  GetUserByAge,
  GetUserByEmail,
  UpdateTasks,
  DeleteUsersByAge
};

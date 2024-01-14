const mongoose = require('mongoose');
// const { MongoClient } = require("mongodb");

const connectDB = async ()=>{

   // const conn = new MongoClient(process.env.MONGO_URI)
   const conn = await mongoose.connect(process.env.MONGO_URI,{
        //useNewUrlParser: true,
        //useCreateIndex: true,
        //useFindAndModify: false,
        useUnifiedTopology: true
   });

   console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
}

module.exports = connectDB;
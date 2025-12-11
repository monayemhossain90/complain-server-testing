// const dotenv = require("dotenv");
// dotenv.config();
// const mongoose = require("mongoose")

// const dbConnect = async () => {
//     try{
//         mongoose.set('strictQuery', false);
//         let uri = process.env.MONGO_URI;
//         //let option = {user:process.env.MONGO_USER, pass:process.env.MONGO_PASS,autoIndex:true};

//         await mongoose.connect(uri);
//         console.log("Database connection success")
//     }
//     catch(error){
//         console.log("Connection Failed");
//         console.log(error);
//     }
// }


// module.exports = dbConnect

// src/utility/dbConnect.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { useNewUrlParser: true, useUnifiedTopology: true };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = dbConnect;

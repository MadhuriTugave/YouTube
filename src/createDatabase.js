const mongoose = require("mongoose");
const subscriberModel = require("./models/subscribers")
const data = require("./data");
const dotenv = require("dotenv");
dotenv.config();

// console.log(process.env.URL);
// Local URI TO CONNECT MONGODB
const DATABASE_URL = process.env.URL;

// Connect to DATABASE

  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true} };
    
       mongoose.connect(DATABASE_URL, clientOptions);
      const db =  mongoose.connection
      db.on('error', (err) => console.log(err));
      db.once('open', () => console.log('Database created...'));
 


const refreshAll = async () => {
  await subscriberModel.deleteMany({});
  // console.log(connection)
  await subscriberModel.insertMany(data);
 
  await mongoose.disconnect();
 
};
module.exports.connection = refreshAll;


const express = require('express');
const path = require("path");

const cors = require("cors");
const app = express();
app.set('view engine', 'html')
app.use(cors());
app.use(express.json());
const Subscriber = require("./models/subscribers");
// app.use(express.static(__dirname));

// Your code goes here
// app.get("/",(req,res)=>{
//    res.sendFile(__dirname + '/index.html');
  
// });


//hear i have created route for subscribers.
const route =express.Router();
app.use("/subscribers",route)
//making a get request to get all the subscribers list; 
route.get("/", async(req,res)=>{
     try {
        const Allsubscribers = await Subscriber.find();
      //   console.log(Allsubscribers)
        res.status(200).json({data: Allsubscribers});
        
     } catch (err) {
      //   console.log(err);
      res.status(404).json({ message: err.message });
     }
});

//hear making a get request for getting all the subscribers name;
route.get("/names", async(req,res)=>{
    try {
       const subscriberNames = await Subscriber.find({},{name:1,subscribedChannel:1,_id:0});
     
       res.status(200).json(subscriberNames);
       
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

//hear making a request for getting a details of a given id;
route.get("/:id", async(req,res)=>{
    try {
        const getid = req.params.id;
       const subscriber = await Subscriber.find({_id:getid},{name:1,subscribedChannel:1,_id:0});
       res.status(200).json(subscriber);  
       
    } catch (err) {
      // if id does not match it is sending a error message;
     res.status(400).json({message:"id does not match"});
    }
});
























module.exports = app;

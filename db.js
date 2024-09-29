const mongoose = require('mongoose');
require('dotenv').config();
//Define the MongoDB URL
//const mongoURL='mongodb://127.0.0.1:27017/studen' // Replae 'mydatabase' with your database name
//const mongoURL ='mongodb+srv://pandeyrohit8340:64EwWrCUo7xSmjGE@cluster0.5sijv.mongodb.net/'
 const mongoURL=process.env.DB_URL;

//set up MongoDB connection
mongoose.connect(mongoURL,{
    /* useNewUrlParser:true,
    useUnifiedTopology:true */
})


//Get the default connection 
// Mongoose maintains a default connection object representing the MongoDB onnection .

const db=mongoose.connection;
// Define event listeners for database connection 

db.on('connected', ()=>{
    console.log('Connected to MongoDB server');
});

db.on('error', (err)=>{
    console.error('MongoDB connection error :', err);
});

db.on('disconnected ', ()=>{
    console.log('mongoDB disconnected');
});

// Export the database connection 

module.exports=db;

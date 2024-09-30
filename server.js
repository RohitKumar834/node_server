 const express = require('express');
const app = express();
const db=require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const PORT = process.env.PORT || 3000
//Middleware Function

const logRequest = (req , res , next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to :  ${req.originalUrl}`);
    next();
}



app.use(logRequest);
//demo api
app.get('/', function(req,res){
    res.send('hello developer rohit ');
});


//import the router files
const personRoutes = require('./routes/personRoutes');
const menuRouter = require ('./routes/menuRoutes');
const userRouter = require('./routes/userRouter');

//Use the router

app.use('/person', personRoutes);
app.use('/menu', menuRouter);
app.use('/user', userRouter);



app.listen(5000, ()=>{
    console.log('use the port 5000')
}) ;




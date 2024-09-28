const express = require('express');
const router  = express.Router();
const Users = require('./../models/User');

//create users api
router.post('/',async (req,res)=>{

    try{

        const data = req.body // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newUsers = new Users(data);

    // save the new data peron to the database 
    const savedPerson = await newUsers.save();
    console.log('data saved ');
    res.status(200).json(savedPerson);

    } catch(err){
        console.log(err);
        res.status(500).json({error: 'user not created'})

    }
    
})

router.get('/', async (req, res)=>{
    try{
        const data=await Users.find();
        console.log ('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'data no fetched !'});

    } 
    
})

module.exports=router;

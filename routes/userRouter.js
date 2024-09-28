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

//create update api 

router.put('/:id', async (req, res )=>{
    try{
        const userId = req.params.id;
        const updateduserData = req.body;

        const respons = await Users.findByIdAndUpdate(userId, updateduserData, {
            new :true,
            runValidators:true,
          })

          if(!respons){
            return res.status(404).json({error: 'user updated not clear'});
          }

          console.log('data updated');
          res.status(200).json(respons);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Problem  not complete the updated data'})
    }
})

module.exports=router;

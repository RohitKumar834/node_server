const express = require('express');
const router  = express.Router();
const Person=require('./../models/Person');


//create api person
router.post('/',async (req,res)=>{
    try{

        const data = req.body // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // save the new data peron to the database 
    const savedPerson = await newPerson.save();
    console.log('data saved ');
    res.status(200).json(savedPerson);

    } catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})

    }
})



//Get method to get the person

router.get('/', async(req,res)=>{
    try{
        const data=await Person.find();
        console.log ('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'data no fetched !'});

    }
})


// Parametrised API calls

router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType== 'chef' || workType == 'manager' || workType == 'waiter')
        {
           const  respons = await Person.find({work: workType});
           console.log('response featch ');
           res.status(200).json(respons);

        }else{
          res.status(404).json({error: 'Invalid work type error !'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error '})

    }
})
   // update api 
router.put('/:id', async (req , res)=>{
    try{
          const personId = req.params.id;
          const updatedPersonData = req.body;

          const respons = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new :true,
            runValidators:true,
          })

          if(!respons){
            return res.status(404).json({error: 'Person not found'});
          }

          console.log('data updated');
          res.status(200).json(respons);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'data updated error '})
    }
})


//delete api

router.delete('/:id', async (req , res)=>{
    try{
       const personId = req.params.id;
       const respons = await Person.findByIdAndDelete(personId);
       if(!respons){
        return res.status(404).json({error:'Person not found'})
       }
        console.log('data deleted ');
        res.status(200).json({message:'person Deleted Successfully'});

    } catch(err){
        console.log(err);
        res.status(500).json({error:'data not Deleted '})
    }
})

//add server page

module.exports = router;
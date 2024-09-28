const express = require('express');
const router  = express.Router();
const MenuItem =require ('./../models/Menu');

//create menu api

router.post('/',async (req,res)=>{
    try{

        const menudata = req.body // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newMenuItem = new MenuItem(menudata);

    // save the new data peron to the database 
    const respons = await newMenuItem.save();
    console.log('data saved ');
    res.status(200).json(respons);

    } catch(err){
        console.log(err);
        res.status(500).json({error: ' Error menu item'})

    }
})

//create api to get the menu data.

router.get('/', async (req, res)=>{
    try{
        const data=await MenuItem.find();
        console.log ('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'data no fetched !'});

    } 
    
})

//paramatries api

router.get('/:taste', async(req, res)=>{
    try{
        const taste = req.params.taste;
        if(taste== 'sweet' || taste == 'spicy' || taste == 'sour')
            {
               const  respons = await MenuItem.find({taste: taste});
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

router.put('/:id', async (req , res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenuId = req.body;

        const respons = await MenuItem.findByIdAndUpdate(menuId, updatedMenuId, {
            new :true,
            runValidators:true,
          })
          if(!respons){
            return res.status(404).json({error: 'Menu not found'});
          }

          console.log('data updated');
          res.status(200).json(respons);

    }catch(err){

        console.log(err);
        res.status(500).json({error:'Problem  not complete the updated data'})
    }
})


module.exports=router;
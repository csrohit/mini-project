const express = require('express'),
    Bin = require('../models/bin'),
    nodemailer = require('nodemailer'),
    http = require('http'),
    axios = require('axios'),
    router = express.Router();

    router.post('/',async(req,res)=>{
        /* Route for registering a dust bin */
        try{
            console.log(req.body);

        let name = req.body.name,
        lotitude = req.body.latitude,
        longitude = req.body.longitude;

    const newBin = {
        'name':name,
        'longitude':longitude,
        'latitude':latitude
    }
    let bin =await Bin.createBin(newBin);
    console.log(bin);
    return res.send("Bin created");
        }catch(e){
            console.log(e);
            return res.send("Error occurred");
        }
    });


    module.exports = router;
const express = require('express'),
    Bin = require('../models/bin'),
    nodemailer = require('nodemailer'),
    http = require('http'),
    axios = require('axios'),
    router = express.Router();
var wet=0,dry=0;

/* Homepage */
router.get('/',(req,res)=>{
return res.render('bin/dashboard');
});
router.get('/dry',(req, res)=>{

    http.get('http://192.168.43.244/dry', (resp) => {
        let data = '';
      
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(data);
          res.send(data);
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    
    // return res.send("20");
});
router.get('/wet',(req, res)=>{
    http.get('http://192.168.43.244/wet', (resp) => {
    let data = '';
  
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(data);
      res.send(data);
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});
router.post('/create',async(req,res)=>{

});

router.get('/wet-full',async(req,res)=>{
    if(wet==1)
        return res.json({'received':'OK'});
    wet=1;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'rohitnimkarme@gmail.com',
               pass: 'Mysite_#12398'
           }
       });
    //    let html = await Handlebars.precompile('static/home');
    //    console.log(html);
       const mailOptions = {
        from: 'rohitnimkarme@gmail.com', // sender address
        to: 'nehalnimkar@gmail.com', // list of receivers
        subject: 'Dump your waste', // Subject line
        html: `<h2> Dear Prateek Kumar Singh, </h2>
                <p>Dustbin no.1 containing wet garbage is full, we have informed the concerned authorities have been informed. Expect our dump van by today evening...</p><cite>Regards,<br>Pimpri Chinchwad Municipal Corporation.</cite>`
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          return res.send(err);
        else
          return res.send(info);
     });
});

router.get('/dry-full',async(req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'rohitnimkarme@gmail.com',
               pass: 'Mysite_#12398'
           }
       });
    //    let html = await Handlebars.precompile('static/home');
    //    console.log(html);
       const mailOptions = {
        from: 'rohitnimkarme@gmail.com', // sender address
        to: 'nehalnimkar@gmail.com', // list of receivers
        subject: 'Dump your waste', // Subject line
        html: `<h2> Dear Prateek Kumar Singh, </h2>
                <p>Dustbin no.2 containing dry garbage is full, we have informed the concerned authorities have been informed. Expect our dump van by today evening...</p><cite>Regards,<br>Pimpri Chinchwad Municipal Corporation.</cite>`
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          
        return res.json({'received':'NO'});
        else
         
        return res.json({'received':'OK'});
     });
});

// router.get('/test', async (req, res)=>{
//     try{
//         throw new Error("Custom error");
//         return res.json({
//             'result':'Successfull'
//         });
//     }catch(e){
//         console.log(e);
//         return res.json({
//             'result':'Error'
//         });
//     }
// });

module.exports = router;
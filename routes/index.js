const express = require('express'),
    router = express.Router();

/* Homepage */
router.get('/',(req,res)=>{
return res.render('bin/dashboard');
});
router.get('/dry',(req, res)=>{
    return res.send("10");
});
router.get('/test', async (req, res)=>{
    try{
        throw new Error("Custom error");
        return res.json({
            'result':'Successfull'
        });
    }catch(e){
        console.log(e);
        return res.json({
            'result':'Error'
        });
    }
});

module.exports = router;
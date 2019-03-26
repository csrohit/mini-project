const express = require('express'),
    User =require('../../models/user'),
    router = express.Router();

router.post('/',async (req,res)=>{
    /* Create user */
    console.log("received");

    return res.json(req.body);
});
router.put('/',async (req, res)=>{
    /* Update user */
    return;
});
router.get('/', async (req, res)=>{
    if(req.header['accept']=='application/json'){
        /* Get json array of all listed users */
        return;
    }
    /* Get HTML list page of all users */
    return;
});
router.delete('/',async(req, res)=>{
    /* Delete an user */
    return;
});

module.exports = router;
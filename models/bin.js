const mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    err = require('../lib/err'),
    Function = require('../lib/functions'),
    Schema = mongoose.Schema;

const binSchema = new Schema({
    wet:{
        type:Number
    },
    dry:{
        type:Number
    },
    location:{
        type:String,
        require:true
    },
    name:{
        type:Schema.Types.ObjectId,
        required:true
    }
});

const Bin = module.exports = mongoose.model('Bin',binSchema);
module.exports.createBin = (newBin)=>{
    return new Promise(async (resolve, reject)=>{
    newBin.save((err,bin)=>{
        if(err)return reject ("Error creating Bin");
        return resolve(bin);
    });
    });
}

module.exports.updateWet = (_id,wetStatus)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            let query = await Bin.updateOne({'_id':_id},{$set:{'wet':wetStatus}});
            return resolve(query);
        }catch(e){
            return reject("error updating wet value");
        }
    })
}
module.exports.updateDry = (_id,wetStatus)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            let query = await Bin.updateOne({'_id':_id},{$set:{'dry':wetStatus}});
            return resolve(query);
        }catch(e){
            return reject("error updating dry value");
        }
    })
}

module.exports.fetchBin = _id=>{
    return new Promise(async(resolve,reject)=>{
        let query = Bin.findById(_id);
        try{
            return resolve(await query.exec());
        }catch(e){
            return reject("Unable to find bin");
        }
    });
}
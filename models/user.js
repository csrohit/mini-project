const mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    err = require('../lib/err'),
    Function = require('../lib/functions'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:Schema.Types.ObjectId,
        required:true
    },
    role:{
        type:Schema.Types.String,
        enum:['pcmc','user','secretary'],
        required:true
    },
    contact_no:{
        type:Schema.Types.
    }
});

const user = module.exports = mongoose.model('User',userSchema);
module.exports.createUser = (newUser)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(10,(err,salt)=>{
            if (err) return reject("Error generating salt \n"+err);
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) return reject ("Error hashing password\n"+err);
                newUser.password = hash;
                newUser.save((err, newUser)=>{
                    if (err) return reject ("Error creating user.\n"+err);
                    return resolve(newUser);
                })
            });
        });
    });
}

// module.exports.fetchUserbyUsername = (username, options)=>{
//     return new Promise(async(resolve, reject)=>{
//         try{
//             let query = user.findOne({'username':username}),
//             fields = options && options['select'],
//             populate = options && options['populate'];
//             fields?
//         }catch(e){
//             return reject ("Error fetching user.\n"+e);
//         }
//     });
// };

module.exports.encryptPassword = password=>{
    return new Promise(async (resolve, reject)=>{
        try{
            bcrypt.genSalt(10, (err,salt)=>{
                // if(err) throw 
            });
        }catch(e){
            return reject(e);
        }
    });
}
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')

module.exports = {

  attributes: {
       id: {
           type: 'integer',
           autoIncrement: true,
           primaryKey: true
        },
        name: {
           type: 'string'
        },
        email: {
           type: 'string',
           unique: true
        },
        password: {
           type: 'string'
        }
  },
connection: 'MongoDB',



  hashPassword: function (values,cb) {
      bcrypt.genSalt(10, function (err,salt) {
         if(err) return cb(err);
         bcrypt.hash(values.password, salt, function (err, hash) {
            if(err) return cb(err);
            values.password = hash;
            cb(null,hash);
         })
      })
   },

   comparePassword: function(password,userObj,cb) {
      bcrypt.compare(password,userObj,function (err, match) {

         if(err) cb(err);
         if(match) {
           console.log('password matched')
           cb(null,true);
         } else {
            cb(err);
         }
      })
   },


    login:function(opts,cb) {

     User.findOne({email: opts.email},function(err,userObj) {


            if(err) return cb(err);

            if(!userObj || userObj == undefined){

              return cb({message: "Invalid email or password", status: 400});

            }else{

               User.comparePassword(opts.password,userObj.password,function(err,result){

                if(err){

                   console.log('some error has occured')

                }console.log('opts',opts)
                 console.log('userObj',userObj)
            return cb(null,{token:sailsTokenAuth.issueToken(opts)});
               //let token=sailsTokenAuth.issueToken(opts);
              //  userObj.token:token;
              //  return cb(null,userObj)

                // userObj.token:token;


                // return cb(null,userObj);

               })



            }
          });

        },



    signup: function(input,cb){

      User.findOne({email:input.email}).exec(function(err, userFound){

           if(!err && !userFound){

               User.hashPassword(input,function(err,result){
                  if(err){

                    console.log('error has happened');

                    cb(err);

                  }

                  let payload={

                    email:input.email,

                    password:result

                  }

                  User.create(payload).exec(function(err,userCreated){
                        if(!err && userCreated){
                           cb(null,{token:sailsTokenAuth.issueToken(payload)});
                        }else{

                         cb(err);

                       }

                   });

               })

            }else if(!err && userFound){
              cb({message: "User already exists"});
            }else{
              cb(err);
             }
            });
      }



}

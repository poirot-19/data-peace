const express=require('express');

const {User}=require('../models/user');
var {mongoose}=require('../mongoose/mongoose');
var mongoosePaginate = require('mongoose-paginate');


const router=express.Router();

router.get('/users',(req,res)=>{

  var x=2;
  var page = req.query.page;
  var limit = req.query.limit;
  var name = req.query.name;
  var sortParam = req.query.sortParam;

  var x=1;
  var len=sortParam.length;
  if(sortParam.charAt(0)==='-'){
   x = -1;
   sortParam=sortParam.substr(1,len-1);
  }else {
   x = 1;
  }

  User.paginate({ $or:[ {'first_name':{ "$regex": name, "$options": "i" }}, {'last_name':{ "$regex": name, "$options": "i" }} ]}
                  ,[{ page: page, limit: Number(limit), sort:{sortParam:x} }], function(err, result) {
    if(err){
      console.log(err);
    } else{
      res.status(200).send(result.docs);
    }
  });

});


router.post('/users',function(req,res){
        var user=new User({
        id            :req.body.id,
        first_name    :req.body.first_name,
        last_name     :req.body.last_name,
        company_name  :req.body.company_name,
        age           :req.body.age,
        city          :req.body.city,
        state         :req.body.state,
        zip           :req.body.zip,
        email         :req.body.email,
        web           :req.body.web,
        });

        user.save(function(err,registeredUser){
        if(err)
        console.log(e);
        else {
          res.status(201).send('User Created');
          }
        });
      });


router.get('/users/:id', (req, res) => {
        var id = req.params.id;
        User.findOne({
          id: id
        }).then((user) => {
          if (!user) {
            return res.status(404).send('User not found');
          }
          console.log(user);
          res.status(200).send({user});
        }).catch((e) => {
          res.status(400).send(e);
        });
      });

router.put('/users/:id', (req, res) => {
              var id = req.params.id;
              User.findOne({
                id: id
              }).then((user) => {
                if (!user) {
                  return res.status(404).send('User not found');
                }
                user.first_name=req.body.first_name;
                user.last_name =req.body.last_name;
                user.age       =req.body.age;

                user.save(function(err,user){
                if(err)
                console.log(e);
                else {
                  res.status(200).send(user);
                }
                });

              }).catch((e) => {
                res.status(400).send(e);
              });
            });


router.delete('/users/:id', (req, res) => {
              var id = req.params.id;
              User.findOneAndRemove({
                id: id,
              }).then((user) => {
                if (!user) {
                  return res.status(404).send('User not found');
                }
                res.status(200).send(user);
              }).catch((e) => {
                res.status(400).send(e);
              });
            });


module.exports=router;

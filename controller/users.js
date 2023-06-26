const mongoose = require('mongoose');
const User = require('../models/user');

const findAllGeoUsers = (req, res) => {
  User.find().then((users) =>{
      console.log('users FindAll GeoUsers Success');
      var geousers = {type: "FeatureCollection", "features":[]};
      users.map(item=>{
          geousers.features.push(
              {
                  type: "Feature",
                  geometry: {
                      type: "Point",
                      coordinates: [parseFloat(item.latestLongitude), parseFloat(item.latestLatitude)]
                  },
                  properties:{
                      name: item.name,
                      username: item.username
                  },
                  id: item._id
              }
          );
      });
      res.status(200).json(geousers);
  },
  err => {
      console.log('Users FindAll GeoUsers Error');
      err && res.status(500).send(err.message);
  });
}

const findAllUsers = (req, res) => {
  User.find().then((users) => {
    console.log('Users FindAll Succes');
    res.status(200).json(users);
  },
    err => {
      console.log('Users FindAll Error');
      err && res.status(500).send(err.message);
    });
};

const findById = (req, res) => {
  console.log(req.params);
  User.findById(req.params.id).then((user) => {
    res.status(200).json(user);
  },
    err => {
      err && res.status(500).send(err.message);
    });
};

const findByUsername = (req, res) => {
  console.log(req.params.username);
  User.find({username:req.params.username}).then((user) => {
      res.status(200).json(user);
  },
  err => {
      err && res.status(500).send(err.message);
  });
};

const addUser = (req, res) => {
  let user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    latestLatitude: req.body.latestLatitude,
    latestLongitude: req.body.latestLongitude
  });
  user.save().then((usr) => {
    res.status(200).json(usr);
  },
    err => {
      err && res.status(500).send(err.message);
    });
};

const updateUserLocation = (req, res) => {
  console.log(req.body);
  const key = Object.keys(req.body)[0];
  // console.log(key);
  const parsedKey = JSON.parse(key);
  // console.log(parsedKey);
  User.updateOne({_id:parsedKey.id}, 
      {latestLaltitude:parsedKey.latestLaltitude, 
          latestLongitude: parsedKey.latestLongitude}).then((usr) =>{
          res.status(200).json(usr);
      },
      err => {
          err && res.status(500).send(err.message);
  });
}
const removeById = (req, res) => {
  console.log(req.params);
  User.findByIdAndDelete(req.params.id).then((user) => {
      res.status(200).json(user);
  },
  err => {
      err && res.status(500).send(err.message);
  });
};
const updUserLocation = (req, res) => {
  console.log(req.body);
  User.updateOne({_id:req.body.id}, 
      {latestLaltitude:req.body.latestLaltitude, 
          latestLongitude: req.body.latestLongitude}).then((usr) =>{
          res.status(200).json(usr);
      },
      err => {
          err && res.status(500).send(err.message);
  });
}
  

module.exports = {findAllGeoUsers, findAllUsers, findById, addUser, updateUserLocation, findByUsername, removeById, updUserLocation };
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./api/users');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./sslcerts/key.key', 'utf8');
var certificate = fs.readFileSync('./sslcerts/crt.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

app.use('/api/users', User);
var httpsServer = https.createServer(credentials, app);

mongoose.connect(
  "mongodb://127.0.0.1/users",
  { useNewUrlParser: true }
).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ 
          app.listen(4000, ()=>{
              console.log('Server running on http://192.168.0.12:4000');
          })
          httpsServer.listen(5176, ()=>{
            console.log('Server running on https://192.168.0.12:5176');
          });
  },
  err => { /** handle initial connection error */ 
          err & console.log(err) & console.log('Error connecting to db');
  }
);

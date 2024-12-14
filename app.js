const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./util/database'); 
const User=require('./models/User')


const app = express();
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const userroutes = require('./routes/user');

app.use(userroutes);

 
sequelize
.sync()
.then((result) => {
  // console.log(result);
  app.listen(2000);
})
.catch((err) => {
  console.log(err);
});

 
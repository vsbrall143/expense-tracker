const fs=require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./util/database'); 
 

const Expense=require('./models/User')
const User=require('./models/SignupUser')
const Order=require('./models/orders')
const Forgot=require('./models/Forgot')
const userroutes = require('./routes/user');
const compression=require('compression')
const helmet=require('helmet');
const morgan=require('morgan');
const app = express();
var cors = require('cors');

const accessLogStream=fs.createWriteStream(
  path.join(__dirname,'access.log'),
  {flags:'a'}
);

app.use(morgan('combined',{stream:accessLogStream}));
app.use(helmet());
app.use(compression());
 
app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userroutes);


User.hasMany(Expense);       //relation of user with expenses
Expense.belongsTo(User);
 
User.hasMany(Order);         //relation of user with orders
Order.belongsTo(User);

User.hasMany(Forgot);
Forgot.belongsTo(User);

 

sequelize
.sync()
.then((result) => {
  // console.log(result);
  app.listen(process.env.PORT || 3000);
})
.catch((err) => {
  console.log(err);
});

 
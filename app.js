const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./util/database'); 
 


const app = express();
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const userroutes = require('./routes/user');

app.use(userroutes);

const Expense=require('./models/User')
const User=require('./models/SignupUser')
const Order=require('./models/orders')
const Forgot=require('./models/Forgot')

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
  app.listen(2000);
})
.catch((err) => {
  console.log(err);
});

 
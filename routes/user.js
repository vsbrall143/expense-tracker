const path = require('path');

const express = require('express');

const adminController = require('../controllers/user');

const router = express.Router();
 
const auth= require('../middleware/auth')


router.post('/user/add-user',adminController.postUser)

router.get('/user/get-expenses/:year' , adminController.getYearExpenses)

router.get('/user/get-expenses/:month/:year' , adminController.getMonthExpenses)

router.get('/user/get-expense/:day/:month/:year',auth.au, adminController.getExpense)  //req will go to authentication middle ware then to admin controller if sucessful
  
router.post('/user/signup', adminController.postsignup)

router.post('/user/login', adminController.postlogin)

module.exports = router;

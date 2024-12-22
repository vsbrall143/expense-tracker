const path = require('path');

const express = require('express');

const adminController = require('../controllers/user');

const router = express.Router();
 



router.post('/user/add-user',adminController.postUser)

router.get('/user/get-expenses/:year' , adminController.getYearExpenses)

router.get('/user/get-expenses/:month/:year' , adminController.getMonthExpenses)

router.get('/user/get-expense/:day/:month/:year' , adminController.getExpense)
  
router.post('/user/signup', adminController.postsignup)

module.exports = router;

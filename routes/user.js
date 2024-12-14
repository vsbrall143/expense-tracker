const path = require('path');

const express = require('express');

const adminController = require('../controllers/user');

const router = express.Router();

const User=require('../models/User')



router.post('/user/add-user',adminController.postUser)

router.get('/user/get-expenses' , adminController.getExpenses)

router.get('/user/get-expense/:Id' , adminController.getExpense)
  
router.delete('/user/delete-users/:prodId', adminController.deleteUser);

module.exports = router;

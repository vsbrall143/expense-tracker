const User=require('../models/User')
const signup=require('../models/SignupUser')
// const { Op } = require('sequelize');


exports.getMonthExpenses = async (req, res, next) => {
  try {
    // Extract month parameter from the request
    const month = req.params.month;
    const year =req.params.year;
    // Find all users (expenses) with the given month
    const users = await User.findAll({
      where: {
        month: month, // Filter records where month matches the parameter
        year:year
      }
    });

    // Send the filtered users as a response
    res.status(200).json({ users });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching month expenses:", error);
    res.status(500).json({ message: "Failed to fetch expenses for the given month" });
  }
};


exports.getYearExpenses = async (req, res, next) => {
  try {
    // Extract month parameter from the request
    const year = req.params.year;

    // Find all users (expenses) with the given month
    const users = await User.findAll({
      where: {
        year:year
      }
    });

    // Send the filtered users as a response
    res.status(200).json({ users });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching month expenses:", error);
    res.status(500).json({ message: "Failed to fetch expenses for the given month" });
  }
};
 


const { Op } = require('sequelize'); // Import Op for comparison operators
 

exports.getExpense = async (req, res, next) => {
  try {
    const day = parseInt(req.params.day, 10);  
    const month = req.params.month;  
    const year = parseInt(req.params.year, 10);  

    console.log(req.params);
    console.log(day);
    console.log(month);
    console.log(year);

    // Query all expenses for the specified day, month, and year
    const expenses = await User.findAll({
      where: {
        day: day,
        month: month,
        year: year
      }
    });

    // Query all expenses for days less than 'day' in the same month and year
    const expensesTillDay = await User.findAll({
      where: {
        day: { [Op.lt]: day},// Fetch days less than the current 'day'

        month: month,
        year: year
      }
    });

    // If no expenses are found for the given day
    if (expenses.length === 0 && expensesTillDay.length === 0) {
      return res.status(404).json({ message: 'No expenses found for the specified date.' });
    }

    // Send both 'expenses' and 'expensesTillDay' in the response
    res.status(200).json({ 
      expenses, 
      expensesTillDay 
    });

  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'An error occurred while fetching expenses.' });
  }
};


 exports.postUser = async (req, res, next) => {

 
   const day = req.body.day;
   const month = req.body.month;
   const year = req.body.year;
   const credit = req.body.credit;
   const debit = req.body.debit;
   const description = req.body.description;
   const data = await User.create({
 
     day: day,
     month: month,
     year: year,
     credit: credit,
     debit: debit,
     description: description,
   });
   res.status(201).json({ newUserDetails: data });


 };



exports.postsignup = async (req, res, next) => {

  console.log("hhhhhhhhh");
  console.log(req.body)
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
    
  const data = await signup.create({

    username: username,
    email: email,
    password: password
  });
  res.status(201).json({ newSignUpDetails: data });
};
const User=require('../models/User')
const signup=require('../models/SignupUser')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// const { Op } = require('sequelize');
const sequelize=require('../util/database'); 


exports.getMonthExpenses = async (req, res, next) => {
  try {
    // Extract month parameter from the request
    const email=req.user.email;

    const month = req.params.month;
    const year =req.params.year;
    // Find all users (expenses) with the given month
    const users = await User.findAll({
      where: {
        signupEmail:email,
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

    const email=req.user.email;
    // Find all users (expenses) with the given month
    const users = await User.findAll({
      where: {
        signupEmail:email,
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
 


const { Op, Transaction } = require('sequelize'); // Import Op for comparison operators
 

exports.getExpense = async (req, res, next) => {
  try {
    const day = parseInt(req.params.day, 10);  
    const month = req.params.month;  
    const year = parseInt(req.params.year, 10);  
    
    const email=req.user.email;
    // console.log(req.params);
    console.log(day);
    console.log(month);
    console.log(year);

    // Query all expenses for the specified day, month, and year
    const expenses = await User.findAll({
      where: {
        signupEmail:email,
        day: day,
        month: month,
        year: year
      }
    });

    // Query all expenses for days less than 'day' in the same month and year
    const expensesTillDay = await User.findAll({

      where: {
        signupEmail:email,
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
  const { day, month, year, credit = 0, debit = 0, description } = req.body;
  const email = req.user.email;

  // Start the transaction
  const t = await sequelize.transaction();

  try {
    // Create a transaction record
    const data = await User.create(
      {
        day,
        month,
        year,
        credit,
        debit,
        description,
        signupEmail: email,
      },
      { transaction: t }
    );

    // Find the user
    const user = await signup.findOne({ where: { email }, transaction: t });

    if (!user) {
      throw new Error("User not found.");
    }

    // Calculate the new total
    const newTotal = (user.total || 0) + credit - debit;

    // Update the user's total balance
    user.total = newTotal;
    await user.save({ transaction: t });

    // Commit the transaction if all operations are successful
    await t.commit();

    // Send success response
    res.status(201).json({ newUserDetails: data });
  } catch (error) {
    // Rollback the transaction in case of an error
    await t.rollback();
    console.error("Transaction failed:", error);
    res.status(500).json({ error: "An error occurred while processing the transaction." });
  }
};


 function generateAccessToken(email){
  return jwt.sign({email:email}, '8hy98h9yu89y98yn89y98y89')
 }


 
 exports.postlogin = async (req, res, next) => {
   try {
     const { email, password } = req.body;
 
     // Check if the user exists in the database
     const user = await signup.findOne({ where: { email } });
 
     if (!user) {
       return res.status(404).json({ message: "User does not exist" });
     }
 
     // Validate password using bcrypt
     const isMatch = await bcrypt.compare(password, user.password);
     if (isMatch) {
       return res.status(200).json({ success: true, message: "User logged in successfully" ,token:generateAccessToken(user.email)});
     } else {
       return res.status(400).json({ success: false, message: "Password is incorrect" });
     }
 
   } catch (error) {
     console.error("Error during login:", error);
     res.status(500).json({ message: "An error occurred during login." });
   }   
 };
 


 exports.postsignup = async (req, res, next) => {
  try {
    console.log("Handling signup request...");
    console.log(req.body);

    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await signup.findOne({ where: { email} });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    bcrypt.hash(password,10,async (err,hash) => {     //10 is for salt rounds more making passwo rd more unique
      console.log(err);
      await signup.create({username,email,password:hash})
      res.status(201).json({message:'sucessfully created new user'})
    })

    // Create a new user if the email is not taken
    // const data = await signup.create({
    //   username,
    //   email,
    //   password,
    // });

    // res.status(201).json({ newSignUpDetails: data });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "An error occurred during signup." });
  }
};

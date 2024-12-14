const User=require('../models/User')



exports.getExpenses= async (req, res, next) => {
  const users = await User.findAll();
  // console.log(users);
  res.status(200).json({allUsers: users});
 }

 exports.getExpense= async (req, res, next) => {

  const Id = parseInt(req.params.Id, 10);
  console.log(Id)
  
  const expense = await User.findByPk(Id);
  res.status(200).json({ expense });
 }

 exports.postUser = async (req, res, next) => {
   const type = req.body.type;
   const date = req.body.date;
   const amount = req.body.amount;
   const description = req.body.description;
   const data = await User.create({
     id: date,
     type: type,
     amount: amount,
     description: description,
   });
   res.status(201).json({ newUserDetails: data });

   // const date = Object.keys(req.body)[0];
   // console.log(date)
   // const data = await User.create({ day: date });
   //   // const data=await User.create(req.body);
   //   res.status(201).json({newUserDetails:data});
 };

 exports.deleteUser =  async (req, res, next) => {
  try {
    // Extract and validate the prodId
    const prodId = parseInt(req.params.prodId, 10);
    if (isNaN(prodId)) {
      return res.status(400).json({ message: 'Invalid Product ID.' });
    }

    // Attempt to delete the user
    const result = await User.destroy({
      where: { id: prodId },
    });

    if (result) {
      res.status(200).json({ message: 'User deleted successfully!' });
    } else {
      res.status(404).json({ message: 'User not found!' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An error occurred while deleting the user.' });
  }
}
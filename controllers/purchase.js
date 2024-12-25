const User=require('../models/User')
const signup=require('../models/SignupUser')
 
 
const jwt=require('jsonwebtoken');
const Order = require('../models/orders');
const Razorpay = require('razorpay');

const purchasepremium = async (req, res) => {
    console.log("purchase premium-controller--------------------------------------")
    try {
        const rzp = new Razorpay({
            key_id: 'rzp_test_J9qcGHmdTPOtbb',
            key_secret:'NlZ5IMkC8R4YC2KBFM9Z415C'
        });

        const amount = 250000; // Amount in smallest currency unit (e.g., paise for INR)

        rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }

            // Save the order details in the database with status as 'PENDING'
            try {
                await req.user.createOrder({ orderid: order.id, status: 'PENDING' });
                return res.status(201).json({ order, key_id: rzp.key_id });
            } catch (error) {
                console.error("Error saving order to database:", error);
                return res.status(500).json({ error: 'Failed to save order in the database' });
            }
        });
    } catch (error) {
        console.error("Error in purchasepremium:", error);
        return res.status(500).json({ error: 'Something went wrongggg' });  
    }
};


const updateTransactionStatus = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;

        // Find the order by order_id
        const order = await Order.findOne({ where: { orderid: order_id } });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update the order with payment details and status
        await order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });

        // Update the user to premium status
        if (req.user) {
            await req.user.update({ isPremium: true });
            return res.status(202).json({ success: true, message: "Transaction Successful" });
        } else {
            return res.status(400).json({ success: false, message: "User not found in request" });
        }
    } catch (err) {
        console.error('Error updating transaction status:', err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const isPremium = async (req, res) => {
    console.log("ispremium-controller--------------------------------------")
    const email=req.user.email;

 
    // Find all users (expenses) with the given month
    const user = await signup.findOne({
      where: {email:email}
    });
    const isPremium=user.isPremium;

    // Send the filtered users as a response
    res.status(200).json({ isPremium });
};




module.exports = { purchasepremium , updateTransactionStatus,isPremium};

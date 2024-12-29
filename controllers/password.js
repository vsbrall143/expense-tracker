require('dotenv').config();
const Sib = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');          //used to create unique user id for sending to email for reset password
const uniqueId=uuidv4();  
const Forgot=require('../models/Forgot')

const client = Sib.ApiClient.instance;
var apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;
console.log(process.env.API_KEY);

const forgotPassword = async (req, res) => {
    try {
        console.log("Email received:", req.body.email);

        const tranEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: 'vsbrall143@gmail.com',
            name: 'Yourssssssssss' // Optional: Adds a sender name for better branding.
        };

        const receivers = [
            {
                email: req.body.email
            }
        ];

        const id=uniqueId;
        const signupEmail=req.body.email;
        const isActive=true;

        const data = await Forgot.create({id,signupEmail,isActive});
      
        const emailResponse = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,

            subject: "Password Reset",
            textContent: `this is your password reset link \n\n http://localhost:3000/password/resetpassword/${uniqueId} \n\nBest regards,\nCoding Team`,
        });

        console.log("Email sent successfully:", emailResponse);
        res.status(200).json({ message: "Email sent successfully", emailResponse });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
};

const resetPassword = async (req, res) => {

    const uuid_from_link=req.params.uuid;  
    console.log(uuid_from_link)

    const resetRequest = await Forgot.findOne({ where: { id:uuid_from_link , isActive:true } });

    console.log(resetRequest);

    if (!resetRequest) {
        return res.status(404).json({ success: false, message: "Reset link is not valid" });
    }

};


module.exports = { forgotPassword , resetPassword};

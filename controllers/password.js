require('dotenv').config();
const Sib = require('sib-api-v3-sdk');

const client = Sib.ApiClient.instance;
var apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

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

        const emailResponse = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Subscribe to Coding",
            textContent: `Hello,\n\nCheck out our coding courses for great learning opportunities!\n\nBest regards,\nCoding Team`,
        });

        console.log("Email sent successfully:", emailResponse);
        res.status(200).json({ message: "Email sent successfully", emailResponse });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email", error });
    }
};

module.exports = { forgotPassword };

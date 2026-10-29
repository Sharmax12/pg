const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); // Allows your HTML frontend code to communicate with this app safely


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
}
}); 

transporter.verify(function(err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log("SMTP Ready");
    }
});               


// Create the network subscription endpoint route
app.post('/api/subscribe', (req, res) => {
    const userTargetEmail = req.body.email;

    if (!userTargetEmail) {
        return res.status(400).json({ error: 'A valid email address payload is required.' });
    }

    // Design the custom transactional launch email parameters
    // Locate this block around line 25-30 of your server.js file
const designTemplateOptions = {
    from: '"PG Finders" <aniruddhsharma669@gmail.com>',
    to: userTargetEmail,
    subject: "Welcome to PG Finders — You're on the waitlist! 🎉",

    html: `
    <div style="
        max-width:600px;
        margin:auto;
        padding:40px;
        font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        background:#ffffff;
        color:#1f2937;
        border-radius:16px;
        border:1px solid #e5e7eb;
    ">

        <div style="text-align:center; margin-bottom:30px;">

            <h1 style="
                margin:0;
                color:#22C55E;
                font-size:30px;
            ">
                Welcome to PG Finders 👋
            </h1>

            <p style="
                color:#6b7280;
                font-size:16px;
                margin-top:12px;
            ">
                You're officially on the waitlist.
            </p>

        </div>

        <p style="font-size:16px; line-height:1.8;">
            Hi,
        </p>

        <p style="font-size:16px; line-height:1.8;">
            Thank you for joining the <strong>PG Finders</strong> waitlist.
        </p>

        <p style="font-size:16px; line-height:1.8;">
            We're building a trusted platform to help students and young professionals discover verified PGs with transparent pricing, honest information, and better living standards.
        </p>

        <p style="font-size:16px; line-height:1.8;">
            Every signup motivates us to build something that makes finding a place to live simpler, safer, and more reliable.
        </p>

        <p style="font-size:16px; line-height:1.8;">
            As one of our early supporters, you'll be among the first to know when we launch and receive early access to PG Finders.
        </p>

        <div style="
            background:#f9fafb;
            border-left:4px solid #22C55E;
            padding:18px;
            margin:30px 0;
            border-radius:8px;
        ">
            <strong>Why PG Finders?</strong><br><br>

            ✓ Verified PG listings<br>
            ✓ Transparent pricing<br>
            ✓ Better food & hygiene standards<br>
            ✓ Built for students & young professionals
        </div>

        <p style="font-size:16px; line-height:1.8;">
            Thank you for believing in our vision.
        </p>

        <br>

        <p style="line-height:1.8;">
            Warm regards,<br><br>

            <strong>Aniruddh Sharma</strong><br>
            Founder, PG Finders<br>
            🌐 <a href="https://pgfinders.com" style="color:#22C55E; text-decoration:none;">pgfinders.com</a>
        </p>

        <hr style="
            margin:35px 0;
            border:none;
            border-top:1px solid #e5e7eb;
        ">

        <p style="
            text-align:center;
            color:#9ca3af;
            font-size:13px;
            line-height:1.6;
        ">
            You're receiving this email because you joined the PG Finders waitlist.<br>
            © 2026 PG Finders. All rights reserved.
        </p>

    </div>
    `
};


    // Execute message transmission delivery
    transporter.sendMail(designTemplateOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server initialization error. Failed to dispatch email code.' });
        }
        res.status(200).json({ message: 'Confirmation successfully dispatched!' });
    });
});

app.listen(3000, () => console.log('Waitlist authentication API active on port 3000.'));
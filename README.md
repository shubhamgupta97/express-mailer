# express-mailer
A sample application for sending emails using Nodemailer from Gmail using its SMTP server

## Steps:
1. Create a .env file in the root directory with following the keys:
    - `USER`: < yourEmailId >@gmail.com
    - `PASS`: password that you generate from [Gmail App Passwords](https://myaccount.google.com/apppasswords)
    - `PORT`: this is optional, if not provided app will run on port 3000
2. Make sure you have enabled Two-Step Verification on your [Gmail account](https://myaccount.google.com/). 
3. Simply run `npm start` and send a payload to `http://localhost:<port_number>/sendemail`
Payload - `` {
    to: <receiverEmailId>@gmail.com, 
    subject: "Your Email Subject"
} ``

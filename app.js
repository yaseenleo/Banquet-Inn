const express = require("express");
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
let transporter = nodemailer.createTransport({
    host: 'smtp.yahoo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "leo.yaseen@yahoo.com", // generated ethereal user
        pass: "samsang123456789" // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
    
});
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.post("/send_mail",(req,res)=>{
    let name = req.body.name,
        email = req.body.email,
        subject = req.body.subject,
        message = req.body.message;
        console.log("name",name);
        console.log("email",email);

        var mailOptions = {
            from: "Banquet Inn <leo.yaseen@yahoo.com>",
            to: "leo.yaseen@yahoo.com", // riazkhan@abbasaliandsons.com
            subject: subject,
            html: `<h1>${name}:${email}</h1>
            <p>${message}</p>
            `
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, response){
            if(error) console.log(error);
            else console.log("Message sent: " + response.messageId);
            // shut down the connection pool, no more messages
           // transporter.close();
        });

})
app.listen(80,()=>{
    console.log("server is started")
});


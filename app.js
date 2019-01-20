const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Banquets = require('./models/banquets');
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
mongoose.connect("mongodb://yaseen:natsikap1@ds159574.mlab.com:59574/banquetinn",{ useNewUrlParser: true  }, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connection with mongodb is successfull");

    }
});
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get("/",(req,res)=>{
        res.sendFile(path.join(__dirname,"/public/index.html"));
});
// app.get("/:page",(req,res)=>{
// let page = req.params.page;
// res.sendFile(path.join(__dirname,"/public/pages/"+page+".html"));
// })
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/pages/contact.html"));
});
app.get("/signup",(req,res)=>{
    // changes by ahmed
 //   res.sendFile(path.join(__dirname,"/public/pages/login/signup.html"));
 res.sendFile(path.join(__dirname, "/public/pages/login/clientSignUp.html"))

});
// changes by ahmed
app.post('/signup',(req,res)=>{
    let name = req.body.name,
    about = req.body.about,
    quantity= req.body.quantity,
    services =   req.body.services,
    email = req.body.email,
    phone = req.body.phone,
    address = req.body.address,
    owner = req.body.owner,
    username = req.body.username,
    password = req.body.password,
    reservations = JSON.stringify([]),
    applications = JSON.stringify([]);
    new Banquets({name,about,services,email,phone,address,owner,username,password,quantity,reservations,applications}).save((banquet)=>{
        console.log(banquet);
        res.redirect('/');
    })

})
app.get('/get_banquets',(req,res)=>{
    Banquets.find({},(err,banquets)=>{
        res.json({banquets:banquets});
        res.end();
    })
})
app.get("/specialsignup",(req, res)=>{
    res.sendFile(path.join(__dirname, "/public/pages/login/clientSignUp.html"))
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/pages/home.html"));
})
app.get("/banquet/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/pages/banquetpage.html"))
})
// app.get("/user/:id",(req,res)=>{
// let id = req.params.id;
// res.send(id);
// })
app.get("/signin",(req, res)=>{
res.sendFile(path.join(__dirname,"/public","/pages","/login","/signin.html"))
});
app.get("/banquetdetail",(req, res)=>{
    res.sendFile(path.join(__dirname,"/public/pages/banquetdetail.html"))
})
app.post("/book",(req,res)=>{
    let id = req.body.id,
        name = req.body.name,
        email = req.body.email,
        phone = req.body.phone,
        date = req.body.date,
        quantity = req.body.quantity;
        Banquets.findById(id,(err,banquet)=>{
            console.log(banquet);
            let applications = JSON.parse(banquet.applications);
            
                applications.push({
                    name,email,phone,date,quantity
                });
                console.log('application as null',applications);
                banquet.applications = JSON.stringify(applications);
                banquet.save(()=>{
                    res.redirect('/');
                })
            
        })
        console.log(req.body);
})
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


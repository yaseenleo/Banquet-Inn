const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const Banquets = require('./models/banquets');
var cookieParser = require('cookie-parser');
var sessions = require("express-session");

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
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(sessions({
    secret: 'ddfd344f4dud8d8d8d8j',
    resave: false,
    saveUninitialized: true
}));


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
app.get('/add_reservation/:name/:email/:phone/:date/:quantity/:price',(req,res)=>{
    let obj = req.params;
    let banquet_id =JSON.parse(req.cookies.banquet)._id;
    Banquets.findById(banquet_id,(err,banquet)=>{
        let reservations = JSON.parse(banquet.reservations);
        reservations.push(obj);
        console.log(reservations);
        banquet.reservations = JSON.stringify(reservations);
        banquet.save(()=>{
            res.redirect('/banquet_info');
        })
    })
})
app.get('/delete_application/:id/:date',(req,res)=>{
    let id= req.params.id ;
    let date = req.params.date;
    Banquets.findById(id,(err,banquet)=>{
        let index = -1;
        let applications = JSON.parse(banquet.applications);
        applications.forEach((application ,i)=>{
            if(application.date === date)
            {
                index = i
            }
        })
        applications.splice(index,1);
        banquet.applications = JSON.stringify(applications);
        banquet.save(()=>{
            res.redirect('/banquet_info');
        })
        
    })
    console.log(date);
})
app.get('/get_banquets',(req,res)=>{
    Banquets.find({},(err,banquets)=>{
        res.json({banquets:banquets});
        res.end();
    })
})
app.get('/get_banquet',(req,res)=>{
    let banq = JSON.parse(req.cookies.banquet);
    Banquets.findOne({_id:banq._id},(err,banquet)=>{
        res.json({banquet:banquet});
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
app.get("/about",(req, res)=>{
    res.sendFile(path.join(__dirname,"/public/pages/about.html"))
})
app.get("/gallery",(req, res)=>{
    res.sendFile(path.join(__dirname,"/public/pages/gallery.html"))
})
app.post('/signin',(req,res)=>{
    let email = req.body.email,
    password = req.body.password;
    Banquets.findOne({email:email,password:password},(err,banquet)=>{
        if(banquet===null){res.redirect('/')}
        else{
            res.cookie('banquet',JSON.stringify(banquet),{maxAge:1000*60*60*24*1});
            res.redirect('/banquet_info');
            console.log(banquet);
        }
       
    })
})
app.get('/logout',(req,res)=>{
    res.clearCookie("banquet");
    res.redirect("/");
})
app.get('/banquet_info',(req,res)=>{
    if(req.cookies.banquet){
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
      
        res.sendFile(path.join(__dirname,"/public/pages/bookinginfo.html"))
    }
    else{
        res.redirect('/');
    }
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


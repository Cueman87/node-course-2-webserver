const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.use((req, res, next)=> {
    var now = new Date().toString();
    console.log(now);
    var now = req.method;
    var log = new Date().getFullYear();
    console.log(now);
    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err) {
            console.log('unable to append to server.log file.');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello im a millionaire.</h1>');
    res.render('home.hbs', {
        welcomeMessage: 'Hi Iam a millionaire.',
        //currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req, res)=>{
    //res.send('about page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(3000);
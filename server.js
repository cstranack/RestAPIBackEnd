var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var Contact = require('./models/Contact.js');

var port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));
 
//connecting to the database
//port number for mongodb is 27017
mongoose.connect('mongodb://localhost:27017/test')
.then(()=>{
    console.log('Connected to database');
})

//error catcher
.catch(err =>{
    console.log('Not connected to database')
})



//web application getting something from the server
//req = request //res = response //=>'fat arrow' = function
app.get('/', (req, res) => {
    res.send('This is the homepage :D ');

});
//second page
app.get('/about', (req, res) => {
    res.send('This is the about page :D ');

});

//third page
app.get('/contact', (req, res) => {
    res.send('This is the contact page :D ');

});

app.post('/api/addContact', (req, res) => {
    const {name, email, number} = req.body;

    let contact = new Contact({
        name,
        email,
        number
    });

    contact.save();

    const requestURL = req.get('origin');
    res.redirect(requestURL);
});

app.get('/api/getContact', cors(), (req, res) =>{
    Contact.find({}, (err, docs) =>{
        res.json(docs);
    });
});


//listening for requests on port 3000
app.listen(port,() => {
    console.log(' Server listening on port 3000 :) ');
});
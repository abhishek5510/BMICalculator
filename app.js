var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const { response } = require('express');
const { render } = require('ejs');
const { request } = require('http');
var http = require('http');
var fs = require('fs');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'xxxdon0306',
	database : 'bmi'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded());
app.use(express.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/bmi.html'));
});
app.post('/b',(request,response)=>{
    var bmi = request.body.bb;
    if(bmi){
        connection.query("insert into bmiValues values (?)",[request.body.bb],function(error,results,field){
            if(error) 
                console.log(error);
            else{
                console.log("1 record inserted");
                response.redirect('/');
            }
        })
    }
})


app.get('/bring',function(request,response){
    connection.query("select * from bmiValues",function(error,results,field){
        if(error){
            console.log(error);
        }
        else{
            response.send(results);
        }
    })
})



app.listen(process.env.PORT || 5000)
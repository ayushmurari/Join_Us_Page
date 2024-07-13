var express= require('express');
var mysql=require('mysql2')
var app = express();

var bosyParser= require("body-parser");

app.set("view engine","ejs");
app.use(bosyParser.urlencoded({extented:true}));
app.use(express.static(__dirname+"/public"));

var connection=mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'Qwerty@0987',
 database:'join_us'
});


app.get("/",function(req,res){
    var q='SELECT count(*) as total from users';
    connection.query(q, function (error, results, fields) {
    if (error) throw error;
    console.log(results[0].total);
    var count=results[0].total;
  //res.send("We have "+count+" users in our database !!");
  res.render("home",{data:count});

  });
});

app.get("/joke",function(req,res){
  var joke="<strong>Hi, I am Ayush Murari , a data engineer working as <em>System Engineer.<em/><strong/>";
  res.send(joke);
});


app.post("/register",function(req,res){
  var person={
    email:req.body.email
  } ;
  connection.query('INSERT INTO users SET ?',person,function(err,result){
    if(err) throw err;
   // res.send("Thanks for joining our wait list !! :)");
   res.redirect("/");
  });

//console.log(req.body);

});

app.listen(3000,function(){
    console.log("Server running on 3000 !!");
});



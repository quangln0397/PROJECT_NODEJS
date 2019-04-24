var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://quanguit:quang123@cluster0-graky.mongodb.net/test?retryWrites=true";


var data;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
	var dbo = db.db("PHONGTRO");
	dbo.collection("phong").find({}).toArray(function(err,result){
		if(err) throw err;
		console.log(result[1].name);
		data = result;
		console.log(data[2].name);
		  db.close();
	});
});


app.use(express.static('public'));


//cau hinh EJS
app.set("view engine","ejs");
app.set("views", "./views");


app.listen(3000);


app.get("/", function(req,res){
	res.render("index",{data});
});

app.get("/dangtin", function(req,res){
	res.render("dangtin");
});

app.get("/chitiet", function(req,res){
	res.render("detail");
});

app.post("/", function(req,res){
	  res.send(data);
});

app.get("/data", function(req,res){
	 res.send(data);
});

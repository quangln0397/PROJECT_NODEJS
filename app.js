var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://quanguit:quang123@cluster0-graky.mongodb.net/test?retryWrites=true';
var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer  = require('multer')


//upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + req.user[0].username + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
//alert
var alert = require('alert-node');

var session = require('express-session');
//Post
var bodyParser = require('body-parser');

//Config bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Config Passport
app.use(session({secret: "mysecret", resave: true,
    saveUninitialized: true}));
app.use(Passport.initialize());
app.use(Passport.session());

var data;
var userinfor;

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
  dbo.collection("user").find({}).toArray(function(err,result){
    if(err) throw err;
    userinfor = result;
    console.log(userinfor[0].username);
      db.close();
  });


});


app.use(express.static('public'));


//cau hinh EJS
app.set("view engine","ejs");
app.set("views", "./views");


app.listen(3000);


app.get("/", function(req,res){
  if(req.isAuthenticated()){
	res.render("index",{data, user:req.user});
  console.log(req.user);
  }
  else{
  res.render("index",{data});
  }
});

app.get("/dangtin", function(req,res){
  if(req.isAuthenticated()){
	res.render("dangtin");
  }
  else{
    res.redirect("/dangnhap")
  }
});

app.get("/chitiet", function(req,res){
	res.render("detail");
});

app.post("/", function (req, res) {

});

app.get("/data", function(req,res){
	 res.send(data);
});
app.get("/dangnhap", function(req,res){
  res.render("dangnhap");
});
app.get("/dangky", function(req,res){
  res.render("dangky");
});

app.post("/dangnhap", Passport.authenticate('local', {failureRedirect: '/dangnhap', successRedirect:'/'})
    //db.close();
  );

  app.post("/dangky", function(req,res){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("PHONGTRO");
    var newuser = req.body;
     dbo.collection("user").find({username:req.body.username}).toArray(function(err, result){
      if(err) throw err
      if(result.length>0){
        console.log('Nguoi dung da ton tai');
      alert("Người dùng đã tồn tại");
      res.redirect("/dangky");


      }
      else{
        dbo.collection("user").insertOne(newuser, function(err, res) {
          if (err) throw err;
          console.log("Da them nguoi dung moi");

        alert("Bạn đã đăng ký thành công. Vui lòng đăng nhập lại!");


          db.close();
        });
        res.redirect("/dangnhap");

      }
    });
      //db.close();
    })
  });

app.get("/dangxuat", function(req,res){
  req.logout();
  res.redirect("/")
});




  Passport.use(new LocalStrategy(
    (username, password, done) => {
      MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("PHONGTRO");
      dbo.collection("user").find({username: username}).toArray(function(err, result){
        if(err) throw err;
        //console.log(result[0].username);
        if(result && result[0].password == password){
          return done(null, result);
        }
        else{
          return done(null,false);
        }
        db.close();
      });
    //  if(userRecord && userRecord.pwd == password){
    //    return done(null, userRecord);
  //    }
    //  else{
    //    return done(null,false);
  //    }
    });
    }
  ));

  Passport.serializeUser((user, done)=>{
    done(null, user);
  });

  Passport.deserializeUser((user, done)=>{
    done(null, user);
  });

app.get("/quenmk", (req,res)=>{
  res.render("quenmk");
}
);

app.post("/quenmk", (req,res)=>{
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("PHONGTRO");
  var mkuser = req.body;
   dbo.collection("user").find({username:req.body.username}).toArray(function(err, result){
    if(err) throw err
    if(result[0].Email == req.body.Email && result[0].SDT == req.body.SDT ){
      alert("Mật khẩu là:"+result[0].password);
    }
    else{
      alert("Thông tin người dùng cung cấp không đúng");

    }
    db.close();
  });
    //db.close();
  })
});

app.get("/updateUser", (req,res)=>{
      res.render("updateUser",{user:req.user});
      console.log(req.user);
    }
  );



app.post("/updateUser", upload.single("avatarUser"), (req,res)=>{ //update Avatar phía người dùng
  console.log(req.file);
  //console.log(JSON.stringify(req.body));
  console.log(req.user[0].username);
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("PHONGTRO");
    dbo.collection("user").updateOne({username : req.user[0].username}, { $set: { "avatar" : "uploads/" + req.file.filename} }, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    dbo.collection("user").find({username:req.user[0].username}).toArray(function(err, result){
     if(err) throw err
     if(result){
       req.user = result;
       console.log(req.user);
     }
       db.close();

  });
});
});
       setTimeout(function(){
         res.render("index",{data, user:req.user})
       }, 4000);


});

app.get("/admin", (req,res)=>{
  res.render("admin/admin");
});
app.get("/quanlyuser", (req,res)=>{
  setTimeout(function(){
    console.log(userinfor[0].Email);
    res.render("admin/quanlyuser",{userinfor});
  },2000); // Vì hàm callback xử lý bấtt đồng bộ tức là render gửi dữ liệu đi thì cài này sẽ thực hiện trước khi nó nhận dữ liệu về mà ko đợi nó thực hiện xong nên sẽ gặp lỗi

});
app.get("/quanlytin", (req,res)=>{
  setTimeout(function(){
    res.render("admin/quanlytin",{data});
  },2000);
});

app.get("/themuser", (req,res)=>{
  res.render("admin/themuser");
})

app.post("/themuser", (req,res)=>{
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("PHONGTRO");
  var newuser = req.body;
   dbo.collection("user").find({username:req.body.username}).toArray(function(err, result){
    if(err) throw err
    if(result.length>0){
      console.log('Nguoi dung da ton tai');
    alert("Người dùng đã tồn tại");
    res.redirect("/themuser");
    }
    else{
      dbo.collection("user").insertOne(newuser, function(err, res) {
        if (err) throw err;
        console.log("Da them nguoi dung moi");

      alert("Thêm người dùng thành công!");
        db.close();
      });
      res.redirect("/themuser");

    }
  });
    //db.close();
  })
})

app.get("/admin2", (req,res)=>{
  res.render("admin2/admin");
});
app.get("/quanlyuser2", (req,res)=>{
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("PHONGTRO");
  dbo.collection("user").find({}).toArray(function(err,result){
  if(err) throw err;
  userinfor = result;
  console.log(userinfor[0].username);
    db.close();
});});
  setTimeout(function(){
    res.render("admin2/quanlyuser",{userinfor});
  },1000);
  });
//Autoincr
app.get("/quanlybaidang", (req,res)=>{
  setTimeout(function(){
    res.render("admin2/quanlybaidang",{data});
  },200);
  });

  app.get("/removeUser/:username", (req,res)=>{
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("PHONGTRO");
    dbo.collection("user").deleteOne({username: req.params.username}, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
  });
  setTimeout(function(){
  dbo.collection("user").find({}).toArray(function(err,result){
  if(err) throw err;
  userinfor = result;
  console.log(userinfor[0].username);
    db.close();
  });},500);
  setTimeout(function(){
    res.redirect("/quanlyuser2");
  },1000);
});
//https://stackoverflow.com/questions/41660638/mongodb-does-not-refresh-data-automatically?answertab=oldest#tab-top
  });

  app.get("/editUser/:username", (req,res)=>{

    var EditUser;
    for(var i=0; i<userinfor.length;i++)
    {
      if(userinfor[i].username = req.params.username)
        var EditUser = userinfor[i];
    }
    console.log(EditUser);
    res.render("admin2/edituser",{EditUser});
  });

  app.post("/editUser/:username", (req,res)=>{
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("PHONGTRO");
      dbo.collection("user").updateOne({username : req.params.username}, { $set: { "username" : req.body.username,"Email": req.body.Email,"SDT": req.body.SDT} }, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      alert("Updated User!");
  });
});
  });

  app.get("/removePost/:ID", (req,res)=>{
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("PHONGTRO");
    dbo.collection("phong").deleteOne({ID: req.params.ID}, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
  });
  setTimeout(function(){
  dbo.collection("phong").find({}).toArray(function(err,result){
  if(err) throw err;
  data = result;
    db.close();
  });},500);
  setTimeout(function(){
    res.redirect("/quanlybaidang");
  },1000);
  });
});


app.get("/editPost/:ID", (req,res)=>{

  var EditPost;
  for(var i=0; i<data.length;i++)
  {
    if(req.params.ID == data[i].ID)
      var EditPost = data[i];
  }
  res.render("admin2/editPost",{EditPost});
});

app.get("/quanlybaidang/:filter", (req,res)=>{
  if(req.params.filter == "idtang"){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("PHONGTRO");
    dbo.collection("phong").find().sort({ID: 1}).toArray(function(err,result){
    if(err) throw err;
    data = result
    console.log(data);
      db.close();
  });});
    setTimeout(function(){
     res.redirect("/quanlybaidang");
    },1000);
    //};
  }
  if(req.params.filter == "idgiam"){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("PHONGTRO");
    dbo.collection("phong").find().sort({ID: -1}).toArray(function(err,result){
    if(err) throw err;
    data = result
    console.log(data);
      db.close();
  });});
    setTimeout(function(){
     res.redirect("/quanlybaidang");
    },1000);
    //};
  }
  if(req.params.filter == "phongchothue"){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("PHONGTRO");
    dbo.collection("phong").find({loai: "phòng cho thuê"}).toArray(function(err,result){
    if(err) throw err;
    data = result
    console.log(data);
      db.close();
  });});
    setTimeout(function(){
     res.redirect("/quanlybaidang");
   },1000);
  }

});



//Autoincreament
// multer upload image: https://www.youtube.com/watch?v=srPXMt1Q0nY, https://www.youtube.com/watch?v=YsfTfkl2jyQ&t=695s

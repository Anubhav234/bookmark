const express= require("express");
const path=require ("path");
const bodyparser=require("body-parser")
const app=express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Bookmark:bookmark1234@cluster0.fkf38.mongodb.net/Bookmarks', {useNewUrlParser: true ,useUnifiedTopology: true});
//moongoose
const contactSchema = new mongoose.Schema({
    name: String,
    url:String,
    tags:String
    
  });
  const Contact = mongoose.model('Bookmark', contactSchema);
//express
app.use('/static', express.static('static'))
app.use(express.urlencoded())
 

app.set('view engine','pug')//pug file 
app.set('views', path.join(__dirname,'views'))


app.get("/", (req,res)=>{
    const params={}
    res.render('Bookmark.pug',params)
});
 
app.get("/Bookmark", (req,res)=>{
    const params={}
    res.render('Bookmark.pug',params)
});
 
app.post("/Bookmark", (req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("THE BOOKMARK HAS BEEN CREATED")
    }).catch(()=>{
        res.status(400).send("item was not send")
    })
   // res.render('contact.pug')
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}






app.listen(port,function(){
    console.log("up and running")
})
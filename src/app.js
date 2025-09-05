const express =require('express')
const hbs=require('hbs')
const route=require('./routers/main')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');
const fileUpload = require('express-fileupload');
const { handlebars } = require('hbs');
require("./handlebar")//this hbs user made handlebars
const app=express();
app.use(fileUpload())
app.use(session({
    secret:"restorent_datails"
}))
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use('',route)
//static folder
app.use("/static",express.static("public"));
//template engine
app.set("view engine",'hbs')
app.set("views",'views')
//app.set("views","")
hbs.registerPartials('views/partials')





mongoose.connect(
  process.env.MONGO_URI || "mongodb://organic-release-mongodb.adi.svc.cluster.local:27017/restorent",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Server connected.."))
.catch(err => console.error("MongoDB connection error:", err));

app.listen(5656,()=>{
    console.log('server is start..')
})

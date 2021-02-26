const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

const itemsSchema={
    name:String
};

const Item=new mongoose.model("Item",itemsSchema);

app.get("/",function(req,res){

    Item.find({},function(err,foundItems){
        res.render("list",{kindOfDay:day,newItems:foundItems});
    });
    
    let today= new Date();
    let options ={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let day=today.toLocaleDateString("en-US",options);

   
});

app.post("/",function(req,res){
    let itemname=req.body.newItem;
    const item1 =new Item({
        name:itemname
    });
    
    Item.create(item1, function(err){
        if (err){
            console.log(err);
        }
        else{
            console.log("Success");
        }
    });
    res.redirect("/");
});

app.post("/delete",function(req,res){
    const checkedItem = req.body.checkbox;

    Item.findByIdAndRemove(checkedItem,function(err){
        if (err){
            console.log(err);
        }
        else{
            console.log("Success deleted");
        }
    });
    res.redirect("/");
});



app.listen(3000,function(){
    console.log("Server Running on 3000");
});
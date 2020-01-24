var express = require("express");
var app = express();
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
		{name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
		{name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
		{name: "Mountain Goats Rest", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"}
	];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("the yelpcamp server has started");
});
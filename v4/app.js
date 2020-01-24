var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Campground = require("./models/campground"),
	Comment     = require("./models/comment"),
	seedDB      = require("./seeds");


mongoose.connect('mongodb://localhost/yelp_camp_v4', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
seedDB();


app.get('/', function(req, res) {
    res.render('landing');
});

//INDEX -show all campgrounds
app.get('/campgrounds', function(req, res) {
    // get all campground from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });

});

//CREATE- add new campground
app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
	var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc };
	// create a new campground and save to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
			} else {
			 	//redirect to campground page
			 	res.redirect('/campgrounds');
			}
	});
});

//NEW- show form to create  new campground
app.get('/campgrounds/new', function(req, res) {
    res.render('campgrounds/new');
});

/// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
// ====================
// COMMENTS ROUTES
// ====================

app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log('the yelpcamp server has started');
});
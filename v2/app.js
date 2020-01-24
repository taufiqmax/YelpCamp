var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
	description: String
});
var Campground = mongoose.model('campground', campgroundSchema);

// Campground.create(
//     {
//         name: 'Salmon Creek',
//         image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg',
// 		description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"

//     },
//     function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('newly created campground : ');
//             console.log('campground');
//         }
//     }
// );

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
			res.render("index", {campgrounds: campgrounds});
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
    res.render('new.ejs');
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log('the yelpcamp server has started');
});
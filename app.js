const express = require ('express');
const app = express();
const machineAlgo = require('./machineAlgo.js');
const mongoose = require('mongoose');
const MovieSuggestor = require('./models/movie');
const AutoFillMovies = require('./models/autofillMovie');
const submitMovies = require('./submitMovies');
const Autofill = require('./autofill');

app.use(express.static(__dirname + '/views'));

//listen for requests
const PORT =process.env.PORT||3000;
//Database connections and run server
const dbURI = 'mongodb+srv://swetanshu:bagira343@moviesuggestor.ovw21.mongodb.net/moviesuggestor?retryWrites=true&w=majority';   // Connect to mongodb
mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true})
    .then((result)=> {
        app.listen(PORT, function(){
            console.log(`Server running on port ${PORT}...`)});
            console.log("Connected to database");
    })
    .catch((err)=> console.log(err));
 

// var bodyParser =  require('body-parser');
// var movies = require('./public/movies');
// movies.favorite();
//Register view Engine
// app.set('view engine', 'ejs');

//milldewares and static filters
app.use(express.urlencoded({extended:true}));       // FOR ACCEPTING FORM DATA

app.set('view engine', 'ejs'); //enable view engine
//app.set('views', 'myviews'); in case of a different folder of name my views

// app.listen(PORT, function(){
//     console.log(`Server running on port ${PORT}...`);
// });

app.get('/', (req, res) =>{ 
    //res.send('<p>Home page</p>');
    //res.sendfile('./public/index.html',{ root: __dirname});
    Autofill.Autofill(req,res);
});


//POST req handler
app.post('/submit-movies', (req, res) =>{
    submitMovies.submit(req,res);
});

//Autocomplete
app.get('/autocomplete/', function(req, res){
    var regx = new RegExp(req.query["term"], 'i');
    //var movieAutofill = MovieSuggestor.find({movie1: regx}, {'movie1': 1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(10);
    var movieAutofill = AutoFillMovies.find({movieList: regx}, {'movieList': 1}).limit(10);
    movieAutofill.exec(function (err, data){
        var results= [];
        if(!err){
            if(data && data.length && data.length>0){
                data.forEach(user=> {
                    let obj={
                        // id: user._id,
                        label: user.movieList
                        //label: user.movie1
                    };
                    results.push(obj);
                });
            }
        }
        res.jsonp(results);
    })
});

app.get('/about', (req, res) =>{ 
    // res.send('<p>About page</p>');
    //res.sendfile('./public/about.html',{ root: __dirname });
    res.render('about');
});

//fetch all data from database
app.get('/fetchData', (req, res)=> {
    MovieSuggestor.find()
        .then( (result)=> res.send(result))
        .catch( (err)=> console.log(err));
});
//add movie to database page ejs file
app.get('/addtodb', (req, res) =>{
    res.render('addtodb');
})

//To movie list to database function
app.post('/addToMovieList',function(req,res){
    const addmovie = AutoFillMovies({
        movieList: req.body.addmovie
    });
    console.log(addmovie);
    addmovie.save()
    .then((result)=> {
        console.log(result);

    }).catch((err)=> console.log(err));
    res.redirect('/addtodb');
});

//404 PAge, Always use at the last point, VERY IMPORTANT
app.use((req, res) =>{
    //res.sendfile('./public/404.html', { root: __dirname});
    res.render('404')
});
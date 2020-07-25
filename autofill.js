const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://swetanshu:bagira343@moviesuggestor.ovw21.gcp.mongodb.net/movies_data?retryWrites=true&w=majority';   // Connect to mongodb
mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true}).catch((err)=> console.log(err));
const AutoFillMovies = require('./models/autofillMovie');

function Autofill(req,res,errSent){
    var regx = new RegExp(req.query["term"], 'i');
    //var movieAutofill = MovieSuggestor.find({movie1: regx}, {'movie1': 1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(10);
    var movieAutofill = AutoFillMovies.find({movieList: regx}, {'movieList': 1}).lean();
    movieAutofill.exec(function (err, data){
        var results= [];
        if(!err){
            if(data && data.length && data.length>0){
                data.forEach(user=> {
                    let obj=user.movieList;
                    results.push(obj);
                    // console.log(obj);
                });
            }
        }
        // console.log(results);    
        var movieList=results;
        var errToDisplay= errSent ||' ';
        res.render('index',{errToDisplay, movieList}); //for ejs 
    })
}
module.exports = {Autofill};


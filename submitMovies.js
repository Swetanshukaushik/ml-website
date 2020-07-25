const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://swetanshu:bagira343@moviesuggestor.ovw21.gcp.mongodb.net/movies_data?retryWrites=true&w=majority';   // Connect to mongodb
mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true}).catch((err)=> console.log(err));
const MovieSuggestor = require('./models/movie');
const machineAlgo = require('./machineAlgo.js');
const Autofill = require('./autofill');

function submit(req,res){
    console.log("User Input = ", req.body);
    // var toSend = {
    //     SuggestedMovies: ["harry 1", 'harry 2', 'harry 3'],
    //     Review: "These are the good movies to watch"
    // }
    const Movie1= req.body.movie1;
    const Movie2= req.body.movie2;
    const Movie3= req.body.movie3;

    var movieList= [];
    // MovieSuggestor.find()
    //     .then( (result)=>console.log(result))
    //     .catch( (err)=> console.log(err))    ;
    // console.log(movieList);
    if(!(Movie1 && Movie2 && Movie3)){
         var errSent = 'Fill all fields';
        Autofill.Autofill(req,res,errSent);
    }else if((Movie1==Movie2) || (Movie2==Movie3) || (Movie1==Movie3)){
        var errSent='Fill different movies';
        Autofill.Autofill(req,res,errSent);
    }else{
        const sendToDatabase = new MovieSuggestor({
            movie1: Movie1,
            movie2: Movie2,
            movie3: Movie3
        });
        sendToDatabase.save()
            .then((result)=>{
                console.log(result);
                //toSend.db =(result);
            })
            .catch((err)=> console.log(err));
    
        machineAlgo.function1(req,res);
        //res.render('suggestions', {arrayToSend});
        //res.send(toSend);
}};
module.exports={submit};

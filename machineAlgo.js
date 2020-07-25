const spawn = require('child_process').spawn;

    function function1(req, res){
        //var process = spawn('python', ["./pythonScript.py", req.body.movie1, req.body.movie2, req.body.movie3 ]);
        var process =  spawn('python', ["pythonScript.py"]);
        process.stdout.on('data', function(data) {
            console.log("Piping data from python script...");
            var arrayToSend = JSON.parse(data);
			//console.log(data);
			res.render('suggestions', {arrayToSend});
            //res.send(arrayToSend);
        });
    };
    // function function2(){   
    //     var toSend = ['Titanic','Batman','Avengers','Inception'];
    //     return toSend;
    // };
    module.exports = { function1 };
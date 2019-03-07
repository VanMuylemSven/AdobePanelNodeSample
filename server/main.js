/* npm Modules */
const express = require("express");
const app = express();
const request = require('request');
const http = require('http');
const path = require("path");
const bodyParser = require("body-parser");
const fs = require('fs');
const httpServer = http.Server(app);

console.log("main.js code started");

module.exports = run
	
function run(){
    console.log("//////////////////////////////////////")
    console.log("SERVER CODE")
    var port = 3200;
    var hostname = "localhost"

    /* Start the server */
    httpServer.listen(port, hostname);

    /* Middlewares */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
    app.use(express.static(path.join(__dirname, "../client")));

    /* /import route that can be hit from the client side */
    app.get("/import", (req, res, next) => {
        
        console.log(" ========================= app.get ===========================");
        /* Get the directory path from the header and name the file */
        var path = req.headers["directory"] + "/placeholder.png"

        /* This is an example URL */
        var uri = "http://via.placeholder.com/350x150";
		
        /* write a helper function to download the image and save it */
        var saveImage = function(uri, filepath, callback){
            request.head(uri, function(err, res, body){
                request(uri).pipe(fs.createWriteStream(filepath)).on('close', callback);
            });
        };

        saveImage(uri, path, function(){
            /* Send the path back to the client side */
            res.status(200).send(path)
        });


    });
}
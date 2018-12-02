//requires
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
//added to format table 
var spotify = new Spotify(keys.spotify);
var cTable = require("console.table");
var request = require("request");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

//if/else statements to handle the different user inputs 
//concert-this
if (process.argv[2] == 'concert-this') {

    var artist = process.argv.slice(3).join(" ")
    console.log(artist);

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result = JSON.parse(body)[0];
        console.log("Venue name: " + result.venue.name);
        console.log("Venue location: " + result.venue.city);
        console.log("Date of Event: " + moment(result.datetime).format("MM/DD/YYYY"));
    });
//spotify-this-song
} else if (process.argv[2] == 'spotify-this-song') {

    var songName = process.argv.slice(3).join(" ");
    //if the song name is left blank, default to this silly song...
    if (!songName) {
        songName = "The sign + Ace of Base";
    }
    //if the song name is entered, query it via the spotify API and return one result
    spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var tableArray = [];

        for (var i = 0; i < data.tracks.items.length; i++) {
            var result = {
                artist: data.tracks.items[i].album.artists[0].name,
                album_name: data.tracks.items[i].album.name,
                song_name: data.tracks.items[i].name,
                preview_url: data.tracks.items[i].preview_url
            }
            tableArray.push(result);
        }
        var table = cTable.getTable(tableArray);

        console.log(table);
    });
//movie-this
} else if (process.argv[2] == 'movie-this') {
    var movieName = String(process.argv.slice(3));
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=de92683e";
    //if the movie name is left blank, default to Mr. Nobody
    if (!movieName) {
        movieName = "Mr. Nobody";
        queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=de92683e";
        axios.get(queryUrl).then(

            function (response) {
                //console.log(queryUrl);
                // console.log(response.data);
                console.log("Title:" + response.data.Title);
                console.log("Year:" + response.data.Released);
                console.log("IMDB Rating:" + response.data.imdbRating);
                console.log("Rotten Tomatoes:" + response.data.Ratings[1].Value);
                console.log("Country:" + response.data.Country);
                console.log("Language:" + response.data.Language);
                console.log("Movie Plot:" + response.data.Plot);
                console.log("Actors:" + response.data.Actors);

            });
    } else {
        axios.get(queryUrl).then(
            function (response) {
                // console.log(movieName);
                // console.log(response.data);
                console.log("Title:" + response.data.Title);
                console.log("Year:" + response.data.Released);
                console.log("IMDB Rating:" + response.data.imdbRating);
                console.log("Rotten Tomatoes:" + response.data.Ratings[1].Value);
                console.log("Country:" + response.data.Country);
                console.log("Language:" + response.data.Language);
                console.log("Movie Plot:" + response.data.Plot);
                console.log("Actors:" + response.data.Actors);

            });
    }
//do-what-it-says: read random.txt file, retrieve the information
} else if (process.argv[2] == 'do-what-it-says') {
    // console.log('do what it says')
    var fs = require("fs");
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        // console.log(data);
        //split the data from the random.txt file into two array items
        var data;
        data = data.split(","); 
        var search = data[0]; //the command(spotify-this-song, concert-this, or movie-this)
        var userInput = data[1]; //the thing the user is searching for (song title, band name, or movie title)
        // console.log(search + userInput);

        if (search == "spotify-this-song") {
            // console.log("this works");
            spotify.search({ type: 'track', query: userInput, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
        
                var tableArray = [];
        
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var result = {
                        artist: data.tracks.items[i].album.artists[0].name,
                        album_name: data.tracks.items[i].album.name,
                        song_name: data.tracks.items[i].name,
                        preview_url: data.tracks.items[i].preview_url
                    }
                    tableArray.push(result);
                }
                var table = cTable.getTable(tableArray);
        
                console.log(table);
            });
        };
    })
};
 






    
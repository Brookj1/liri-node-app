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

//if/else statements to handle the different user inputs 
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
 
} else if (process.argv[2] == 'spotify-this-song') {

    var songName = process.argv.slice(3).join(" ");

    if (songName == undefined) {
        songName = "The sign by Ace of Base";
    }

    spotify.search({ type: 'track', query: songName, limit: 10 }, function (err, data) {
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

} else if (process.argv[2] == 'movie-this') {
    var movieName = String(process.argv.slice(3));

    // if (movieName == undefined) {
    //     movieName = "Mr. Nobody";
    // }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=de92683e";
    axios.get(queryUrl).then(

    function(response) {
        
        // var result = JSON.parse(body);
        // console.log(response.data);
        console.log("Title :" + response.data.Title);
        console.log("Year :" + response.data.Released);
        console.log("IMDB Rating :" + response.data.imdbRating);
        console.log("Rotten Tomatoes :" + response.data.Ratings[1].Value);
        console.log("Country :" + response.data.Country);
        console.log("Language :" + response.data.Language);
        console.log("Movie Plot :" + response.data.Plot);
        console.log("Actors :" + response.data.Actors);

    });

} else if (process.argv[2] == 'do-what-it-says') {
    console.log('do what it says')
}

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//     return console.log('Error occurred: ' + err);
// }

// console.log(data); 
// });

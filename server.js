var Hapi = require('Hapi');
var Twit = require('twit');
var pg = require('pg');
var connectionString = 'postgres://joframart:evgax58@localhost:5432/moodpr'

var client = new pg.Client(connectionString);



//Load environment variables
require('dotenv').load();

var server = new Hapi.Server();
server.connection({port: 3000});

var count = 0;
//Setup environment variables
var T = new Twit({

	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET

});

var screen_name = 'joframart';

// var filter_stream = T.stream('statuses/filter', { track: '@'+screen_name });

// var stream = T.stream('statuses/filter', { track: '#HackPR', language: 'en' })

// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })

var puertoRico = ['-67.20', '17.52', '-65.08', '18.33'];

var stream = T.stream('statuses/filter', { locations: puertoRico })

stream.on('connect', function(response){

	console.log("Connected to Puerto Rico Stream...");
})
stream.on('tweet', function (tweet) {
	count++;
	console.log("\nTweet #"+ count + "\n");

	console.log("\tCreate At: " + tweet.created_at);
	console.log("\tUser: " + tweet.user.name);
	console.log("\tScreename: " + tweet.user.screen_name);
	console.log("\tDescription: " + tweet.user.description);
	console.log("\tLocation: " + tweet.user.location);
	console.log("\tText: " + tweet.text);
	console.log("\tCoordinates: " + JSON.stringify(tweet.coordinates));
	console.log("\tPlaces: " + JSON.stringify(tweet.place));

	// client.connect(function(err){

	// 		if(err){

	// 			return console.error('could not connect to postgres', err);
	// 		}
	// 		var coordinates = tweet.coordinates;

	// 		var point = '';

	// 		if(typeof coordinates == 'null'){
	// 			point = null;

	// 		}
	// 		else{

	// 			point = 'point(' + tweet.coordinates.coordinates[0] + ',' + tweet.coordinates.coordinates[1] + ')';
	// 		}
	// 		var query_string = "INSERT INTO tweet VALUES(" 
	// 			+ tweet.text + "," 
	// 			+ tweet.lang + ","
	// 			+ JSON.stringify(tweet.user) + "," 
	// 			+ JSON.stringify(tweet.entities) + ","
	// 			+ point + ","
	// 			+ JSON.stringify(tweet.place) + ","
	// 			+ 


	// 			)
	// 		client.query('INSERT INTO ')
	


	// })

})


var Hapi = require('Hapi');
var Twit = require('twit');
var pg = require('pg');
var connectionString = 'postgres://joframart:evgax58@localhost:5432/joframart'

var client = new pg.Client(connectionString);



//Load environment variables
require('dotenv').load();

var server = new Hapi.Server();
server.connection({port: 3000});

var count = 0;

//Establish Twit package
var T = new Twit({

	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET

});

//Puerto Rico's Box
var puertoRico = ['-67.20', '17.52', '-65.08', '18.33'];

//Stream filter for status and location inside of Puerto Rico
var stream = T.stream('statuses/filter', { locations: puertoRico })

//Listen for when the stream is connected
stream.on('connect', function(response){

	console.log("Connected to Puerto Rico Stream...");
})

//When a tweet is found
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

	/* Remove unwanted parts of JSON */
	var user = {

		created_at : tweet.user.created_at,
		description: tweet.user.description,
		name : tweet.user.name,
		screen_name: tweet.user.screen_name,
		geo_enabled: tweet.user.geo_enabled,
		entitites: tweet.user.entitites
	}

	/* Database pool of connections */
	pg.connect(connectionString, function(err, client, done){

			if(err){

				return console.error('could not connect to postgres', err);
			}
			console.log("Connecting to PostgresSQL");

			var coordinates = tweet.coordinates;

			var point = '';

			if(!point){
				point = null;

			}
			else{

				point = 'point(' + tweet.coordinates.coordinates[0] + ',' + tweet.coordinates.coordinates[1] + ')';
			}
	

        	client.query("INSERT INTO tweet(text,lang, userjson, entities, location, place, tweeted_at, timestamp_group, retrieved_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", 
        		[tweet.text, 
        		tweet.lang, 
        		JSON.stringify(user), 
        		JSON.stringify(tweet.entities), 
        		point,  
        		JSON.stringify(tweet.place), 
        		new Date(tweet.created_at), 
        		0, 
        		new Date()], 
        		
        		function(err, result){

					if(err){
						return console.error('error running query', err);
					}
					console.log('Tweet Saved');

					client.end();
			});
	

	})

})


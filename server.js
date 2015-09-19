var Hapi = require('Hapi');
var Twit = require('twit');
//Load environment variables
require('dotenv').load();

var server = new Hapi.Server();
server.connection({port: 3000});

//Setup environment variables
var T = new Twit({

	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET

});

var screen_name = 'joframart';
var filter_stream = T.stream('statuses/filter', { track: '@'+screen_name });
var user_stream = T.stream('user');


// Listen for favorite events
user_stream.on('favorite', function (eventMsg) {
  if (eventMsg.target.screen_name = screen_name) {
    console.log('@' + eventMsg.source.screen_name + ' has favorited a Tweet.');
  }
});

// Listen for follow events
user_stream.on('follow', function (eventMsg) {
  if (eventMsg.target.screen_name = screen_name) {
    console.log('@' + eventMsg.source.screen_name + ' is a now a follower.');
  }
});

// Listen for mention events
filter_stream.on('tweet', function (tweet) {
  console.log('@' + tweet.user.screen_name + ' Tweeted with a mention.');
})

filter_stream.on('connect', function(request){
	console.log('Listening for mentions of @' +screen_name + '...' );

});

user_stream.on('connect', function(request){

	console.log('Listening on suer stream for @' + screen_name + '...');
});



server.start(function(){

	console.log('Server running at: ', server.info.uri);

})
var puertoRico = [ '67.20', '17.52', '65.08', '18.33' ]

var stream = T.stream('statuses/filter', { locations: puertoRico })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})


var Hapi = require('Hapi');
var pg = require('pg');
var connectionString = 'postgres://joframart:evgax58@localhost:5432/joframart'
// var AlchemyAPI =  require ('alchemy-api');
// var alchemy = new AlchemyAPI(ALCHEMY_API);

var client = new pg.Client(connectionString);

//Load environment variables
require('dotenv').load();

// $$c(W 67°10'29"--W 67°07'11"/N 18°09'09"--N 18°14'53”)
var MayaguezCity = [ '-67.1029' , '18.0909' , '-67.0711' , '18.1453'];

var PonceCity= [ '-66.3932' , '17.5758' ,  '-66.3211' , '18.0304'];
// $$c(W 66°39'32"--W 66°32'11"/N 17°57'58"--N 18°03'04”)


//[Bayamon, SJ, Guaynabo, RioPiedras)
var AreaMetro=[ '66.1158' , '18.2834' , '66.0028' , '18.2037'];
// $$c(W 66°11'58"--W 66°00'28"/N 18°28'34"--N 18°20'37")

// $$c(W 66°03'54"--W 65°59'46"/N 18°15'56"--N 18°11'32")
var CaguasCity= ['-66.0354' , '18.1556' , '-65.5946' , '18.1132'];

// $$c(W 65°44'20"--W 65°36'44"/N 18°23'30"--N 18°17'12”)
var LuquilloFajardo=['-65.4420' , '18.2330' , '-65.3644' , '18.1712']

// $$c(W 65°34'38"--W 65°15'50"/N 18°10'01"--N 18°04'50”)
var ViequezCity= ['-65.3438' , '18.1001' , '-65.1550' , '18.0450'];

// $$c(W 66°31'01"--W 66°11'27"/N 18°16'40"--N 18°06'23”)
var AreaCentral= ['-66.3101', '18.1640' , '-66.1127' , '18.0623'];


//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(connectionString, function(err, client, done) {

  if(err) {
    return console.error('error fetching client from pool', err);
  }

  
  client.query('SELECT * FROM tweet WHERE tweeted_at BETWEEN ', ['2015-9-19 21:00:00', '2015-09-19 22:00:00'], function(err, result) {

    if(err) {
      return console.error('error running query', err);
    }

    for(var i = 0; i < result.rows.length; i++){
        var tweet = results.rows[i];

        //Calculate the centerpoint
        var bounding_box = tweet.place.bounding_box;

        var Y_length = (bounding_box.coordinates[0][0][1] - bounding_box.coordinates[0][1][1])/2;
        var X_length = (bounding_box.coordinates[0][0][0] - bounding_box.coordinates[0][2][0])/2;

        var box_bottom = (bounding_box.coordinates[0][1][1]);
        var box_right = (bounding_box.coordinates[0][2][0]);
        
        var centerpoint {
            LAT : box_bottom + Y_length;
            LONG: box_right + X_length;
        }

        
    }

    console.log(result.rows[0].number);
    //output: 1
  });
});





alchemy.sentiment(text,{},function(err,response){
		
		var sentiment = response.docSentiment;
		console.log(sentiment);
});


alchemy.apiKeyInfo({}, function(err, response) {
  if (err) throw err;

  // Do something with data
  console.log('Status:', response.status, 'Consumed:', response.consumedDailyTransactions, 'Limit:', response.dailyTransactionLimit);

});
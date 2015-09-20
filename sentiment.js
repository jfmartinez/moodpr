var Hapi = require('Hapi');
var pg = require('pg');
var ALCHEMY_API = '1eea1f486791ed840a7104a1d625d73fd323e282';
require('dotenv').load();
console.log(ALCHEMY_API);
var connectionString = 'postgres://joframart:evgax58@localhost:5432/joframart'
var AlchemyAPI =  require('alchemy-api');

var alchemy = new AlchemyAPI(ALCHEMY_API);

var client = new pg.Client(connectionString);

//Load environment variables

// $$c(W 67°10'29"--W 67°07'11"/N 18°09'09"--N 18°14'53”)
var MayaguezCity = {
  name: "Mayaguez",
  box: [[[-67.1958420277,18.1345658093],[-67.1958420277,18.2741938348],[-67.0563201904,18.2741938348],[-67.0563201904,18.1345658093]]],
  //box: [  '-67.11972222222222', '18.1525' , '-67.17472222222223' , '18.248055555555556'],
  locations: [],
  text: "",
  sentiment: 0.0,
  val: ""
};

18.248055555555556
var PonceCity= {
  name: "Ponce",
  box: [[[-66.6588852406,17.951823478],[-66.6588852406,18.0523035749],[-66.5385894775,18.0523035749],[-66.5385894775,17.951823478]]],
  //box: [ '-66.3932' , '17.5758' ,  '-66.3211' , '18.0304'],
  locations: [],
  text: "",
  sentiment: 0.0,
  val: ""
};
// $$c(W 66°39'32"--W 66°32'11"/N 17°57'58"--N 18°03'04”)

//[Bayamon, SJ, Guaynabo, RioPiedras)
var AreaMetro={
  name: "Metro",
  box: [[[-66.1809799671,18.2988435867],[-66.1809799671,18.4841002144],[-65.9782867432,18.4841002144],[-65.9782867432,18.2988435867]]],
  //box: [ '-66.1158' , '18.2834' , '-66.0028' , '18.2037'],
  locations: [],
  text: "",
  sentiment: 0.0,
  val: ""
};

// $$c(W 66°11'58"--W 66°00'28"/N 18°28'34"--N 18°20'37")

// $$c(W 66°03'54"--W 65°59'46"/N 18°15'56"--N 18°11'32")
var CaguasCity= {
  name: "Caguas",
  box: [[[-66.1136887074,18.128046943],[-66.1136887074,18.3133035706],[-65.9109954834,18.3133035706],[-65.9109954834,18.128046943]]],
  //box: ['-66.0354' , '18.1556' , '-65.5946' , '18.1132'],
  locations: [],
  text: "",
  sentiment: 0.0,
  val: ""
};



// $$c(W 65°44'20"--W 65°36'44"/N 18°23'30"--N 18°17'12”)
var LuquilloFajardo={
  name: "Fajardo",
  box: [[[-65.7415268421,18.2558459371],[-65.7415268421,18.4176278675],[-65.5882720947,18.4176278675],[-65.5882720947,18.2558459371]]],
  // box: ['-65.4420' , '18.2330' , '-65.3644' , '18.1712'],
  locations: [],
  text: "",
  sentiment: 0.0,
  val: ""
};

// $$c(W 65°34'38"--W 65°15'50"/N 18°10'01"--N 18°04'50”)
var ViequezCity= {
  name: "Vieques",
  box: [[[-65.6000778675,18.0354042872],[-65.6000778675,18.1971862176],[-65.258682251,18.1971862176],[-65.258682251,18.0354042872]]],
  //box: ['-65.3438' , '18.1001' , '-65.1550' , '18.0450'],
  locations: [],
  text: "",
  sentiment: 0.0,
  val: ""
};

// $$c(W 66°31'01"--W 66°11'27"/N 18°16'40"--N 18°06'23”)
var AreaCentral= {
  name: "Central",
  box: [[[-66.5174362659,18.09934805],[-66.5174362659,18.2741707877],[-66.1911468506,18.2741707877],[-66.1911468506,18.09934805]]],
 // box: ['-66.3101', '18.1640' , '-66.1127' , '18.0623'],
  locations: [],
  text: "",
  sentiment: 0.0,
  val: ""
};

var AREA_SENTIMENT = [
    
]
var AREAS = [
  MayaguezCity,
  PonceCity,
  AreaCentral,
  AreaMetro,
  CaguasCity,
  LuquilloFajardo,
  ViequezCity
];

var TIMESTAMP_START = '2015-9-19 21:00:00';
var TIMESTAMP_END = '2015-9-19 24:00:00';


//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
var Nigga_Check_Inside= function(Coord , AreaP){
var niggs = [AreaP[0][0][0],AreaP[0][0][1],AreaP[0][2][0],AreaP[0][1][1]];

// [-66.6588852406,17.951823478]66.5385894775,18.0523035749
// [ -66.5890535, 17.966772499999998 ]
if(Math.abs(Coord[0]) <= Math.abs(niggs[0]) && Math.abs(Coord[0]) >= Math.abs(niggs[2])){
    if(Coord[1] >= niggs[1] && Coord[1] <= niggs[3]){
        return true;
}}else{
        return false;

}
}

pg.connect(connectionString, function(err, client, done) {

  if(err) {
    return console.error('error fetching client from pool', err);
  }

  
  client.query('SELECT * FROM tweet WHERE tweeted_at BETWEEN $1 AND $2', [TIMESTAMP_START, TIMESTAMP_END], function(err, result) {

    if(err) {
      return console.error('error running query', err);
    }
    for(var i = 0; i < result.rows.length; i++){
        var tweet = result.rows[i];

        //Calculate the centerpoint
        var bounding_box = tweet.place.bounding_box;

        var Y_length = (bounding_box.coordinates[0][0][1] - bounding_box.coordinates[0][1][1])/2;
        var X_length = (bounding_box.coordinates[0][0][0] - bounding_box.coordinates[0][2][0])/2;

        var box_bottom = (bounding_box.coordinates[0][1][1]);
        var box_right = (bounding_box.coordinates[0][2][0]);
        
        var centerpoint = [box_right + X_length,box_bottom + Y_length];
        

        //Once we know the point we check to each area it belongs too
        // console.log(tweet.place);
        // console.log(JSON.stringify(bounding_box));
        // console.log(centerpoint);
        // console.log(tweet.place.name);

        AREAS.forEach(function(element, index, array){

            //Append the location
            var box = element.box;
            // console.log(element.name);
            //         console.log(JSON.stringify(bounding_box));

            // console.log(JSON.stringify(box));
            // console.log(centerpoint);
            if(Nigga_Check_Inside(centerpoint, box)){

              // console.log("INSIDE");
            // console.log(centerpoint);
                AREAS[index].locations.push(centerpoint);
                AREAS[index].text += tweet.text + "\n";

            }

        });
    }

        console.log("Tweets Retrieved: " + result.rows.length);


        AREAS.map(function(obj){

            alchemy.sentiment(obj.text, {}, function(err,response){
              if(err) {
                  return console.error('error running alchemy api', err);
              }

              obj.sentiment = response.docSentiment.score;
              obj.val = response.docSentiment.type;

              client.query("INSERT INTO area_sentiment(location,sentiment, value, timestamp_start, timestamp_end, name) VALUES($1, $2, $3, $4, $5, $6)", 
            [JSON.stringify(obj.locations), obj.sentiment, obj.val, TIMESTAMP_START,TIMESTAMP_END, obj.name], function(err, response){

                    if(err) {
                      return console.error('INSERTING INTO AREA_SENTIMENT: error running query', err);
                    }
            });

        });

        });
    // Done processing all rows now store areas in database
    // for(var i = 0; i < AREAS.length; i++){




    //     /* Do sentiment analysis for the area */
    //     alchemy.sentiment(AREAS[i].text, {}, function(err,response){
    //           if(err) {
    //               return console.error('error running alchemy api', err);
    //           }

    //           AREAS[i].sentiment = response.docSentiment.score;
    //           AREAS[i].val = response.docSentiment.type;

    //           client.query("INSERT INTO area_sentiment(location,sentiment, value, timestamp_start, timestamp_end) VALUES($1, $2, $3, $4, $5)", 
    //         [AREAS[i].locations, AREAS[i].sentiment, AREAS[i].val, new Date(TIMESTAMP_START), new Date(TIMESTAMP_END)], function(err, response){

    //                 if(err) {
    //                   return console.error('INSERTING INTO AREA_SENTIMENT: error running query', err);
    //                 }
    //         });

    //     });


    //output: 1
  // };
});
});
// var text = "Hello World!";

// alchemy.sentiment(text,{},function(err,response){
// 		  console.log(response);
// 		var sentiment = response.docSentiment;
// 		console.log(sentiment);
// });


alchemy.apiKeyInfo({}, function(err, response) {
  if (err) throw err;

  // Do something with data
  console.log('Status:', response.status, 'Consumed:', response.consumedDailyTransactions, 'Limit:', response.dailyTransactionLimit);

});
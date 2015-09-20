var AlchemyAPI =  require ('alchemy-api');
var alchemy = new AlchemyAPI('API_KEY');


var text="";



alchemy.sentiment(text,{},function(err,response){
		


		var sentiment = response.docSentiment;
		console.log(sentiment);
	});







alchemy.apiKeyInfo({}, function(err, response) {
  if (err) throw err;

  // Do something with data
  console.log('Status:', response.status, 'Consumed:', response.consumedDailyTransactions, 'Limit:', response.dailyTransactionLimit);

});
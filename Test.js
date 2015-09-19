var apikey='1eea1f486791ed840a7104a1d625d73fd323e282';

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI(apikey);

var myText="I'm super happy";
alchemy.entities(myText,{},function(err,response){
if(err) throw err;

var entities= response.entities;

console.log(entities);

});
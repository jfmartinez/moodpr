var Hapi = require('hapi');

var server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});

var pg = require('pg');

var connectionString = 'postgres://joframart:evgax58@localhost:5432/joframart'

var client = new pg.Client(connectionString);

server.connection({

	host: 'localhost',
	port: 4000
});

server.route({

	method: 'GET',
	path: '/sentiment',
	handler: function(request, reply)
	{
		console.log("Responding");
		pg.connect(connectionString, function(err, client, done) {

			client.query('SELECT * FROM area_sentiment WHERE timestamp_end = $1',
				[decodeURI(request.query.time)],

				function(err, response){
					console.log("response: " + response.rows.length);

				    if(err) {
				      return console.error('error running query', err);
				    }

				    reply(response.rows);



				});
		});
	}
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
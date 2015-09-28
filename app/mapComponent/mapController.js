'use strict';

angular.module('myApp.mapViewController', ['ngRoute', 'ngMap', 'angularAwesomeSlider'])

.config(function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'mapComponent/map.html',
  });
})

.controller('mapController', function($scope, $http) {

	$scope.mayaTags = [];	
	$scope.viequesTags;	
	$scope.luquilloTags;	
	$scope.ponceTags;	
	$scope.metroTags = [];	
	$scope.orocovisTags;	
	$scope.caguasTags;	

	$http({
		url : 'http://f0a1c97b.ngrok.io/trending',
		method : 'GET',
		params : { latitude : '18.207454', longitude : '-67.132630'}
	}).then(function(response){
		response.data.map(function(tweet){
			console.log(tweet);
			$scope.mayaTags.push(tweet.name);
		});
	});

	$http({
		url : 'http://f0a1c97b.ngrok.io/trending',
		method : 'GET',
		params : { latitude : '18.380677', longitude : '-66.102919'}
	}).then(function(response){
		response.data.map(function(tweet){
			console.log(tweet);
			$scope.metroTags.push(tweet.name);
		});
	});



	
	 
	//Variables
	$scope.ready = false;

	$scope.mayaguezVisible = false;
	$scope.viequesVisible = false;
	$scope.caguasVisible = false;
	$scope.metroVisible = false;
	$scope.luquilloVisible = false;
	$scope.orocovisVisible = false;
	$scope.ponceVisible = false;

	var time = new Date();
	var hour = time.getHours();
	var adjustedTime = hour - (hour % 3)
	time.setHours(adjustedTime);
	time.setMinutes(0);
	time.setSeconds(0);

	var thorsMonth = time.getMonth() + 1

	var timeURL = time.getFullYear()+"-"+thorsMonth+"-"+time.getUTCDate()+"%20"+time.getHours()+":00:00";

	console.log(timeURL);
	
	$scope.sliderValue = 0;
	$scope.sliderOptions = {				
        from: 24,
        to: 0,
        floor: true,
        step: 3,
        dimension: "Hrs",
        vertical: false,
        css: {
          background: {"background-color": "silver"},
          before: {"background-color": "white"},
          after: {"background-color": "green"},
          pointer: {"background-color": "red"}          
        },    
        callback: function(value, elt) {


            //Get the time
            var uTime = new Date();
			var uhour = time.getHours();
			var uAdjustedTime = hour - (hour % 3)
			uTime.setHours(uAdjustedTime - 3 - value);

			console.log(uTime.getHours());
			uTime.setMinutes(0);
			uTime.setSeconds(0);

			var uTimeURL = uTime.getFullYear()+"-"+thorsMonth+"-"+uTime.getUTCDate()+"%20"+uTime.getHours()+":00:00";

			$http({
				url : "http://f0a1c97b.ngrok.io/sentiment",
				method : "GET",
				params : { time :  uTimeURL }
			}).then(function(response){

				$scope.ready = false;


				response.data.map( function(region) {
					switch(region.value){
						case "negative":
							negativeData = negativeData.concat(region.location)
							break;
						case "positive":
							positiveData = positiveData.concat(region.location)
							break;
						default:
							break;
					}
				});

				negativeData.map(function(location){
					$scope.negativeData.push(new google.maps.LatLng(location[1], location[0]));

				});

				positiveData.map(function(location){
					$scope.positiveData.push(new google.maps.LatLng(location[1], location[0]));
				});


				//Wait until data is ready to setup maps
				$scope.ready = true;


			}, function(err){

				console.log("There was an error");

				console.log(err);
			});


        }				
    };

    var blueGradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];



    var negativeData = [];
	var positiveData = [];
	$scope.negativeData = [];
	$scope.positiveData = [];

	$http({
		url : "http://f0a1c97b.ngrok.io/sentiment",
		method : "GET",
		params : { time :  timeURL }
	}).then(function(response){

		$scope.ready = false;

		response.data.map( function(region) {
			switch(region.value){
				case "negative":
					negativeData = negativeData.concat(region.location)
					break;
				case "positive":
					positiveData = positiveData.concat(region.location)
					break;
				default:
					break;
			}
		});

		negativeData.map(function(location){
			$scope.negativeData.push(new google.maps.LatLng(location[1], location[0]));

		});

		positiveData.map(function(location){
			$scope.positiveData.push(new google.maps.LatLng(location[1], location[0]));
		});


		//Wait until data is ready to setup maps
		$scope.ready = true;


	}, function(err){

		console.log("There was an error");

		console.log(err);
	});

	var positiveHeatmap, negativeHeatmap, neutralHeatmap;
	$scope.$on('mapInitialized', function(event, map){
		positiveHeatmap = map.heatmapLayers.positive;

		positiveHeatmap.set('gradient', positiveHeatmap.get('gradient') ? null : blueGradient);

	});
   
});
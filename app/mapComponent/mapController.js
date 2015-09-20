'use strict';

angular.module('myApp.mapViewController', ['ngRoute', 'ngMap', 'angularAwesomeSlider'])

.config(function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'mapComponent/map.html',
  });
})

.controller('mapController', function($scope, $http) {

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
	$scope.sliderValue = 0;
	$scope.sliderOptions = {				
        from: 12,
        to: 0,
        floor: true,
        step: 6,
        dimension: "Hrs",
        vertical: false,
        css: {
          background: {"background-color": "silver"},
          before: {"background-color": "white"},
          after: {"background-color": "green"},
          pointer: {"background-color": "red"}          
        },    
        callback: function(value, elt) {
            console.log(value);
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

    var yellowGradient = [
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
    ]

    var negativeData = [];
	var positiveData = [];
	var neutralData = [];
	$scope.negativeData = [];
	$scope.positiveData = [];
	$scope.neutralData = [];

	$http({
		url : "http://f0a1c97b.ngrok.io/sentiment",
		method : "GET",
		params : { time : "2015-9-19%2024:00:00" }
	}).then(function(response){

		response.data.map( function(region) {
			switch(region.value){
				case "negative":
					negativeData = negativeData.concat(region.location)
					break;
				case "positive":
					positiveData = positiveData.concat(region.location)
					break;
				case "neutral":
					neutralData += neutralData.concat(region.location)
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

		neutralData.map(function(location){
			$scope.neutralData.push(new google.maps.LatLng(location[1], location[0]));
		});



		//Wait until data is ready to setup maps
		$scope.ready = true;


	}, function(err){

		console.log("There was an error");

		console.log(err);
	});

	var positiveHeatmap, negativeHeatmap, neutralHeatmap;
	$scope.$on('mapInitialized', function(event, map){
		console.log(map);
		positiveHeatmap = map.heatmapLayers.positive;
		negativeHeatmap = map.heatmapLayers.negative;
		neutralHeatmap = map.heatmapLayers.neutral;
		positiveHeatmap.set('gradient', positiveHeatmap.get('gradient') ? null : blueGradient);
		negativeHeatmap.set('gradient', negativeHeatmap.get('gradient') ? null : redGradient);
		neutralHeatmap.set('gradient', neutralHeatmap.get('gradient') ? null : yellowGradient);

	});

  
    
   
   
});
'use strict';

angular.module('myApp.mapViewController', ['ngRoute', 'ngMap'])

.config(function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'mapComponent/map.html',
    controller: 'mapController'
  });
})

.controller('mapController', function($scope) {

	//$http.get("/")

	 $scope.taxiData = [
  		new google.maps.LatLng(18.235150, -66.488842),
  		new google.maps.LatLng(18.235150, -66.488842),
  		new google.maps.LatLng(18.235150, -66.488842),
  		new google.maps.LatLng(18.235150, -66.488842),
  		new google.maps.LatLng(37.782, -122.439),
  		new google.maps.LatLng(37.782, -122.437),
  		new google.maps.LatLng(37.782, -122.435),
  		new google.maps.LatLng(37.785, -122.447),
  		new google.maps.LatLng(37.785, -122.445),
  		new google.maps.LatLng(37.785, -122.443),
  		new google.maps.LatLng(37.785, -122.441),
  		new google.maps.LatLng(37.785, -122.439),
  		new google.maps.LatLng(37.785, -122.437),
  		new google.maps.LatLng(37.785, -122.435)
	]

	var heatmap;
	$scope.$on('mapInitialized', function(event, map){
		heatmap = map.heatmapLayers.foo;
	});

	$scope.toggleHeatmap= function(event) {
    heatmap.setMap(heatmap.getMap() ? null : $scope.map);
  };

  

  $scope.changeGradient = function() {
    var gradient = [
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
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
  }

  $scope.changeRadius = function() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
  }

  $scope.changeOpacity = function() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
  }
   
});
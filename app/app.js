'use strict';
angular.module('myApp', [
  'ngRoute',      
  'ngMaterial',     
  'myApp.view1',  
  'myApp.view2'     
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');  

  $routeProvider
    .when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    })
    .when('/view2', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    })
    .otherwise({redirectTo: '/view1'}); 
}])

// Set up API key here
.value('apiKey', '');
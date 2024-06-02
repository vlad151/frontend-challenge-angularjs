'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', '$http', 'apiKey', function($scope, $http, apiKey) {
    $scope.searchQuery = '';
    $scope.sortOption = 'relevant';
    $scope.images = [];
    $scope.currentPage = 1;
    $scope.totalPages = 0;
    $scope.searchCompleted = false;

    if (!apiKey) {
      alert('API Key is missing. Please add your API Key as specified in the README.');
  }

    $scope.searchImages = function() {
        if (apiKey && $scope.searchQuery.length > 3) {
            const url = `https://api.unsplash.com/search/photos?per_page=20&page=${$scope.currentPage}&query=${encodeURIComponent($scope.searchQuery)}&order_by=${$scope.sortOption}&client_id=${apiKey}`;
            $http.get(url).then(function(response) {
                $scope.images = response.data.results;
                $scope.totalPages = response.data.total_pages;
                $scope.searchCompleted = true;
            }, function(error) {
                console.error('Error fetching images:', error);
            });
        }
    };

    $scope.checkEnter = function(event) {
        if (event.which === 13) { 
            $scope.searchImages();
        }
    };

    $scope.loadMoreImages = function() {
        if (apiKey) {
            $scope.currentPage++;
            const url = `https://api.unsplash.com/search/photos?page=${$scope.currentPage}&query=${encodeURIComponent($scope.searchQuery)}&order_by=${$scope.sortOption}&client_id=${apiKey}`;
            $http.get(url).then(function(response) {
                $scope.images = $scope.images.concat(response.data.results); 
                $scope.totalPages = response.data.total_pages;
                $scope.searchCompleted = true;
            }, function(error) {
                console.error('Error fetching images:', error);
            });
        }
    }
}]);

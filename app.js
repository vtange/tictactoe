(function() {
    //start of function
  var app = angular.module('Tictac', []);

app.factory('memory', function(){

  var storage = {};
 storage.datadata = [];

  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', 'memory', function($scope, memory){
    $scope.storage = memory; // load service

}]);//end of controller
  //end of function
})();

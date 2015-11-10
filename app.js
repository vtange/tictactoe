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
    $scope.player = "X";
    $scope.AI = "O";
    $scope.turn = 1;
    $scope.Xed = [];
    $scope.Oed = [];
    $scope.blanks = [1,2,3,4,5,6,7,8,9];
    $scope.draw = function(cellNum){
        if ($scope.Xed.indexOf(cellNum) == -1){
            $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);
            $scope.Xed.push(cellNum);
        }
        console.log($scope.Xed);
        console.log($scope.Oed);
        console.log($scope.blanks);
    }
    
    
    
    
    
}]);//end of controller
  //end of function
})();

(function() {
    //start of function
  var app = angular.module('Tictac', ['ngAnimate', 'ngAlertify']);

app.factory('memory', function(){

  var storage = {};
 storage.datadata = [];

  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', 'memory', 'alertify', function($scope, memory, alertify){
    $scope.storage = memory; // load service
    $scope.playerAsk = alertify
  .okBtn("O's")
  .cancelBtn("X's")
  .confirm("Are you O's or X's?", function (ev) {

      // The click event is in the
      // event variable, so you can use
      // it here.
      ev.preventDefault();
      $scope.player = 1;
      $scope.computer = 2;
      alertify.success("You are O's");

  }, function(ev) {

      // The click event is in the
      // event variable, so you can use
      // it here.
      ev.preventDefault();
      $scope.player = 2;
      $scope.computer = 1;
      alertify.error("You are X's");

  });
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
    };
    $scope.checkClickable = function(cellnum){
        if ($scope.blanks.indexOf(cellnum) != -1){ return true; }else{return false;};
    };
    $scope.checkX = function(cellnum){
        if ($scope.Xed.indexOf(cellnum) != -1){ return true; }else{return false;};
    };
    $scope.checkO = function(cellnum){
        if ($scope.Oed.indexOf(cellnum) != -1){ return true; }else{return false;};
    };
    
    
    
    
}]);//end of controller
  //end of function
})();

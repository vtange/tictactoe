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
    $scope.player = alertify
  .okBtn("Accept")
  .cancelBtn("Deny")
  .confirm("Confirm dialog with custom button labels", function (ev) {

      // The click event is in the
      // event variable, so you can use
      // it here.
      ev.preventDefault();
      alertify.success("You've clicked OK");

  }, function(ev) {

      // The click event is in the
      // event variable, so you can use
      // it here.
      ev.preventDefault();

      alertify.error("You've clicked Cancel");

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

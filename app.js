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
        if ($scope.player == 1){
            if ($scope.Oed.indexOf(cellNum) == -1){
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);
                $scope.Oed.push(cellNum);
            }
        }
        if ($scope.player == 2){
            if ($scope.Xed.indexOf(cellNum) == -1){
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);
                $scope.Xed.push(cellNum);
            }
        }
        console.log($scope.Xed);
        console.log($scope.Oed);
        console.log($scope.blanks);
        //check if board is  full or victory
        //start computer turn function
    };
    $scope.computerTurn = function(){
        if ($scope.computer == 1){
            if ($scope.Oed.indexOf(cellNum) == -1){
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);
                $scope.Oed.push(cellNum);
            }
        }
        if ($scope.computer == 2){
            if ($scope.Xed.indexOf(cellNum) == -1){
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);
                $scope.Xed.push(cellNum);
            }
        }
        //check if board is  full or victory
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
    $scope.checkVictoryFull = function(){
        //victoryConditions == 123,456,789,963,852,741,159,753
        var victoryConditions = [[1,2,3],[4,5,6],[7,8,9],[9,6,3],[8,5,2],[7,4,1],[1,5,9],[7,5,3]];
        //nearvictory == 12 45 78 23 56 89 74 85 96 14 25 36 15 75 95 35 
        var nearVictory = [[1,2],[4,5],[7,8],[2,3],[5,6],[8,9],[7,4],[8,5],[9,6],[1,4],[2,5],[3,6],[1,5],[7,5],[9,5],[3,5]];
        var XWon = victoryConditions[i].every(function (val) { return $scope.Xed.indexOf(val) >= 0; });
        var OWon = victoryConditions[i].every(function (val) { return $scope.Oed.indexOf(val) >= 0; });
        
        
        //reset board if draw, full board
        if ($scope.blanks === []){
            alert("Draw.");
            $scope.Xed = [];
            $scope.Oed = [];
            $scope.blanks = [1,2,3,4,5,6,7,8,9];
        }
    };
    
    
}]);//end of controller
  //end of function
})();

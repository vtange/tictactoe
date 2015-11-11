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
    $scope.whoseTurn = 1;
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
        $scope.checkVictoryFull();
        //start computer turn function
        //the two above should actually be in the player action ^ brackets (both), this ensures player makes a move (not click on already clicked)
    };
    $scope.computerTurn = function(){
        $scope.whoseTurn = 2;
        //nearvictory == 12 45 78 23 56 89 74 85 96 14 25 36 15 75 95 35 19 73 71 93 79 13
        var nearVictory = [[1,2],[4,5],[7,8],[2,3],[5,6],[8,9],[7,4],[8,5],[9,6],[1,4],[2,5],[3,6],[1,5],[7,5],[9,5],[3,5],[1,9],[7,3],[7,1],[9,3],[7,9],[1,3]];
        var defense = function(){
            var winningPattern = [];
            for(var i = 0; i < nearVictory.length; i++){
                if ($scope.player == 1;){
                    if (nearVictory[i].every(function (val) { return $scope.Oed.indexOf(val) >= 0; }) == true){
                        winningPattern = nearVictory[i];
                    };
                }
                if ($scope.player == 2;){
                    if (nearVictory[i].every(function (val) { return $scope.Xed.indexOf(val) >= 0; }) == true){
                        winningPattern = nearVictory[i];
                    };
                }
            }
            return winningPattern;
        };
        var offense = function(){
            var winningPattern = [];
            for(var i = 0; i < nearVictory.length; i++){
                if ($scope.computer == 1;){
                    if (nearVictory[i].every(function (val) { return $scope.Xed.indexOf(val) >= 0; }) == true){
                        winningPattern = nearVictory[i];
                    };
                }
                if ($scope.computer == 2;){
                    if (nearVictory[i].every(function (val) { return $scope.Oed.indexOf(val) >= 0; }) == true){
                        winningPattern = nearVictory[i];
                    };
                }
            }
            return winningPattern;
        };
        // how about just check Xed or Oed(depending on who the comp is) against victory conditions (filter out Xed/Oed from Victory conditions) and choose the shortest one?
        $scope.checkVictoryFull();
        $scope.whoseTurn = 1;
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
        var XWon = function(){
            var forReal = false;
            for(var i = 0; i < victoryConditions.length; i++){
                if (victoryConditions[i].every(function (val) { return $scope.Xed.indexOf(val) >= 0; }) == true){
                    forReal = true;
                };
            }
            return forReal;
        };
        var OWon = function(){
            var forReal = false;
            for(var i = 0; i < victoryConditions.length; i++){
                if (victoryConditions[i].every(function (val) { return $scope.Oed.indexOf(val) >= 0; }) == true){
                    forReal = true;
                };
            }
            return forReal;
        };
        console.log(XWon());
        console.log(OWon());
        if (XWon() == true){
            alert("X wins.");
            $scope.resetBoard();
        }
        if (OWon() == true){
            alert("O wins.");
            $scope.resetBoard();
        }
        /*//to make this work, have whoseTurn cycle during start and end of ComputerTurn function.
        if (XWon() == true || OWon() == true){
            if (whoseTurn == 1){
                alert("You won.");
            }
            if (whoseTurn == 2){
                alert("The Computer won.");
            }
            $scope.resetBoard();
        }
        */
        //reset board if draw, full board
        if ($scope.blanks === []){
            alert("Draw.");
            $scope.resetBoard();
        }
    };
    $scope.resetBoard = function(){
            $scope.Xed = [];
            $scope.Oed = [];
            $scope.blanks = [1,2,3,4,5,6,7,8,9];
    };
    
}]);//end of controller
  //end of function
})();

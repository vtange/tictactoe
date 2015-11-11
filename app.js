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
        if ($scope.player == 1){// if Player is O
            if ($scope.blanks.indexOf(cellNum) != -1){//if cellNum is blank
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);//remove from blank
                $scope.Oed.push(cellNum);//add to O list
                $scope.checkVictoryFull();
                $scope.computerTurn();
            }
        }
        if ($scope.player == 2){// if Player is X
            if ($scope.blanks.indexOf(cellNum) != -1){//if cellNum is blank
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);//remove from blank
                $scope.Xed.push(cellNum);//add to X list
                $scope.checkVictoryFull();
                $scope.computerTurn();
            }
        }
    };
    $scope.compDraw = function(cellNum){
        if ($scope.computer == 1){// if Computer is O
            if ($scope.blanks.indexOf(cellNum) != -1){//if cellNum is blank
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);//remove from blank
                $scope.Oed.push(cellNum);//add to O list
            }
        }
        if ($scope.computer == 2){// if Computer is X
            if ($scope.blanks.indexOf(cellNum) != -1){//if cellNum is blank
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);//remove from blank
                $scope.Xed.push(cellNum);//add to X list
            }
        }
    };
    $scope.computerTurn = function(){
        $scope.whoseTurn = 2;
        var victoryConditions = [[1,2,3],[4,5,6],[7,8,9],[9,6,3],[8,5,2],[7,4,1],[1,5,9],[7,5,3]];
        var justNeed = [];  // offense priority
        var mustBlock = []; // defense priority
        //check what X has
        var XalreadyGot = function (input) {
          return $scope.Xed.indexOf(input) == -1;
        };
        //check what O has
        var OalreadyGot = function (input) {
          return $scope.Oed.indexOf(input) == -1;
        };
        if ($scope.computer == 1){ // if Computer is O
            for (var i=0;i<victoryConditions.length;i++){
                //get offense options
                 mustBlock.push(victoryConditions[i].filter(XalreadyGot));
                //get defense options
                 justNeed.push(victoryConditions[i].filter(OalreadyGot));
            }
            justNeed = justNeed.sort(function(a,b){ return b.length > a.length;});
            justNeed = parseInt(justNeed.pop().join(""),10);
            mustBlock = mustBlock.sort(function(a,b){ return b.length > a.length;});
            mustBlock = parseInt(mustBlock.pop().join(""),10);
        }
        else { // if Computer is X
            for (var i=0;i<victoryConditions.length;i++){
                //get offense options
                 justNeed.push(victoryConditions[i].filter(XalreadyGot));
                //get defense options
                 mustBlock.push(victoryConditions[i].filter(OalreadyGot));
            }
            justNeed = justNeed.sort(function(a,b){ return b.length > a.length;});
            justNeed = parseInt(justNeed.pop().join(""),10);
            mustBlock = mustBlock.sort(function(a,b){ return b.length > a.length;});
            mustBlock = parseInt(mustBlock.pop().join(""),10);
        }
        if (mustBlock.length < 2){   //defend first,
            $scope.compDraw(mustBlock);
        }
        else if (justNeed.length < 2){ //then win.
            $scope.compDraw(justNeed);
        }
        else{           //choose a random index from the available scope.blanks
            $scope.compDraw($scope.blanks[Math.floor(Math.random() * ($scope.blanks.length))]);
        }
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
        if ($scope.blanks.length<1){
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

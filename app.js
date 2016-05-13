(function() {
    //start of function
	var app = angular.module('Tictac', ['ngAnimate', 'ngAlertify']);
		app.controller('MainCtrl', ['$scope', 'alertify', MainCtrl]);

function MainCtrl($scope, alertify){
    //prompt user for X or O
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
      alertify.success("You are O's");//Player is O

  }, function(ev) {

      // The click event is in the
      // event variable, so you can use
      // it here.
      ev.preventDefault();
      $scope.player = 2;
      $scope.computer = 1;
      alertify.error("You are X's");//Player is X

  });
    $scope.whoseTurn = 1;//Player Turn, if win, Player wins
    $scope.resetBoard = function(){
            $scope.Xed = [];
            $scope.Oed = [];
            $scope.blanks = [1,2,3,4,5,6,7,8,9];
    };
	$scope.resetBoard();
	$scope.endPhase = function(){
		$scope.checkVictoryFull();//check if Player won or draw
		if($scope.whoseTurn === 1){
        	$scope.computerTurn();//if player just went it's comp's turn
		}
		else{
        	$scope.whoseTurn = 1;//if comp just went it's player's turn now
		}	
	}
    $scope.draw = function(cellNum){
        if ($scope.player == 1){// if Player is O
            if ($scope.blanks.indexOf(cellNum) != -1){//if cellNum is blank
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);//remove from blank
                $scope.Oed.push(cellNum);//add to O list
            }
        }
        if ($scope.player == 2){// if Player is X
            if ($scope.blanks.indexOf(cellNum) != -1){//if cellNum is blank
                $scope.blanks.splice($scope.blanks.indexOf(cellNum),1);//remove from blank
                $scope.Xed.push(cellNum);//add to X list
            }
        }
		$scope.endPhase();
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
        $scope.whoseTurn = 2;//Computer Turn, if win, computer wins
        var alreadyMoved = false;//1 move per computer turn. Change to true once moved.
        var victoryConditions = [[1,2,3],[4,5,6],[7,8,9],[9,6,3],[8,5,2],[7,4,1],[1,5,9],[7,5,3]];
        var justNeed = [[100]];  // offense priority, 100 is placeholder so .sort has something to sort against
        var mustBlock = [[100]]; // defense priority, 100 is placeholder so .sort has something to sort against
		var opponent = [];
        //check what X has
        var XalreadyGot = function (input) {
          return $scope.Xed.indexOf(input) == -1;
        };
        //check what O has
        var OalreadyGot = function (input) {
          return $scope.Oed.indexOf(input) == -1;
        };
        var onlyOnes = function (input) {
          return input.length == 1;
        };
        if ($scope.computer == 1){ // if Computer is O
            for (var i=0;i<victoryConditions.length;i++){
				//mark opponent
				opponent = $scope.Xed;
                //get offense options
                 mustBlock.push(victoryConditions[i].filter(XalreadyGot));
                //get defense options
                 justNeed.push(victoryConditions[i].filter(OalreadyGot));
            }
		}
        else { // if Computer is X
            for (var i=0;i<victoryConditions.length;i++){
				//mark opponent
				opponent = $scope.Oed;
                //get offense options
                 justNeed.push(victoryConditions[i].filter(XalreadyGot));
                //get defense options
                 mustBlock.push(victoryConditions[i].filter(OalreadyGot));
            }
		}
            //process information, keep only arrays with one number
            justNeed = justNeed.sort(function(a,b){ return b.length > a.length;});
            justNeed = justNeed.filter(onlyOnes);

            mustBlock = mustBlock.sort(function(a,b){ return b.length > a.length;});
            mustBlock = mustBlock.filter(onlyOnes);
            //movement phase
            //win first. check for any available attack blanks, attack and Moved=true
                for (var k=1;k<justNeed.length;k++){//cycle attack options
                        if (alreadyMoved == false && $scope.blanks.indexOf(parseInt(justNeed[k].join(""),10)) != -1){
                            $scope.compDraw(parseInt(justNeed[k].join(""),10));
                            alreadyMoved = true;
                        }
                }
            //defend second, check for any available defense blanks, defend and Moved=true
                for (var k=1;k<mustBlock.length;k++){//cycle defense options
                        if (alreadyMoved == false && $scope.blanks.indexOf(parseInt(mustBlock[k].join(""),10)) != -1){
                            $scope.compDraw(parseInt(mustBlock[k].join(""),10));
                            alreadyMoved = true;
                        }
                }
            //if 5 is played by opponent, play a corner (1 should always be avail)
				if (opponent.length === 1 && opponent[0] === 5 && alreadyMoved == false){
					$scope.compDraw(1);
					alreadyMoved = true;
				}
            //if corner is played by opponent, play opposite corner
				if (opponent.length === 1 && opponent[0]%2!==0 && alreadyMoved == false){
					$scope.compDraw(function(){
					switch(opponent[0]){
						case 1: return 9;
						case 3: return 7;
						case 7: return 3;
						case 9: return 1;
					}}());
					alreadyMoved = true;
				}
            //otherwise, if 5 is not played yet, play 5
				if ($scope.blanks.indexOf(5) != -1 && alreadyMoved == false){
					$scope.compDraw(5);
					alreadyMoved = true;
				}
			//play nearest corner to opponent
				if (opponent.length < 3 && opponent[0]%2===0 && alreadyMoved == false){
					$scope.compDraw(function(){
					switch(opponent[0]){
						case 2: return 1;
						case 4: return 3;
						case 6: return 7;
						case 8: return 9;
					}}());
					alreadyMoved = true;
				}
            //choose a random index from the available scope.blanks
            if (alreadyMoved == false){
                $scope.compDraw($scope.blanks[Math.floor(Math.random() * ($scope.blanks.length))]);
            }
		
		//end phase
		$scope.endPhase();
    };
    $scope.checkClickable = function(cellnum){
        if ($scope.blanks.indexOf(cellnum) != -1){ return true; }else{return false;};//for css pointer mouse
    };
    $scope.checkX = function(cellnum){
        if ($scope.Xed.indexOf(cellnum) != -1){ return true; }else{return false;};//for ng-if
    };
    $scope.checkO = function(cellnum){
        if ($scope.Oed.indexOf(cellnum) != -1){ return true; }else{return false;};//for ng-if
    };
    $scope.checkVictoryFull = function(){
        //victoryConditions == 123,456,789,963,852,741,159,753
        var victoryConditions = [[1,2,3],[4,5,6],[7,8,9],[9,6,3],[8,5,2],[7,4,1],[1,5,9],[7,5,3]];
        var XWon = function(){
            var forReal = false;
            for(var i = 0; i < victoryConditions.length; i++){
                if (victoryConditions[i].every(function (val) { return $scope.Xed.indexOf(val) >= 0; }) == true){//find one array in victoryconditions where Xed fills all numbers
                    forReal = true;
                };
            }
            return forReal;
        };
        var OWon = function(){
            var forReal = false;
            for(var i = 0; i < victoryConditions.length; i++){
                if (victoryConditions[i].every(function (val) { return $scope.Oed.indexOf(val) >= 0; }) == true){//find one array in victoryconditions where Oed fills all numbers
                    forReal = true;
                };
            }
            return forReal;
        };
        //to make this work, have whoseTurn cycle during start and end of ComputerTurn function.
        if (XWon() == true || OWon() == true){
            if ($scope.whoseTurn == 1){
                alert("You won.");
            }
            if ($scope.whoseTurn == 2){
                alert("The Computer won.");
            }
            $scope.resetBoard();//fills blanks so bottom action doesn't fire
        }
        //reset board if no one won yet but full board
        if ($scope.blanks.length<1){
            alert("Draw.");
            $scope.resetBoard();
        }
    };
};
  //end of function
})();

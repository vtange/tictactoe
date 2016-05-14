![alt tag](http://res.cloudinary.com/dmj8qtant/image/upload/c_limit,w_600/v1454451482/r0bapegojtaum9o1b3c8.png)
# tictactoe

## Tech
AngularJS, ngAlertify, ngAnimate

## Tested with:
Karma, PhantomJS, Istanbul, Mocha, Chai, Sinon

## Niceties
Computer Players

### Details
#### CSS
 - ng-class 'Clickable' to control mouse pointer
 - Xs made of class "X1" & "X2", Ox made of class "O"

#### JS
 - 2 Player Turn based structure:
 
 ```
 Player Move -> Check Victory -> Computer Think -> Computer Move -> Check Victory -> Player Move
 ```
  -  Used "Victory Conditions" for AI to plan next move and to check victory, "Strategic Bias" for AI to make powerful moves before going random.
  
  1. Get all available moves
  2. Sort, find logical attacks and defense
  3. Attack (win) first, then defend, otherwise play strategically biased moves or leftovers.

 ```
        var strategicBias = [5,2,3,6,9];//computer bias, do these before random number
        var victoryConditions = [[1,2,3],[4,5,6],[7,8,9],[9,6,3],[8,5,2],[7,4,1],[1,5,9],[7,5,3]];
        ...
        (victoryConditions[i].every(function (val) { return $scope.Xed.indexOf(val) >= 0; }) == true){//find one array in victoryconditions where Xed fills all numbers
  ```
  

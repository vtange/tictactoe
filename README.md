# tictactoe

# Takeaways

 - ngAlertify, ngAnimate
 - CSS X's and O's, 'checkClickable' function, ng-animate class
 - 2 Player Turn based structure:
 
 ```
 Player Move -> Check Victory -> Computer Think -> Computer Move -> Check Victory -> Player Move
 ```
  -  Used "Victory Conditions" for AI to plan next move and to check victory, "Strategic Bias" for AI to make powerful moves before going random.
 ```
        var strategicBias = [5,2,3,6,9];//computer bias, do these before random number
        var victoryConditions = [[1,2,3],[4,5,6],[7,8,9],[9,6,3],[8,5,2],[7,4,1],[1,5,9],[7,5,3]];
        ...
        (victoryConditions[i].every(function (val) { return $scope.Xed.indexOf(val) >= 0; }) == true){//find one array in victoryconditions where Xed fills all numbers
  ```
  

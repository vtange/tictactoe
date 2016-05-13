describe('Tic Tac Toe Game: ', function() {

  var scope;
  var ctrl;

  beforeEach(module('Tictac'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
  }));


  describe('Game', function() {

	//always reset board
	//make sure player is X and computer is O
	beforeEach(function() {
		scope.resetBoard();
		scope.player = 2;
		scope.computer = 1;
	});
	  
	  //X and O should start blank, Blanks should be full
    it('should start with a blank board', function() {
      expect(scope.Xed).to.deep.equal([]);
      expect(scope.Oed).to.deep.equal([]);
      expect(scope.blanks).to.deep.equal([1,2,3,4,5,6,7,8,9]);
    });

	//should be player's turn first
	it("should be the Player's turn first", function() {
	  expect(scope.whoseTurn).to.equal(1);
	});

	describe('X plays 5, O plays 7', function() {

		//make sure player is X and computer is O
		beforeEach(function() {

		});

		//if player clicks, 5, 5 should be played by X
		it('should mark X on 5 if Player played 5', function() {
		});

		//if computer player clicks, 7, 7 should be played by O
		it('should mark O on 7 if Computer Player played 7', function() {
		});
	});

	describe('AI', function() {

		//make sure game state is blank for each test here
		beforeEach(function() {
		});

		//
		it('should play opposite corner if player starts with a corner move', function() {

		});

		//
		it('should play a corner if player starts with a center move', function() {

		});

		//
		it('should play center if player derps and plays a side', function() {

		});

	});
  });
});

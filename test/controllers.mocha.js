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
	beforeEach(function() {
		scope.resetBoard();
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
	describe('Drawing', function() {

		beforeEach(function() {
			// replace $scope.endPhase with an empty function (prevent comp turn on player draw)
			sinon.stub(scope, 'endPhase', function() {});
		});

		describe('X plays 5, O plays 7', function() {

			//make sure player is X and computer is O
			beforeEach(function() {
				scope.player = 2;
				scope.computer = 1;
				scope.draw(5);
				scope.compDraw(7);
			});

			//if player clicks, 5, 5 should be played by X
			it('should mark X on 5 if Player played 5', function() {
				expect(scope.checkX(5)).to.equal(true);
			});

			//if computer player clicks, 7, 7 should be played by O
			it('should mark O on 7 if Computer Player played 7', function() {
				expect(scope.checkO(7)).to.equal(true);
			});

			//5 and 7 should no longer by playable
			it('should no longer be able to play 5 or 7', function() {
				expect(scope.checkClickable(5)).to.equal(false);
				expect(scope.checkClickable(7)).to.equal(false);
			});
		});

		describe('X plays 3, O plays 2', function() {

			//make sure player is O and computer is X
			beforeEach(function() {
				scope.player = 1;
				scope.computer = 2;
				scope.draw(2);
				scope.compDraw(3);
			});

			it('should mark X on 3 if Computer Player played 3', function() {
				expect(scope.checkX(3)).to.equal(true);
			});

			it('should mark O on 2 if Player played 2', function() {
				expect(scope.checkO(2)).to.equal(true);
			});

			it('should no longer be able to play 2 or 3', function() {
				expect(scope.checkClickable(2)).to.equal(false);
				expect(scope.checkClickable(3)).to.equal(false);
			});
		});
	});

	describe('AI', function() {

		//make sure game state is blank for each test here
		beforeEach(function() {
		});

		it('should play opposite corner if player starts with a corner move', function() {

		});

		it('should play a corner if player starts with a center move', function() {

		});

		it('should play center if player derps and plays a side', function() {

		});

	});

	describe('Victory Conditions', function() {

		//
		beforeEach(function() {
			scope.Xed = [1,2,6,9];
			scope.Oed = [5,7,8];
			scope.checkVictoryFull();
		});

		//neither X nor O won yet.
		it('no one won yet', function() {
			expect(scope.XWon()).to.equal(false);
			expect(scope.OWon()).to.equal(false);
		});

		describe('Somebody Wins', function() {

			beforeEach(function() {
				//watch resetBoard
				sinon.stub(scope, 'resetBoard', function() {});
				scope.Xed = [1,2,6,9];
				scope.Oed = [5,7,3,8];
				scope.checkVictoryFull();
			});

			it('O just won', function() {
				expect(scope.OWon()).to.equal(true);
			});

			it('should reset board if someone won', function() {
				expect(scope.resetBoard.callCount).to.equal(1);
			});

		});

	});
  });
});

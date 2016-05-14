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

	//really now, nothing should be played yet
	it('nothing should be played yet', function() {
		expect(scope.checkX(5)).to.equal(false);
		expect(scope.checkO(5)).to.equal(false);
		expect(scope.checkClickable (5)).to.equal(true);
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

		//make sure player is X and computer is O
		beforeEach(function() {
			scope.player = 2;
			scope.computer = 1;
		});
		describe('Player starts with 1', function() {
			beforeEach(function() {
				scope.draw(1);
			});

			it('should have made a move', function() {
				expect(scope.Oed.length).to.not.equal(0);
			});

			it('should have played 9 since player played 1', function() {
				expect(scope.Oed[0]).to.equal(9);
			});
		});
		describe('Player starts with 2', function() {
			beforeEach(function() {
				scope.draw(2);
			});

			it('should have made a move', function() {
				expect(scope.Oed.length).to.not.equal(0);
			});

			it('should have played 5 since player did not play 5', function() {
				expect(scope.Oed[0]).to.equal(5);
			});
			
			describe('Player then plays 4', function() {
				beforeEach(function() {
					scope.draw(4);
				});

				it('should have made a move', function() {
					expect(scope.Oed.length).to.not.equal(1);
				});

				it('should have played 1 since player played 2 in first turn', function() {
					expect(scope.Oed[1]).to.equal(1);
				});
				describe('Player then plays 6', function() {
					beforeEach(function() {
						scope.draw(6);
					});

					it('should have made a move', function() {
						expect(scope.Oed.length).to.not.equal(2);
					});
				});
			});
		});
		describe('Player starts with 3', function() {
			//swap players
			beforeEach(function() {
				scope.player = 1;
				scope.computer = 2;
				scope.draw(3);
			});

			it('should have made a move', function() {
				expect(scope.Xed.length).to.not.equal(0);
			});

			it('should have played 7 since player played 7', function() {
				expect(scope.Xed[0]).to.equal(7);
			});
		});
		describe('Player starts with 5', function() {
			beforeEach(function() {
				scope.draw(5);
			});

			it('should have made a move', function() {
				expect(scope.Oed.length).to.not.equal(0);
			});

			it('should have played 1 since player played 5', function() {
				expect(scope.Oed[0]).to.equal(1);
			});
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

		describe('O Wins', function() {

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
		describe('Computer X Wins', function() {

			beforeEach(function() {
				//watch resetBoard
				sinon.stub(scope, 'resetBoard', function() {});
				scope.player = 1;
				scope.computer = 2;
				scope.whoseTurn = 2;
				scope.Xed = [1,2,3];
				scope.Oed = [5,7,8];
				scope.checkVictoryFull();
			});

			it('X just won', function() {
				expect(scope.XWon()).to.equal(true);
			});

		});

		describe('Draw', function() {

			beforeEach(function() {
				//watch resetBoard
				sinon.stub(scope, 'resetBoard', function() {});
				scope.blanks = [];
				scope.checkVictoryFull();
			});

			it('should reset board if draw', function() {
				expect(scope.resetBoard.callCount).to.equal(1);
			});

		});
	});
  });
});

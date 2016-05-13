describe('saving a document', function() {

  var scope;
  var ctrl;

  beforeEach(module('Tictac'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
  }));


  describe('documentSaved property', function() {

	  //document.text changed - documentSaved should be false now
    it('should watch for document.text changes', function() {
      expect(scope.resetBoard).to.not.equal(false);
    });

  });
});

describe("poker card", function() {

  var card;

  beforeEach( function() {
  });

  describe("valid card", function() {
    it("creates instance OK", function() {
      var card_str = "Ac";

      card = Card.get_instance( card_str );
      expect( card ).toBeDefined();
    });
  });

});

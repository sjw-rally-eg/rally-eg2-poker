describe("poker card", function() {

  var card;

  describe("valid card", function() {
    it("creates instance OK", function() {
      var card_str = "Ac";

      card = Card.get_instance( card_str );
      expect( card ).toBeDefined();
    });
  });

  describe("invalid card", function() {
    it("creates instance OK", function() {
      var card_str = "10hx",
          card;

      try {
        card = Card.get_instance( card_str );
      } catch( e ) {
      }
      expect( card ).toBeUndefined();
    });
  });

});

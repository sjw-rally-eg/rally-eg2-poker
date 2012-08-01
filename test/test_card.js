describe("poker card", function() {

  var card;

  var card_str1 = "Ac";
  describe("valid card ["+card_str1+"]", function() {
    it("creates instance OK", function() {
      card = Card.get_instance( card_str1 );
      expect( card ).toBeDefined();
      expect( card.to_string() ).toEqual( 'Ac' );
    });
  });

  var card_str2 = "10hx";
  describe("invalid card ["+card_str2+"]", function() {
    it("throws correct exception", function() {
      expect( function(){ Card.get_instance( card_str2 ); } ).toThrow(
        Card.prototype.InvalidCardError );
    });
  });

});

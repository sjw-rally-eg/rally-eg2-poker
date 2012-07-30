describe("poker hand", function() {

  var hand, card, card_str;

  describe("valid cards", function() {
    it("creates instance OK", function() {
      hand = new PokerHand();
      expect( hand ).toBeDefined();

      card_str = "Ad";
      card = Card.get_instance( card_str );
      expect( card ).toBeDefined();
      hand.add( card );

      card_str = "10h";
      card = Card.get_instance( card_str );
      expect( card ).toBeDefined();
      hand.add( card );
    });
  });

});

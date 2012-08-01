describe("poker hand", function() {

  // NOTE: all other hand tests are done in poker hand ranker
  it("throws correct exception for empty input", function() {
    expect( function(){ new PokerHand(''); } ).toThrow(
      PokerHand.prototype.NumberOfCardsError );
  });

});

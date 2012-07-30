describe("poker hand ranker", function() {

  // the core object that does all the work
  var ranker;

      // test hands, for speed and brevity
      valid_hands = test_hands.valid_hands,
      invalid_hands = test_hands.invalid_hands,

      // utility function to minimize typing

      /**
       * asserts that our expectations are what we expect =:P,
       * as double-check to save debug time */
      assert_expectations = function( expected_hand, expected_hand_match,
                                      expected_rank, expected_rank_match ) {
        expect( expected_hand ).toEqual( expected_hand_match );
        expect( expected_rank ).toEqual( expected_rank_match );
      },

      /** asserts that our results match expectations */
      assert_results = function( hand, expected_rank ) {
        expect( hand ).toBeDefined();
        expect( expected_rank ).toBeDefined();
        expect( ranker ).toBeDefined();
        expect( ranker.rank_hand ).toBeDefined();
        expect( ranker.rank_hand( hand ) ).toEqual( expected_rank );
      };

      /** asserts that our results match expectations, complete w/ exception */
      assert_invalid_results = function( hand, expected_rank,
                                         expected_exception ) {

        // make sure it throws the appropriate exception, and result rank still useful.
        expect( function(){ ranker.rank_hand(hand); } ).toThrow( expected_exception );
        // expect( ranker.rank ).toEqual( expected_rank );
      };

  beforeEach( function() {
    ranker = new PokerHandRanker(); // the core object that does all the work
  });

  //--------------------------------------------------------------------------
  // test rankings for INvalid hands
  //--------------------------------------------------------------------------

  describe("IN valid hands", function() {

  it("correctly calls an empty hand INVALID", function() {
    var expected_hand = invalid_hands[ 'empty hand' ].hand,
        expected_rank = invalid_hands[ 'empty hand' ].rank;

    assert_invalid_results( expected_hand, expected_rank,
                            ranker.NumberOfCardsError );
  });

  it("correctly calls a bogus input INVALID", function() {
    var expected_hand = invalid_hands[ 'bogus input - single number' ].hand,
        expected_rank = invalid_hands[ 'bogus input - single number' ].rank;

    assert_invalid_results( expected_hand, expected_rank,
                            ranker.NumberOfCardsError );
  });

  it("correctly calls an invalid cardrank INVALID", function() {
    var expected_hand = invalid_hands[ 'invalid cardrank' ].hand,
        expected_rank = invalid_hands[ 'invalid cardrank' ].rank;

    assert_invalid_results( expected_hand, expected_rank,
                            ranker.InvalidCardError );
  });

  it("correctly calls an invalid suit INVALID", function() {
    var expected_hand = invalid_hands[ 'invalid suit' ].hand,
        expected_rank = invalid_hands[ 'invalid suit' ].rank;

    assert_invalid_results( expected_hand, expected_rank,
                            ranker.InvalidCardError );
  });

  it("correctly calls too many cards INVALID", function() {
    var expected_hand = invalid_hands[ 'too many cards' ].hand,
        expected_rank = invalid_hands[ 'too many cards' ].rank;

    assert_invalid_results( expected_hand, expected_rank,
                            ranker.NumberOfCardsError );
  });

  it("correctly calls too few cards INVALID", function() {
    var expected_hand = invalid_hands[ 'too few cards' ].hand,
        expected_rank = invalid_hands[ 'too few cards' ].rank;

    assert_invalid_results( expected_hand, expected_rank,
                            ranker.NumberOfCardsError );
  });

  it("correctly calls a duplicate card INVALID", function() {
    var expected_hand = invalid_hands[ 'duplicate card' ].hand,
        expected_rank = invalid_hands[ 'duplicate card' ].rank;

    assert_invalid_results( expected_hand, expected_rank,
                            ranker.DuplicateCardError );
  });

  });

  //--------------------------------------------------------------------------
  // test rankings for VALID hands
  //--------------------------------------------------------------------------

  describe("valid hands", function() {

  it("correctly ranks a single high-card hand", function() {
    var expected_hand = valid_hands[ 'high card' ].hand,
        expected_rank = valid_hands[ 'high card' ].rank,
        expected_hand_match = 'Kh Qh 6d 2h 9h',
        expected_rank_match = 'King high' ;

    // sanity check - are expectations what we expect =:-P
    assert_expectations( expected_hand, expected_hand_match,
                         expected_rank, expected_rank_match );

    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks a pair", function() {
    var expected_hand = valid_hands[ 'pair' ].hand,
        expected_rank = valid_hands[ 'pair' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks two pair", function() {
    var expected_hand = valid_hands[ 'two pair' ].hand,
        expected_rank = valid_hands[ 'two pair' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks trips", function() {
    var expected_hand = valid_hands[ 'trips' ].hand,
        expected_rank = valid_hands[ 'trips' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks a straight", function() {
    var expected_hand = valid_hands[ 'straight' ].hand,
        expected_rank = valid_hands[ 'straight' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks a frush", function() {
    var expected_hand = valid_hands[ 'flush' ].hand,
        expected_rank = valid_hands[ 'flush' ].rank;

        expected_hand_match = 'Kh Qh 6h 2h 9h';
        expected_rank_match = 'Flush (King)' ;

    // sanity check - are expectations what we expect =:-P
    assert_expectations( expected_hand, expected_hand_match,
                         expected_rank, expected_rank_match );

    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks a full boat (low cards over hi)", function() {
    var expected_hand = valid_hands[ 'full boat:lo' ].hand,
        expected_rank = valid_hands[ 'full boat:lo' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks a full boat (hi cards over low)", function() {
    var expected_hand = valid_hands[ 'full boat:hi' ].hand,
        expected_rank = valid_hands[ 'full boat:hi' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks quads", function() {
    var expected_hand = valid_hands[ 'quads' ].hand,
        expected_rank = valid_hands[ 'quads' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks a straight flush", function() {
    var expected_hand = valid_hands[ 'straight flush' ].hand,
        expected_rank = valid_hands[ 'straight flush' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  it("correctly ranks a royal flush", function() {
    var expected_hand = valid_hands[ 'royal flush' ].hand,
        expected_rank = valid_hands[ 'royal flush' ].rank;
    assert_results( expected_hand, expected_rank );
  });

  });

  // test exceptions for invalid hands

});

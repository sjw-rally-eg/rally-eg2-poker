describe("poker hand ranker (automated)", function() {

  // the core object that does all the work
  var ranker,

      // test hands, for speed and brevity
      valid_hands = test_hands.valid_hands,
      invalid_hands = test_hands.invalid_hands,

      // properties of valid and invalid hands
      hand_type,
      hand_io,
      hand,
      expected_rank,      // valid hands only
      expected_exception, // invalid hands only

      /** asserts that our results match expectations */
      assert_results = function( hand, expected_rank ) {
        expect( hand ).toBeDefined();
        expect( expected_rank ).toBeDefined();
        expect( ranker ).toBeDefined();
        expect( ranker.rank_hand ).toBeDefined();

        expect( ranker.rank_hand( hand ) ).toEqual( expected_rank );
      },

      /** asserts that our results match expectations, complete w/ exception */
      assert_invalid_results = function( hand, expected_exception ) {

        // make sure it throws the appropriate exception
        expect( function(){ ranker.rank_hand(hand); } )
          .toThrow( expected_exception );
      },

      hop = Object.hasOwnProperty; // shortcut

  beforeEach( function() {
    // get a new object before each test
    ranker = new PokerHandRanker();
  });

  /**
   * test rankings for INvalid hands
   */
  describe("INvalid hands", function() {

    for( hand_type in invalid_hands ) {
      if( hop.call( invalid_hands, hand_type ) ) {
        hand_io = invalid_hands[ hand_type ];
        hand = hand_io.hand;
        expected_exception = hand_io.exception;

        it('calls a hand of type ['+hand_type+'] INVALID', function() {
          assert_invalid_results( hand, expected_exception );
        });
      }
    }

  });

  /**
   * test rankings for VALID hands
   */
  describe("valid hands", function() {

    for( hand_type in invalid_hands ) {
      if( hop.call( invalid_hands, hand_type ) ) {
        hand_io = invalid_hands[ hand_type ];
        hand = hand_io.hand;
        expected_rank = hand_io.rank;

        it('calls a hand of type ['+hand_type+'] VALID', function() {
          assert_invalid_results( hand, expected_rank );
        });
      }
    }

  });

});

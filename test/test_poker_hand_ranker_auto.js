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
      assert_results = function( _hand, _expected_rank ) {

        expect( _hand ).toBeDefined();
        expect( _expected_rank ).toBeDefined();
        expect( ranker ).toBeDefined();
        expect( ranker.rank_hand ).toBeDefined();

        expect( ranker.rank_hand( _hand ) ).toEqual( _expected_rank );
      },

      /** asserts that our results match expectations, complete w/ exception */
      assert_invalid_results = function( _ranker, _hand, _expected_exception ) {

        // make sure it throws the appropriate exception
        expect( _ranker.rank_hand( _hand ) ).toEqual( _expected_exception.message );
      },

      hop = Object.hasOwnProperty; // shortcut

  /**
   * test rankings for INvalid hands
   */
  describe("INvalid hands", function() {

    it('calls an inVALID hand inVALID', function() {
      for( hand_type in invalid_hands ) {
        if( hop.call( invalid_hands, hand_type ) ) {
          ranker = new PokerHandRanker();
          hand_io = invalid_hands[ hand_type ];
          hand = hand_io.hand;
          expected_exception = hand_io.exception;

          assert_invalid_results( ranker, hand, expected_exception );
        }
      }
    });

  });

  /**
   * test rankings for VALID hands
   */
  describe("valid hands", function() {

    it('calls a VALID hand VALID', function() {
      for( hand_type in valid_hands ) {
        if( hop.call( valid_hands, hand_type ) ) {
          ranker = new PokerHandRanker();
          hand_io = valid_hands[ hand_type ];
          hand = hand_io.hand;
          expected_rank = hand_io.rank;

          console.log( 'before valid check: ['+hand_type +'] '+ hand +' = '+ expected_rank );

          assert_results( hand, expected_rank );
        }
      }
    });

  });

});

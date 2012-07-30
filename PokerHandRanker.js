/** *the* global object that drives the work */
var PokerHandRanker = function(raw_hand) {
  this.input = raw_hand;  // what the user supplied
  this.hand = new PokerHand();
};


/** This does the validation work and causes the ranking to be done to a valid hand */
PokerHandRanker.prototype.rank_hand = function( raw_hand ) {
  var rank_result;

  // reuse raw hand from constructor, if extant
  this.input = raw_hand ? raw_hand : this.input;
  console.log( this.input );

  // put this on the hand
  // this.rank_result = PokerHandRanker.INVALID_INPUT;

  try {
    this.recognize_hand();
    rank_result = this.rank_valid_hand();
  } catch( e ) {
    // this.rank_result = e.message;
    // this.hand.rank_result = e.message;
    rank_result = e.message;
    console.log(this.hand);
    throw e;
  };

  // return this.hand.rank_result;
  return rank_result;
};

/** performs input validation and parsing into individual cards, if valid */
PokerHandRanker.prototype.recognize_hand = function() {
  var raw_cards = this.input.split(' '), // works ok if hand is a #
      hand = this.hand,
      card;

  if( raw_cards.length != 5 ) {
    throw this.NumberOfCardsError;
  }

  for( var i=0; i<raw_cards.length; i++ ) {
    // throws this.InvalidCardError if nec.
    card = Card.get_instance( raw_cards[i] );

    // throws this.DuplicateCardError if nec.
    hand.add( card );
    console.log(card);
  }

};

/**
 * This returns the text indicating the hand rank.
 * NOTE: this assumes the hand is valid and this.cards has 5 valid cards
 */
PokerHandRanker.prototype.rank_valid_hand = function() {
  var hand_rank_text = this.hand.get_rank_text();
  return hand_rank_text;
};

//--------------------------------------------------------------------------
// exceptions and error state
//--------------------------------------------------------------------------

/**
 * The rank for any invalid input.
 * Object property so as to be available for DRY testing etc.
 */
PokerHandRanker.INVALID_INPUT = '** INPUT is INVALID **';

/** wrong # of cards */
PokerHandRanker.NumberOfCardsError = {
  name: 'NumberOfCardsError',
  message: 'There must be exactly 5 cards in a hand (single-space delimited)'
};

/** wrong cardrank or suit */
PokerHandRanker.InvalidCardError = {
  name: 'InvalidCardError',
  message: 'Each card must start with rank (A,K,J, or 2-10) and end with suit (c,d,h,s) - case sensitive!'
};

/** wrong cardrank or suit */
PokerHandRanker.DuplicateCardError = {
  name: 'DuplicateCardError',
  message: 'Hand must have only one of each card'
};

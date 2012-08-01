/*jslint browser: true, debug: false, indent: 2, vars: false, plusplus: true *//*global $ PokerHand */
/**
 * API entry point.
 *
 * Usage:
 *   var hand_str = 'Kh Qh Ah Jh 10h';
 *   var poker_hand_ranker = new PokerHandRanker(hand_str);
 *
 *   var ranking = poker_hand_ranker.rank_hand();
 *   // ... ranking will be: 'Royal Flush'
 */
var PokerHandRanker = function () {
  this.input = null;        // what the user will supply
  this.hand = null;         // the valid hand
  this.rank_result = null;  // the result of the ranking
};


/**
 * This does the validation work,
 * and causes the ranking to be done to a valid hand
 */
PokerHandRanker.prototype.rank_hand = function (raw_hand) {

  // allows all exception handling to be in 1 spot
  try {
    this.recognize_hand(raw_hand);
    this.rank_result = this.rank_valid_hand();
  } catch ( e ) {
    this.rank_result = e.message;
    // bury the exception, client expects the return str regardless
  }

  return this.rank_result;
};

/** performs input validation and parsing into individual cards, if valid */
PokerHandRanker.prototype.recognize_hand = function (raw_hand) {

  if (!this.hand) {
    this.hand = new PokerHand(raw_hand);
    this.input = raw_hand;
  }

};

/**
 * This returns the text indicating the hand rank.
 * NOTE: this assumes the hand is valid and this.cards has 5 valid cards
 */
PokerHandRanker.prototype.rank_valid_hand = function () {
  var hand_rank_text = this.hand.get_rank_text();
  return hand_rank_text;
};

/**
 * The rank for any invalid input.
 * Object property so as to be available for DRY testing etc.
 */
PokerHandRanker.INVALID_INPUT = '** INPUT is INVALID **';

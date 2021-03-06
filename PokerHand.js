/*jslint browser: true, plusplus: true, debug: false, indent: 2, vars: false *//*global $ Card */
/** holds the 5 valid cards for each hand */
var PokerHand = function (raw_hand) {

  // the set of cards in the hand
  this.cards = [];

  // will be set true in check for straight if is wheel straight
  this.is_wheel = false;

  // for handling flush check on add
  this.is_a_flush = false;

  if (raw_hand) {
    this.init(raw_hand);
  } else {
    throw this.NumberOfCardsError;
  }

};

PokerHand.prototype.init = function (raw_hand) {
  var trimmed_hand = raw_hand.replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
      raw_cards = trimmed_hand.split(' '), // works ok if hand is a #
      hand = this,
      card,
      ix = raw_cards.length;

  if (ix !== 5) {
    throw this.NumberOfCardsError;
  }

  for (; ix > 0; ix -= 1) {
    // throws Card.prototype.InvalidCardError if nec.
    card = Card.get_instance(raw_cards[ix - 1]);

    // throws this.DuplicateCardError if nec.
    hand.add(card);
  }

};

/**
 * Adds card to the hand, unless it's a duplicate.
 * NOTE: this will cause ASC sort after 5th card added.
 * @throws this.DuplicateCardError if duplicate of extant card.
 */
PokerHand.prototype.add = function (card) {
  var cards = this.cards,
      ix = cards.length;

  for (; ix > 0; ix -= 1) {
    if (card.to_string() === cards[ix - 1].to_string()) {
      throw this.DuplicateCardError;
    }
  }

  // not a duplicate, add it
  cards.push(card);

  // will set key properties if we have the right # of cards.
  this.try_freeze();

};

/**
 *
 * if this is the fifth card determine the properties
 */
PokerHand.prototype.try_freeze = function () {
  var cards = this.cards,
      ix = cards.length;

  if (cards.length === 5) {

    // make it easy to determine if it's a straight
    cards = cards.sort(function (card_a, card_b) {
      return (card_a.rank_order - card_b.rank_order);
    });

    // determine flush status
    this.is_a_flush = (function (the_cards, ix) {
      var first_suit = null,  // suit for 1st card checked
          this_suit = null,   // suit for each card
          is_flush = true;    // will be set false if not a flush

      for (; ix > 0; ix -= 1) {
        this_suit = the_cards[ix - 1].suit;

        if (!first_suit) {
          first_suit = this_suit;
        } else if (first_suit !== this_suit) {
          is_flush = false;
          break;
        }
      }
      return is_flush;
    }(cards, cards.length));
  }

};

/**
 * Determines if this is a flush or not.
 * Will blow up if hand is not valid.
 */
PokerHand.prototype.is_flush = function () {

  this.validate(); // prophylactic

  // this will be set correctly upon 5th card added;
  // if 5th card not added, validate() will blow up
  return this.is_a_flush;
};

/**
 * Determines if this is a straight or not.
 * Will blow up if hand is not valid.
 */
PokerHand.prototype.is_straight = function () {
  var is_a_straight = false,
      hi_card_rankorder = this.get_highcard().rank_order,
      lo_card_rankorder = this.get_lowcard().rank_order;

  this.validate(); // prophylactic

  // since cards are ASC sorted immediately after 5th card added,
  // and rank_order of high card is always exactly 4 more than low card
  // for a normal straight, just do this:
  is_a_straight = hi_card_rankorder - lo_card_rankorder === 4;

  // now check for a wheel - high card (by pure rank) MUST be an ace,
  // and the diff between 2nd high card and low is then 3 (5 to 2).
  if (!is_a_straight) {
    if (hi_card_rankorder === 12 &&
        this.cards[3].rank_order - lo_card_rankorder === 3) {
      is_a_straight = true;
      this.is_wheel = true;
    }
  }

  return is_a_straight;
};

/**
 * Determines if this is a straight flush or not.
 * Will blow up if hand is not valid.
 */
PokerHand.prototype.is_straightflush = function () {
  return this.is_flush() && this.is_straight();
};

/**
 * Determines if this is a royal flush or not.
 * Will blow up if hand is not valid.
 */
PokerHand.prototype.is_royalflush = function () {
  // since cards are ASC sorted immediately after 5th card added,
  // and validate() is called by these methods...
  return  this.is_flush() &&
    this.is_straight() &&
    this.get_lowcard().rank_label === 'Ten';
};

/**
 * Validates the hand.
 * @throws this.NumberOfCardsError if length is wrong.
 */
PokerHand.prototype.validate = function () {
  if (this.cards.length !== 5) {
    throw this.NumberOfCardsError;
  }
};

PokerHand.prototype.get_real_highcard = function () {
  return this.is_wheel ? this.cards[3] : this.cards[4];
};

PokerHand.prototype.get_highcard = function () {
  return this.cards[4];
};

PokerHand.prototype.get_lowcard = function () {
  return this.cards[0];
};

/**
 * Returns max of cardrank count.
 */
PokerHand.prototype.get_max_cardrank_count = function () {
  var max_count = this.get_cardrank_count(4); // count of hi cardrank

  // ... vs. count of lo cardrank
  max_count = Math.max(max_count, this.get_cardrank_count(0));

  return max_count;
};

/**
 * Returns count of high or low cards, depending on arg ix.
 */
PokerHand.prototype.get_cardrank_count = function (card_ix) {
  var count = 0,
      cards = this.cards,
      card_rankcode = cards[card_ix].rank_code,
      ix = cards.length;

  // always loop top to bottom, result works both ways
  for (; ix > 0; ix -= 1) {
    if (cards[ix - 1].rank_code === card_rankcode) {
      count += 1;
    }
  }
  return count;
};

PokerHand.prototype.get_rank_text = function () {
  var ranking_text,
      pluralize = true,
      bestcard_str,
      max_cardrank_count = this.get_max_cardrank_count(), // use index of hicard
      rank_ix = -1; // error unless set

  switch (max_cardrank_count) {
  case 1:
    if (this.is_straightflush()) {
      if (this.is_royalflush()) {
        rank_ix = 9;
      } else {
        rank_ix = 8;
      }
    } else {
      if (this.is_flush()) {
        rank_ix = 5;
        pluralize = false;
      } else if (this.is_straight()) {
        rank_ix = 4;
      } else { // is 'XXX high' rank
        rank_ix = 0;
        pluralize = false;
      }
    }
    break;
  case 2: // pair or 2 pair
    if (this.get_cardrank_count(1) === 2) { // 2 of 2nd rank; 2 pair
      rank_ix = 2;
    } else {
      rank_ix = 1;
    }
    break;
  case 3: // trips or full boat
    if (this.get_cardrank_count(0) > 1) { // >1 of low card rank; boat!
      // check if lo card is the over...
      if (this.get_cardrank_count(0) > this.get_cardrank_count(4)) {
        bestcard_str = this.cards[0].rank_label;
      }
      rank_ix = 6;
    } else { // measly trips
      rank_ix = 3;
    }
    break;
  case 4:
    rank_ix = 7;
    break;
  default: // should *never* happen, given card validation and dupe check
    throw { name: 'InvalidHighCardCountError',
      message: 'max cardrank count (' + max_cardrank_count + ') is wrong' };
  }

  bestcard_str = bestcard_str || this.get_real_highcard().rank_label;

  ranking_text = this.format_ranking(rank_ix, bestcard_str);

  return ranking_text;
};

PokerHand.prototype.format_ranking = function (rank_ix, high_card) {
  var rankings = [  'XXX high',
                    'Pair (XXX)',
                    '2 Pair (XXX)',
                    'Trips (XXX)',
                    'Straight (XXX)',
                    'Flush (XXX)',
                    'Full Boat (XXX)',
                    'Quads (XXX)',
                    'Straight Flush (XXX)',
                    'Royal Flush' ],
      rank_text = null;

  rank_text = rankings[rank_ix].replace('XXX', high_card);

  return rank_text;
};

/** wrong # of cards */
PokerHand.prototype.NumberOfCardsError = {
  name: 'NumberOfCardsError',
  message: 'There must be exactly 5 cards in a hand (single-space delimited)'
};

/** wrong cardrank or suit */
PokerHand.prototype.DuplicateCardError = {
  name: 'DuplicateCardError',
  message: 'Hand must have only one of each card'
};

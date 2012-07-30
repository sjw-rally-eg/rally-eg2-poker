/**
 * Constructs a new card given [rank_code] and [suit].
 */
var Card = function( rank_code, suit ) {      // eg: A, s ...

  var rank_coded_hash = {
    '2':  [ 'Two',    0 ],
    '3':  [ 'Three',  1 ],
    '4':  [ 'Four',   2 ],
    '5':  [ 'Five',   3 ],
    '6':  [ 'Six',    4 ],
    '7':  [ 'Seven',  5 ],
    '8':  [ 'Eight',  6 ],
    '9':  [ 'Nine',   7 ],
    '10': [ 'Ten',    8 ],
    'J':  [ 'Jack',   9 ],
    'Q':  [ 'Queen', 10 ],
    'K':  [ 'King',  11 ],
    'A':  [ 'Ace',   12 ]
  };

  this.get_rank_label = function( rc ) {
    var rank_code = rc ? rc : this.rank_code;
    return rank_coded_hash[ rank_code ][0];
  };

  this.get_rank_order = function( rc ) {
    var rank_code = rc ? rc : this.rank_code;
    return rank_coded_hash[ rank_code ][1];
  };

  this.rank_code = rank_code;                 // ... A
  this.suit = suit;                           // ... s

  // used in output of ranking
  this.rank_label = this.get_rank_label();    // ... Ace

  // used for straight check, high card, etc.
  this.rank_order = this.get_rank_order();    // ... 12
};

/**
 * Generates a card based on [card_str] of the form '10s', 'Kc', etc.
 * (factory method).
 */
Card.get_instance = function(card_str) {
  var card_regex = /^([AKQJ]|10|[2-9])([cdhs])$/,
      card_parts = card_str.match( card_regex ),
      card;

  // 3 pieces: entire match, card-rank, suit
  if( !card_parts || card_parts.length !== 3 ) { 
    throw PokerHandRanker.InvalidCardError;
  }

  card = new Card( card_parts[1], card_parts[2] );

  return card;
};

/**
 * Outputs string of the form '10s', 'Kc', etc.
 */
Card.prototype.to_string = function() {
  return this.rank_code + this.suit;
};

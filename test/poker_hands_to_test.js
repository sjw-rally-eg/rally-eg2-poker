var test_hands = {};

test_hands.valid_hands = {
  "high card":      { "hand": "Kh Qh 6d 2h 9h", "rank": "King high" },
  "pair":           { "hand": "Ah As 10c 7d 6s", "rank": "Pair (Ace)" },
  "two pair":       { "hand": "Kh Kc 3s 3h 2d", "rank": "2 Pair (King)" },
  "trips":          { "hand": "Kh Kc 3s 9h Kd", "rank": "Trips (King)" },
  "straight":       { "hand": "9c Jc 8h 10d Qh", "rank": "Straight (Queen)" },
  "flush":          { "hand": "Kh Qh 6h 2h 9h", "rank": "Flush (King)" },
  "full boat:hi":   { "hand": "Ah 10d 10c Ac Ad", "rank": "Full Boat (Ace)" },
  "full boat:lo":   { "hand": "10h 10d 10c Ac Ad", "rank": "Full Boat (Ten)" },
  "quads":          { "hand": "10h 10d 10c 10s 2d", "rank": "Quads (Ten)" },
  "straight flush": { "hand": "3d 6d 2d 4d 5d", "rank": "Straight Flush (Six)" },
  "royal flush":    { "hand": "Kh Qh Ah Jh 10h", "rank": "Royal Flush" } };

test_hands.invalid_hands = {
  "empty hand": {
    "hand": "", "exception": PokerHandRanker.NumberOfCardsError },
  "bogus input - single number": {
    "hand": "5", "exception": PokerHandRanker.NumberOfCardsError },
  "invalid cardrank": {
    "hand": "hh Qh 6h 2h 9h", "exception": PokerHandRanker.InvalidCardError },
  "invalid suit": {
    "hand": "Kp Qh 6h 2h 9h", "exception": PokerHandRanker.InvalidCardError },
  "invalid suit": {
    "hand": "Kp Qh 6h 2h 10px", "exception": PokerHandRanker.InvalidCardError },
  "too many cards": {
    "hand": "Kh Qh 6h 2h 9h 3c", "exception": PokerHandRanker.NumberOfCardsError },
  "too few cards": {
    "hand": "6h 2h 9h 3c", "exception": PokerHandRanker.NumberOfCardsError },
  "too few cards - trailing space": {
    "hand": "6h 2h 9h 3c ", "exception": PokerHandRanker.NumberOfCardsError },
  "too few cards - leading space": {
    "hand": " 6h 2h 9h 3c", "exception": PokerHandRanker.NumberOfCardsError },
  "duplicate card": {
    "hand": "Kh Kh 6h 2h 9h", "exception": PokerHandRanker.DuplicateCardError } };

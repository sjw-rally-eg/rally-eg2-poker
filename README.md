#rally-eg2-poker

This is a simple project to implement the second example
for the RallySoft Web Application Developer job interview process.

#Features

* Ranks a valid poker hand
* Barks when poker hand is invalid

#Usage

1. Checkout the Git repository.
   (Works OK with or without local web server).

Manual eval:

2. Load index.html in any modern browser.
   Follow simple on screen instructions and have fun.

Automatic eval:

2. Load test/SpecRunner.html in any modern browser.
   This will run all tests.  The specs under 'poker hand ranker' (automated)
   show examples of valid and invalid hands, and the rank response.

NOTE: for automatic tests only,
      error handling is borked ATM, only valid hands rank OK.

3. Modify test/poker_hands_to_test.js to try different hands.

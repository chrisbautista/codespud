---
title: Rock-Paper-Scissors-Lizard-Spock Game
author: chris
type: post
date: 2022-11-20 02:13:00+00:00
url: /2022/rock-paper-scissors-lizard-spock/
redirect_from:
  - /rock-paper-scissors-lizard-spock/
featured_image: /blog/marcus-wallis-R1qHDAEnCmc-unsplash.jpg
featured_image_attribution: photo by <a href="https://unsplash.com/@marcus_wallis">Mark Wallis</a>
tags: [javascript, ui, animation, game]
draft: false
---

I am a big Big Bang Theory fan. So is my wife. Her absolute favorite character is Sheldon Cooper. In one of the episodes Sheldon proposed an improved version of the rock-paper-scissors game.  This version extends the possible moves to five(5). The additional two options would increase the possibility of win chances as it minimizes the chance of both players picking the same move. <!--more-->

I made a javascript version. Using a few emojis for the hand graphics. I made a very simple interface

## Game logic 

The game logic is pretty simple. 

```

build gameboard

:play
  get user move
  get computer move
  get win_or_lose
  increment round
  if (round equals max_round) goto display_winner
  goto play 

:display_winner
...
end game

```


To check who wins per round we need to know the rules of the game (taken from Big Bang Theory wiki).

-  Scissors cuts Paper
-  Paper covers Rock
-  Rock crushes Lizard
-  Lizard poisons Spock
-  Spock smashes Scissors
-  Scissors decapitates Lizard
-  Lizard eats Paper
-  Paper disproves Spock
-  Spock vaporizes Rock
-  (and as it always has) Rock crushes Scissors


<!--ad-->

Here are the rules again coded in javascript.

```javascript

function winOrLose(playerChoice, computerChoice) {

    if (
        (playerChoice === Hands.Scissor && computerChoice === Hands.Paper) ||
        (playerChoice === Hands.Paper && computerChoice === Hands.Rock) ||
        (playerChoice === Hands.Rock && computerChoice === Hands.Lizard) ||
        (playerChoice === Hands.Lizard && computerChoice === Hands.Spock) ||
        (playerChoice === Hands.Scissors && computerChoice === Hands.Lizard) ||

        (playerChoice === Hands.Rock && computerChoice === Hands.Scissor) ||
        (playerChoice === Hands.Spock && computerChoice === Hands.Scissors) ||
        (playerChoice === Hands.Lizard && computerChoice === Hands.Paper) ||
        (playerChoice === Hands.Paper && computerChoice === Hands.Spock) ||
        (playerChoice === Hands.Spock && computerChoice === Hands.Rock)
    ) {
        // player wins 
    }

}

```

I love hash tables! They minimize code complexity. This is a great alternative to the code above.  

```javascript

const WIN_OR_LOSE = {
    [`${Hands.Paper}${Hands.Rock}`]: true,
    [`${Hands.Rock}${Hands.Scissor}`]: true,
    [`${Hands.Scissor}${Hands.Paper}`]: true,
    ...
};


if (!!WIN_OR_LOSE[`${playerChoice}${computerChoice}`]) {
    // player wins
}

```

The previous bit of code only handle win conditions, what if both players choose the same move? We test this even before testing win conditions,

```javascript

function winOrLose(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      // show tie result  
      return;
    }
    ...
}

```

Finally, we test if the game has ended. Whenever a round ends, we check if the game should end(finished 10 rounds). If yes, we calculate the game result and notify the user.   

```javascript
  function gameOver() {
    let [yourScore, pcScore] = score;
    if (games >= maxGames) {
      done = true;
      if (yourScore === pcScore) {
        gameResult("It's a draw!", "tie");
      } else if (yourScore > pcScore) {
        gameResult("You win!", "win");
      } else {
        gameResult("You lost!", "lose");
      }
      return;
    }
  }
```

## User interface

For the input, I made five(5) buttons with images corresponding each game move. When the game starts you are prompted to choose a move. When the player chooses a game move, it's checked agains winning conditions and depending on the outcome computes the score. 
<figure>
<img src="/blog/Rock-Paper-Scissors-Lizard-Spock-Game-Images.png" alt="rock-paper-scissors game buttons">
<figcaption>
<span>Rock-paper-scissors-lizard-spock game buttons</span>
</figcaption>
</figure>

https://codepen.io/chrisbautista/pen/dyJyebW

Play the [game](https://codepen.io/chrisbautista/full/dyJyebW). Enjoy!


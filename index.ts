import { prompt, question, menuBar, screen } from "./components"

import { getCardsForReview, reviewCard, writeCards } from './cards';

// capture file path from the command line
const filePath = process.argv[2] || process.env.FLASH_CARDS_PATH || '../cards.json';

if (!filePath) {
  process.exit(0);
}

// read the contents of the json file into an object
const cards = getCardsForReview(filePath);
let cardIndex = 0;
let currentCard = cards[cardIndex];

screen.append(currentCard.front);



menuBar.setItems({
  'New': {
    keys: ['n', 'N'],
    callback: () => {
      prompt.input('What is the new card\'s question?: ', (err, question) => {
        if (err) {
          return;
        }
        prompt.input('What is the new card\'s answer?', (err, answer) => {
          if (err) {
            return;
          }
          new Card(question, answer);
        })
      })
    //  screen.render();
    },
  },
  'Edit': {
    keys: ['e', 'E'],
    callback: () => {
      prompt.input('Edit the current card:', (err, val) => {
        //
        console.log(val);
      })
      screen.render();
    }
  },
  'Delete': {
    keys: ['d', 'D'],

    callback: () => {
      question.ask('Delete the current card?', (err, val) => {
        //
        console.log(val);
      })
      screen.render();
    }
  },
  'Reset ⏱️': {
    keys: ['r', 'R'],
    callback: () => {
      question.ask('Reset all of todays cards?', (err, val) => {
        //
        console.log(val);
      })
      screen.render();
    }
  },
  'Quit': {
    keys: ['q', 'Q'],
    callback: () => {
      process.exit(0);
    }
  }
});

screen.append(menuBar);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.key(['return'], function(ch, key) {
  screen.remove(currentCard.flipped ? currentCard.front : currentCard.back);
  cardIndex++;
  currentCard = cards[cardIndex % cards.length];
  screen.append(currentCard.front);
  screen.render()
});

screen.key(['space'], function(ch, key) {
  screen.remove(currentCard.flipped ? currentCard.front : currentCard.back); screen.append(currentCard.flipped ? currentCard.back : currentCard.front);
  currentCard.flipped = !currentCard.flipped;
  screen.render()
});

screen.key(['1', '2', '3', '4', '5'], function(ch, key) {
  console.log(currentCard.flipped);
  if (currentCard.flipped) {
    const foo =  reviewCard(currentCard.card, parseInt(ch));
    writeCards(cards.map(card => card.card));
  }
  })

screen.render()
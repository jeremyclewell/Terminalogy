"use strict";
var import_components = require("./components");
var import_cards = require("./cards");
const filePath = process.argv[2] || process.env.FLASH_CARDS_PATH || "../cards.json";
if (!filePath) {
  process.exit(0);
}
const cards = (0, import_cards.getCardsForReview)(filePath);
let cardIndex = 0;
let currentCard = cards[cardIndex];
import_components.screen.append(currentCard.front);
import_components.menuBar.setItems({
  "New": {
    keys: ["n", "N"],
    callback: () => {
      import_components.prompt.input("What is the new card's question?: ", (err, question2) => {
        if (err) {
          return;
        }
        import_components.prompt.input("What is the new card's answer?", (err2, answer) => {
          if (err2) {
            return;
          }
          new Card(question2, answer);
        });
      });
    }
  },
  "Edit": {
    keys: ["e", "E"],
    callback: () => {
      import_components.prompt.input("Edit the current card:", (err, val) => {
        console.log(val);
      });
      import_components.screen.render();
    }
  },
  "Delete": {
    keys: ["d", "D"],
    callback: () => {
      import_components.question.ask("Delete the current card?", (err, val) => {
        console.log(val);
      });
      import_components.screen.render();
    }
  },
  "Reset \u23F1\uFE0F": {
    keys: ["r", "R"],
    callback: () => {
      import_components.question.ask("Reset all of todays cards?", (err, val) => {
        console.log(val);
      });
      import_components.screen.render();
    }
  },
  "Quit": {
    keys: ["q", "Q"],
    callback: () => {
      process.exit(0);
    }
  }
});
import_components.screen.append(import_components.menuBar);
import_components.screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});
import_components.screen.key(["return"], function(ch, key) {
  import_components.screen.remove(currentCard.flipped ? currentCard.front : currentCard.back);
  cardIndex++;
  currentCard = cards[cardIndex % cards.length];
  import_components.screen.append(currentCard.front);
  import_components.screen.render();
});
import_components.screen.key(["space"], function(ch, key) {
  import_components.screen.remove(currentCard.flipped ? currentCard.front : currentCard.back);
  import_components.screen.append(currentCard.flipped ? currentCard.back : currentCard.front);
  currentCard.flipped = !currentCard.flipped;
  import_components.screen.render();
});
import_components.screen.key(["1", "2", "3", "4", "5"], function(ch, key) {
  console.log(currentCard.flipped);
  if (currentCard.flipped) {
    const foo = (0, import_cards.reviewCard)(currentCard.card, parseInt(ch));
    (0, import_cards.writeCards)(cards.map((card) => card.card));
  }
});
import_components.screen.render();
//# sourceMappingURL=index.js.map

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cards_exports = {};
__export(cards_exports, {
  getCardsForReview: () => getCardsForReview,
  reviewCard: () => reviewCard,
  writeCards: () => writeCards
});
module.exports = __toCommonJS(cards_exports);
var import_chalk = __toESM(require("chalk"));
var import_fs = __toESM(require("fs"));
var import_components = require("./components");
function ankiEaseFactor(card, difficulty) {
  const minEaseFactor = 1.3;
  const maxEaseFactor = 2.5;
  let newEaseFactor = card.easeFactor + (0.1 - (5 - difficulty) * (0.08 + (5 - difficulty) * 0.02));
  if (newEaseFactor < minEaseFactor) {
    newEaseFactor = minEaseFactor;
  } else if (newEaseFactor > maxEaseFactor) {
    newEaseFactor = maxEaseFactor;
  }
  return newEaseFactor;
}
function ankiInterval(card) {
  return {
    0: 1,
    1: 6
  }[card.repetitions] || Math.round(card.interval * card.easeFactor);
}
function reviewCard(card, difficulty) {
  const now = new Date();
  const newInterval = ankiInterval(card);
  const newEF = ankiEaseFactor(card, difficulty);
  const offset = now.getTime() + newInterval * 24 * 3600 * 1e3;
  console.log(offset);
  const newNextReview = new Date(offset);
  card.lastReviewed = now;
  card.interval = newInterval;
  card.easeFactor = newEF;
  card.nextReview = newNextReview;
  card.repetitions++;
  card.difficulty = difficulty;
  return card;
}
const loadCards = (filePath) => {
  return require(filePath).cards.map((card) => {
    return {
      ...card,
      lastReviewed: new Date(card.lastReviewed),
      nextReview: new Date(card.nextReview)
    };
  });
};
function writeCards(cards) {
  const cardsJSON = JSON.stringify({ cards }, null, 2);
  import_fs.default.writeFileSync("./cards.json", cardsJSON);
}
const createReviewDeck = (cards) => {
  return cards.map((card) => {
    return {
      front: front(card),
      back: back(card),
      flipped: false,
      card
    };
  });
};
const getCardsForReview = (filePath) => {
  const rawCards = loadCards(filePath);
  return createReviewDeck(rawCards);
};
const front = (card) => {
  const cardView = (0, import_components.box)(card.question);
  (0, import_components.heading)(import_chalk.default.bold.yellow("Question:"), cardView);
  (0, import_components.button)(import_chalk.default.bold.green("(space) - Flip"), cardView);
  return cardView;
};
const back = (card) => {
  const cardView = (0, import_components.box)(card.answer);
  (0, import_components.heading)(import_chalk.default.bold.yellow("Answer:"), cardView);
  (0, import_components.button)(import_chalk.default.bgGreen("1") + import_chalk.default.bgYellow("2") + import_chalk.default.bgRed("3"), cardView);
  return cardView;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCardsForReview,
  reviewCard,
  writeCards
});
//# sourceMappingURL=cards.js.map

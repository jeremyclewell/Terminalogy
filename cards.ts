import chalk from 'chalk';
import fs from 'fs';

import { box, button, heading } from './components';

interface Card {
  id: number,
  question: string,
  answer: string,
  lastReviewed: Date,
  nextReview: Date,
  interval: number,
  easeFactor: number,
  repetitions: number,
  difficulty: number
}

function ankiEaseFactor(card: Card, difficulty: number): number {
  const minEaseFactor = 1.3
  const maxEaseFactor = 2.5
  let newEaseFactor = card.easeFactor + (0.1 - (5 - difficulty) * (0.08 + (5 - difficulty) * 0.02))
  if (newEaseFactor < minEaseFactor) {
    newEaseFactor = minEaseFactor
  } else if (newEaseFactor > maxEaseFactor) {
    newEaseFactor = maxEaseFactor
  }
  return newEaseFactor
}

function ankiInterval(card: Card): number {
  // @ts-ignore
  return ({
    0: 1,
    1: 6,
  }[card.repetitions]) || Math.round(card.interval * card.easeFactor)
}

export function reviewCard(card: Card, difficulty: number): Card {
  const now = new Date()
  const newInterval = ankiInterval(card)
  const newEF = ankiEaseFactor(card, difficulty)
  const offset = now.getTime() + newInterval * 24 * 3600 * 1000
  console.log(offset)
  const newNextReview = new Date(offset)

  card.lastReviewed = now
  card.interval = newInterval
  card.easeFactor = newEF
  card.nextReview = newNextReview
  card.repetitions++
  card.difficulty = difficulty

  return card
}

const loadCards = (filePath: string) => {
  return require(filePath).cards.map((card: any) => {
    return {
      ...card,
      lastReviewed: new Date(card.lastReviewed),
      nextReview: new Date(card.nextReview),
    }
  });
}

// function that accepts an array of cards and writes them to a fileas a JSON object
export function writeCards(cards: Card[]) {
  const cardsJSON = JSON.stringify({cards}, null, 2)
  fs.writeFileSync('./cards.json', cardsJSON);
}

const createReviewDeck = (cards: Card[]) => {
  return cards.map(card => {
    return {
      front: front(card),
      back: back(card),
      flipped: false,
      card
    }
  })
}

export const getCardsForReview = (filePath: string) => {
  const rawCards = loadCards(filePath);
  return createReviewDeck(rawCards);
}

const front = (card: Card) => {
  const cardView = box(card.question)
  heading(chalk.bold.yellow('Question:'), cardView)
  button(chalk.bold.green('(space) - Flip'), cardView) 
  return cardView;
}

const back = (card: Card) => {
  const cardView = box(card.answer)
  heading(chalk.bold.yellow('Answer:'), cardView)
  button(chalk.bgGreen('1')+chalk.bgYellow('2')+chalk.bgRed('3'), cardView) 
  return cardView;
}


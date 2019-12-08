// In-game functions that does not handle the state
import { find, uniqBy, uniqueId, shuffle, times } from 'lodash'
import { icons } from '../resources/icons.js'

function randomIntegerInRange(max) {
  return Math.floor((Math.random() * max) + 1)
}

export function dealCards(numberOfPairs) {
  const dealtCards = []

  function getPairAndPushToCardsArray() {
    const randomIcon = icons[randomIntegerInRange(icons.length)]
    if (!find(dealtCards, { icon: randomIcon })) {
      dealtCards.push({ id: uniqueId(), icon: randomIcon })
      dealtCards.push({ id: uniqueId(), icon: randomIcon })
    } else getPairAndPushToCardsArray()
  }
  times(numberOfPairs, getPairAndPushToCardsArray)
  return shuffle(dealtCards)
}

export function validatePair(flippedCards) {
  return uniqBy(flippedCards, 'icon').length === 1
}

export function isCardFlipped(cardId, flippedCards) {
  if (find(flippedCards, { id: cardId })) return true
  return false
}

export function getPairsPerDifficulty(difficulty) {
  switch(difficulty) {
    case 'Medium': return 8
    case 'Hard': return 12
    default: return 4
  }
}

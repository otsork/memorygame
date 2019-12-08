import {
  dealCards,
  validatePair,
  isCardFlipped,
  getPairsPerDifficulty
} from '../gameActions'

describe('gameActions.js tests', () => {
  const flippedCards = [
    { icon: 'clear', id: '123' },
    { icon: 'clear', id: '321' }
  ]

  it('getPairsPerDifficulty returns expected values with given arguments', () => {
    expect(getPairsPerDifficulty('Medium')).toBe(8)
    expect(getPairsPerDifficulty('Hard')).toBe(12)
    expect(getPairsPerDifficulty('defaultCase')).toBe(4)
  })

  it('isCardFlipped() returns true if card exists in flippedCards array', () => {
    expect(isCardFlipped('123', flippedCards)).toBe(true)
  })

  it('isCardFlipped() returns false if card doesnt exist in flippedCards array', () => {
    expect(isCardFlipped('wrong_id', flippedCards)).toBe(false)
  })

  it('validatePair() returns true if array objects icon properties match', () => {
    expect(validatePair(flippedCards)).toBe(true)
  })

  it('dealCards() returns double the amount of card objects than given numberOfPairs', () => {
    const numberOfPairs = 4
    expect(dealCards(numberOfPairs).length).toBe(numberOfPairs * 2)
  })
})

import React, { useState, useEffect } from 'react'
import { includes } from 'lodash'

import Card from '../components/Card'
import GameBar from '../components/GameBar'
import GameTable from '../components/GameTable'
import CompletedModal from '../components/CompletedModal'
import { validatePair, dealCards, isCardFlipped, getPairsPerDifficulty } from '../utils/gameActions'

function GameContainer() {
  // Game states
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [foundPairs, setFoundPairs] = useState([])
  const [missedAttempts, setMissedAttempts] = useState(0)
  const [flipDisabled, setFlipDisabled] = useState(false)
  const [completed, setCompleted] = useState(false)

  // Game rules
  const [pairsInGame, setPairsInGame] = useState(getPairsPerDifficulty('Easy'))
  const [difficulty, setDifficulty] = useState(['Easy', 'Medium', 'Hard'])
  const currentDifficulty = difficulty[0]
  
  useEffect(() => {
    function resetCards() {
      setMissedAttempts(missed => missed + 1)
      setFlippedCards([])
      setFlipDisabled(false)
    }

    function handleValidPair() {
      const newPairs = [...foundPairs]
      newPairs.push(flippedCards[0].icon)
  
      setFoundPairs(newPairs)
      setFlippedCards([])
      setFlipDisabled(false)
    }
  
    function handleInvalidPair() {
      setFlipDisabled(true)
      setTimeout(resetCards, 1200)
    }

    if (flippedCards.length > 1) {
      validatePair(flippedCards) ? handleValidPair() : handleInvalidPair()
    }
  }, [flippedCards, foundPairs])

  useEffect(() => {
    if (foundPairs.length === pairsInGame) {
      setTimeout(() => setCompleted(true), 700)
    }
  }, [foundPairs, pairsInGame])

  function changeDifficulty() {
    const newDifficulty = [...difficulty]
    newDifficulty.push(currentDifficulty)
    newDifficulty.shift()
    setDifficulty(newDifficulty)
  }

  function dealCardsAndStartNewGame() {
    const dealNewCards = () => dealCards(getPairsPerDifficulty(currentDifficulty))
    setFlippedCards([])
    setFoundPairs([])
    setMissedAttempts(0)
    setPairsInGame(getPairsPerDifficulty(currentDifficulty))
    setCards(dealNewCards())
    setCompleted(false)
    setFlipDisabled(false)
  }

  function flipCard(card) {
    const flipped = [...flippedCards]
    flipped.push(card)
    setFlippedCards(flipped)
  }

  return (
    <>
      <GameBar
        startNewGame={dealCardsAndStartNewGame}
        changeDifficulty={changeDifficulty}
        difficulty={currentDifficulty}
        gameStarted={cards.length > 0} />
      <GameTable>
        {
          cards.map((card) => {
            const flipped = isCardFlipped(card.id, flippedCards)
            const pairFound = includes(foundPairs, card.icon)
            return (
              <Card
                key={card.id}
                disabled={flipDisabled}
                pairFound={pairFound}
                flipped={flipped}
                icon={card.icon}
                id={card.id}
                flipCard={flipCard} />
            )
          })
        }
      </GameTable>
      {
        completed &&
        <CompletedModal
          completed={completed}
          missedAttempts={missedAttempts}
          startNewGame={dealCardsAndStartNewGame} />
      }
    </>
  )
}

export default GameContainer
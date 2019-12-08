import React, { useState, useEffect } from 'react'
import { includes } from 'lodash'

import Card from '../components/Card'
import GameBar from '../components/GameBar'
import GameTable from '../components/GameTable'
import CompletedModal from '../components/CompletedModal'
import { validatePair, dealCards, isCardFlipped, getPairsPerDifficulty } from '../utils/gameActions'

const initialGameState = {
  cardsDisabled: false,
  missedAttempts: 0,
  dealtCards: [],
  flippedCards: [],
  arrayOfFoundPairs: [],
  completed: false
}

const initialRules = {
  numberOfPairsInGame: getPairsPerDifficulty('Easy'),
  difficulty: ['Easy', 'Medium', 'Hard']
}

function GameContainer() {
  const [gameState, setGameState] = useState(initialGameState)
  const [rules, setGameRules] = useState(initialRules)
  const setState = (newState) => setGameState({ ...gameState, ...newState })
  const setRules = (newRules) => setGameRules({ ...rules, ...newRules })  
  
  useEffect(() => {
    if (gameState.flippedCards.length > 1) validatePair(gameState.flippedCards) ? handleValidPair() : handleInvalidPair()
    if (gameState.arrayOfFoundPairs.length === rules.numberOfPairsInGame) setTimeout(() => setState({ completed: true }), 700)
    // eslint-disable-next-line
  }, [gameState.flippedCards]) // find out why useEffect sees ternary results as dependencies

  function changeDifficulty() {
    const difficulty = rules.difficulty
    difficulty.push(rules.difficulty[0])
    difficulty.shift()

    setRules({
      difficulty,
      numberOfPairsInGame: getPairsPerDifficulty(difficulty[0])
    })
  }

  function resetCards() {
    setState({
      missedAttempts: gameState.missedAttempts + 1,
      flippedCards: [],
      cardsDisabled: false
    })
  }
  
  function dealCardsAndStartNewGame() {
    setState({
      ...initialGameState,
      dealtCards: dealCards(rules.numberOfPairsInGame)
    })
  }

  function flipCard(card) {
    const flipped = [...gameState.flippedCards]
    flipped.push(card)

    setState({ flippedCards: flipped })
  }

  function handleValidPair() {
    const newPairs = [...gameState.arrayOfFoundPairs]
    newPairs.push(gameState.flippedCards[0].icon)

    setState({
      arrayOfFoundPairs: newPairs,
      flippedCards: [],
      cardsDisabled: false
    })
  }

  function handleInvalidPair() {
    setState({ cardsDisabled: true })
    setTimeout(resetCards, 1200)
  }

  return (
    <>
      <GameBar
        startNewGame={dealCardsAndStartNewGame}
        changeDifficulty={changeDifficulty}
        difficulty={rules.difficulty[0]}
        gameStarted={gameState.dealtCards.length > 0} />
      <GameTable>
        {
          gameState.dealtCards.map((card) => {
            const flipped = isCardFlipped(card.id, gameState.flippedCards)
            const pairFound = includes(gameState.arrayOfFoundPairs, card.icon)
            return (
              <Card
                key={card.id}
                disabled={gameState.cardsDisabled}
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
        gameState.completed &&
        <CompletedModal
          completed={gameState.completed}
          missedAttempts={gameState.missedAttempts}
          startNewGame={dealCardsAndStartNewGame} />
      }
    </>
  )
}

export default GameContainer
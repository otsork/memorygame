import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import * as colors from '../constants/colors'

const useStyles = makeStyles({
  gameBar: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    backgroundColor: colors.white,
    top: 0,
    zIndex: 1000
  },
  button: {
    color: colors.black
  }
})

function GameBar(props) {
  const {
    startNewGame,
    changeDifficulty,
    difficulty,
    gameStarted
  } = props
  const classes = useStyles()

  return (
    <div className={classes.gameBar}>
      <Button id='startNewGame-button' classes={{ root: classes.button }} onClick={startNewGame}>{ gameStarted ? 'Shuffle & restart' : 'Start game!' }</Button>
      <Button id='difficulty-button' classes={{ root: classes.button }} onClick={changeDifficulty}>{ `Difficulty: ${difficulty}` }</Button>
    </div>
  )
}

export default GameBar
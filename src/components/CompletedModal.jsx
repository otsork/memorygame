import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import { white } from '../constants/colors'

const useStyles = makeStyles({
  modal: {
    position: 'fixed',
    width: '34%',
    height: '34%',
    left: '33%',
    top: '33%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: '3px',
    boxShadow: `1px 2px 3px 3px rgba(0, 0, 0, 0.5)`,
    transition: 'opacity 175ms cubic-bezier(.82,.34,.71,1.39) 0.6s',
  },
  message: {
    fontSize: '1.5vw',
    fontWeight: '600',
  },
  backdrop: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(128, 128, 128 0.4)',
  },
  button: {
    marginTop: '20px',
    fontSize: '1.5vw'
  }
})

function Card(props) {
  const { missedAttempts, startNewGame } = props
  const classes = useStyles()

  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <p id='modalMessage' className={classes.message}>{ `All of the pairs found with ${missedAttempts} missed attempts!` }</p>
        <Button id='startNewGameButton' classes={{ root: classes.button }} onClick={startNewGame}>Start a new game!</Button>
      </div>
    </div>
  )
}

export default Card
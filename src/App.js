import React from 'react'
import GameContainer from './containers/GameContainer'
import { makeStyles } from '@material-ui/styles'
import { gameBackground } from './constants/constants'

const useStyles = makeStyles({
  app: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: `url("${gameBackground}") no-repeat fixed center`,
  backgroundSize: 'cover',
  overflowY: 'auto',
  overflowX: 'hidden',
  }
})
function App() {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <GameContainer />
    </div>
  )
}

export default App

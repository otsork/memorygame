import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  gameTable: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '100px 50px',
    width: '100%',
    minHeight: '100vh',
  }
})


function GameTable(props) {
  const classes = useStyles()
  const { children } = props

  return (
    <div className={classes.gameTable}>
      { children }
    </div>
  )
}

export default GameTable
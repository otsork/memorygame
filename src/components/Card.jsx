import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Icon } from '@material-ui/core'

import * as colors from '../constants/colors'
import * as constants from '../constants/variables'

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    position: 'relative',
    width: '100px',
    height: '140px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    perspective: '1000px',
    margin: '15px',
  },
  cardPerspectiveWrapper: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.5s',
    transformStyle: 'preserve-3d',
    alignContent: 'center'
  },
  flipped: {
    transform: 'rotateY(180deg)'
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `8px solid #fff`,
    borderRadius: '6px',
    height: '130px',
    width: '90px',
    cursor: 'pointer',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    boxShadow: '-1px 3px 3px 3px rgba(0, 0, 0, 0.3)'
  },
  cardFront: {
    backgroundColor: colors.white,
    transform: 'rotateY(180deg)'
  },
  cardBack: {
    background: `url("${constants.reactLogo}") no-repeat center`,
    backgroundSize: '50%',
    backgroundColor: colors.black,
    borderRadius: '5px',
  },
  icon: {
    fontSize: '70px'
  },
  pairFound: {
    transition: 'all 250ms linear 400ms',
    transform: 'scale(0.95)'
  }
})

function Card(props) {
  const classes = useStyles()
  const {
    disabled,
    id,
    icon,
    flipped,
    flipCard,
    pairFound
  } = props

  function flip() {
    if (!disabled && !flipped && !pairFound) flipCard({ id, icon })
  }

  return (
    <div className={`${classes.cardContainer} ${pairFound && classes.pairFound}`} onClick={flip}>
      <div className={`${classes.cardPerspectiveWrapper} ${(flipped || pairFound) && classes.flipped}`}>
        <div className={`${classes.card} ${classes.cardFront}`}>
          <Icon classes={{ root: classes.icon }}>{icon}</Icon>
        </div>
        <div className={`${classes.card} ${classes.cardBack}`} />
      </div>
    </div>
  )
}

export default Card
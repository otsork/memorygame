import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Button } from '@material-ui/core'
import GameBar from '../GameBar'

Enzyme.configure({ adapter: new Adapter() })

describe('GameBar tests', () => {
  const difficulty = 'ridiculous'
  let startButtonClicked
  let difficultyButtonClicked
  let props

  beforeEach(() => {
    startButtonClicked = false
    difficultyButtonClicked = false
    props = {
      startNewGame: () => startButtonClicked = true,
      changeDifficulty: () => difficultyButtonClicked = true,
      difficulty,
    }
  })

  it('renders 2 <Button> components', () => {
    const component = shallow(<GameBar {...props} />)
    const buttons = component.find(Button)
    expect(buttons.length).toBe(2)
  })

  it('startNewGame button text changes according to gameStarted prop', () => {
    const button = shallow(<GameBar />).find('#startNewGame-button')
    const buttonGameStarted = shallow(<GameBar gameStarted />).find('#startNewGame-button')
    expect(button.text()).not.toBe(buttonGameStarted.text())
  })

  it('calls startNewGame callback when difficulty button is clicked', () => {
    const button = shallow(<GameBar {...props} />).find('#startNewGame-button')
    expect(startButtonClicked).toBe(false)
    button.simulate('click')
    expect(startButtonClicked).toBe(true)
  })

  it('difficulty button text adapts to difficulty level', () => {
    const button = shallow(<GameBar {...props} />).find('#difficulty-button')
    expect(button.text()).toContain(difficulty)
  })

  it('calls changeDifficulty callback when difficulty button is clicked', () => {
    const button = shallow(<GameBar {...props} />).find('#difficulty-button')
    expect(difficultyButtonClicked).toBe(false)
    button.simulate('click')
    expect(difficultyButtonClicked).toBe(true)
  })
})

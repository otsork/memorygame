import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import CompletedModal from '../CompletedModal'

Enzyme.configure({ adapter: new Adapter() })

describe('Card tests', () => {
  const missedAttempts = 555
  let clicked = false
  let props
  beforeEach(() => {
    clicked = false
    props = {
      startNewGame: () => clicked = true,
      missedAttempts
    }
  })

  it('renders message with correct number of missed attempts', () => {
    const component = shallow(<CompletedModal {...props} />)
    const modalMessage = component.find('#modalMessage').text()
    expect(modalMessage).toContain(missedAttempts)
  })
  it('startNewGame callback is executed when button is clicked', () => {
    const component = shallow(<CompletedModal {...props} />)
    const startNewGameButton = component.find('#startNewGameButton')
    expect(clicked).toBe(false)
    startNewGameButton.simulate('click')
    expect(clicked).toBe(true)
  })
})

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Icon } from '@material-ui/core'
import Card from '../Card'

Enzyme.configure({ adapter: new Adapter() })

describe('Card tests', () => {
  let clicked
  let props

  beforeEach(() => {
    clicked = false
    props = {
      id: 'testId',
      icon: 'clear',
      disabled: false,
      flipped: false,
      pairFoud: false,
      flipCard: () => clicked = true,
    }
  })

  it('renders an <Icon> component with material-icon according to icon -prop', () => {
    const component = shallow(<Card {...props} />)
    const icon = component.find(Icon)
    expect(icon.text()).toBe('clear')
  })
  it('flipCard callback is not executed if card is disabled', () => {
    const component = shallow(<Card {...props} disabled />)
    component.simulate('click')
    expect(clicked).toBe(false)
  })
  it('flipCard callback is not executed if pairFound prop is true', () => {
    const component = shallow(<Card {...props} pairFound />)
    component.simulate('click')
    expect(clicked).toBe(false)
  })
  it('flipCard callback is not executed if flipped prop is true', () => {
    const component = shallow(<Card {...props} flipped />)
    component.simulate('click')
    expect(clicked).toBe(false)
  })
})

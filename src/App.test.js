import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from './App'
import GameContainer from './containers/GameContainer'

Enzyme.configure({ adapter: new Adapter() })

describe('App tests', () => {
  it('renders a GameContainer component', () => {
    const component = shallow(<App />)
    const wrapper = component.find(GameContainer)
    expect(wrapper.length).toBe(1)
  })
})

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import GameTable from '../GameTable'

Enzyme.configure({ adapter: new Adapter() })

describe('GameTable tests', () => {
  it('renders its children components', () => {
  const component = shallow(<GameTable children={<div id='test-div' />} />)
    expect(component.find('#test-div').length).toBe(1)
  })
})

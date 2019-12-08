import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import GameContainer from '../GameContainer'
import GameBar from '../../components/GameBar'
import GameTable from '../../components/GameTable'
import Card from '../../components/Card'
import CompletedModal from '../../components/CompletedModal'

Enzyme.configure({ adapter: new Adapter() })

describe('GameContainer tests', () => {
  it('renders <GameContainer /> component without crashing', () => {
    const component = shallow(<GameContainer />)
    expect(component.length).toBe(1)
  })
  // find out how to utilize useState -hook in tests to test rest of the logic
})

import { slot } from 'rimple'
import test from 'tape'
import { withSlots } from './'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

configure({ adapter: new Adapter() })

test('basic', t => {
  class NameComponent extends React.Component {
    render () {
      return <div>{this.props.name}</div>
    }
  }
  let name = slot('Tom').tag('name')
  const NameComponentWithSlots = withSlots({ name })(NameComponent)
  let wrapped = shallow(<NameComponentWithSlots />)
  t.equal(wrapped.props().name, 'Tom')
  t.equal(wrapped.html(), '<div>Tom</div>')

  name.val('Jerry')
  t.equal(wrapped.props().name, 'Jerry')
  t.equal(wrapped.html(), '<div>Jerry</div>')
  t.end()
})

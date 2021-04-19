import React from 'react';
import ReactDOM from 'react-dom'
import SamuraiJSAppApp from './App'

it('render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SamuraiJSAppApp />, div)
  ReactDOM.unmountComponentAtNode(div)
})

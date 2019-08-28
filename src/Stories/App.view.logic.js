import App from './App.view.js'
import { Flow } from '../useFlow.js'
import React from 'react'
import Card from '../components/card/card.component'
export default function AppLogic(props) {
  return (
    <Flow>
      <Card />
      <App {...props} />
    </Flow>
  )
}
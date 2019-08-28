import App from './App.view.js'
import { Flow } from '../useFlow.js'
import React from 'react'
import CardList from '../components/card-list/card-list.component'
export default function AppLogic(props) {
  return (
    <Flow>
      <App {...props} />
      <CardList />
    </Flow>
  )
}
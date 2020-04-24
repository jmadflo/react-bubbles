import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'
import './styles.scss'


const App = () => {
  return (
    <Router>
      <div className='App'>
        {/* Passing components as the prop components provides our rendered components with a history prop that we can use to redirect the user */}
        <Switch>
          <PrivateRoute exact path='/bubble' component={BubblePage}/>
          <Route exact path='/' component={Login} />
        </Switch>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  )
}

export default App

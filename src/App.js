import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

// Import Board and Scoreboard views
import  Board  from './components/board.js'
import  frontPage  from './components/FrontPage.js'

import './styles/board.css'
import './styles/box.css'
import './styles/buttons.css'

// Create App component
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={frontPage}/>
          <Route path="/board" component={Board}/>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
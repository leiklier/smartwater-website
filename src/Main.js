import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './routes/Home.js'
import About from './routes/About.js'

class Main extends Component {
  render() {
    return(
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </main>
    );
  }
}

export default Main

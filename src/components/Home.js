import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return(
      <p>
        This is the home page.
        <Link to="/about">About</Link>
      </p>
    );
  }
}

export default Home

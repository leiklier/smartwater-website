import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class About extends Component {
  render() {
    return(
      <p>
        This is the about page.
        <Link to="/">Go home</Link>
      </p>
    );
  }
}

export default About

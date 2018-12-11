import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';

class Manage extends Component {
  render() {
    return (
      <>
        <Navbar navValue={1} />
        <main>
          <h1>Hello from manage</h1>
        </main>
      </>
    )
  }
}

export default withRouter(Manage);
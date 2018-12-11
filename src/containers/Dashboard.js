import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';

class Dashboard extends Component {
  render() {
    return (
      <>
        <Navbar navValue={0} />
        <main>
          <h1>Hello from dashboard</h1>
        </main>
      </>
    )
  }
}

export default withRouter(Dashboard);
import React, { Component } from 'react'

import Navbar from '../components/Navbar';

class Shop extends Component {
  render() {
    return (
      <>
        <Navbar navValue={2} />
        <main>
          <h1>Shop</h1>
        </main>
      </>
    )
  }
}

export default Shop;
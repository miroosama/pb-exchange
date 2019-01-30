import React, { Component } from 'react';
import Accounts from './components/accounts'
import Navbar from 'react-bootstrap/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App" >
          <Navbar bg="dark" variant="dark" expand="lg">
             <Navbar.Brand bg="light">Paybear Exchange</Navbar.Brand>
          </Navbar>
          <Accounts />
      </div>
    );
  }
}

export default App;

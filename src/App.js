import React, { Component } from 'react';
import Accounts from './components/accounts'
import Navbar from 'react-bootstrap/Navbar'
import { connect } from "react-redux"
import { conversionReducer } from './actions/actions'

class App extends Component {

  componentDidMount(){
    fetch("http://data.fixer.io/api/latest?access_key=29b50b66916a75571c24af5f01d6b5fa")
    .then(res => {
      res.json()
      .then(response =>{
        console.log(response)
        this.props.conversionReducer(response)
      })
    })
  }

  render() {
    console.log(this.props.conversions)
    return (
      <div className="App" bsstyle="light">
          <Navbar bg="light" variant="light" expand="lg">
             <Navbar.Brand bg="light">Paybear Exchange</Navbar.Brand>
          </Navbar>
          <h1>Accounts</h1>
          <Accounts />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    conversions: state.conversions
  }
}

export default connect(mapStateToProps, { conversionReducer })(App);

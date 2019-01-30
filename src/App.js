import React, { Component } from 'react';
import Accounts from './components/accounts'
import TransactionModal from './components/transactionModal'
import AddAccountModal from './components/addAccountModal'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { connect } from "react-redux"
import { conversionAction } from './actions/actions'

class App extends Component {

  state = {
    transactionModalOpen: false,
    addModalOpen: false
  }

  componentDidMount(){
    fetch("http://data.fixer.io/api/latest?access_key=29b50b66916a75571c24af5f01d6b5fa")
    .then(res => {
      res.json()
      .then(response =>{
        this.props.conversionAction(response)
      })
    })
  }

  handleTransfer = () => {
    this.setState({ transactionModalOpen: !this.state.transactionModalOpen })
  }

  handleAdd = () => {
    this.setState({ addModalOpen: !this.state.addModalOpen })
  }

  handleCloseModal = (modal) => {
    if(modal === "addModal"){
    this.setState({addModalOpen: false})
  } else {
    this.setState({transactionModalOpen: false})
  }
}


  render() {
    return (
      <div className="App" bsstyle="light">
          <Navbar bg="light" variant="light" expand="lg">
             <Navbar.Brand bg="light">Paybear Exchange</Navbar.Brand>
             <Button onClick={this.handleTransfer} variant="outline-success">Transfer</Button>
             <Button onClick={this.handleAdd} variant="outline-success">Add Account</Button>
          </Navbar>
          <h1>Accounts</h1>
          <Accounts />
          {this.state.transactionModalOpen ? <TransactionModal /> : null}
          {this.state.addModalOpen ? <AddAccountModal closeModal={this.handleCloseModal} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    conversions: state.conversions
  }
}

export default connect(mapStateToProps, { conversionAction })(App);

import React, { Component } from 'react';
import Accounts from './components/accounts'
import TransactionModal from './components/transactionModal'
import AddAccountModal from './components/addAccountModal'
import DepositModal from './components/depositModal'
import WithdrawModal from './components/withdrawModal'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { connect } from "react-redux"
import { conversionAction } from './actions/actions'

class App extends Component {

  state = {
    transactionModalOpen: false,
    addModalOpen: false,
    depositModalOpen: false,
    withdrawModalOpen: false
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
    this.setState({ transactionModalOpen: !this.state.transactionModalOpen, addModalOpen: false, depositModalOpen: false, withdrawModalOpen:false })
  }

  handleAdd = () => {
    this.setState({ addModalOpen: !this.state.addModalOpen, transactionModalOpen: false, withdrawModalOpen: false, depositModal: false })
  }

  handleDeposit = () => {
    this.setState({ depositModalOpen: !this.state.depositModalOpen, withdrawModalOpen: false, transactionModalOpen: false, addModalOpen: false })
  }

  handleWithdraw = () => {
    this.setState({ withdrawModalOpen: !this.state.withdrawModalOpen, transactionModalOpen: false, depositModalOpen: false, addModalOpen: false })
  }

  handleCloseModal = (modal) => {
    if(modal === "addModal"){
    this.setState({addModalOpen: false})
  } else if(modal === "transactionModal"){
    this.setState({transactionModalOpen: false})
  }
  else if(modal === "depositModal"){
    this.setState({depositModalOpen: false})
  }
  else if (modal === "withdrawModal"){
    this.setState({withdrawModalOpen: false})
  }
}


  render() {
    return (
      <div className="App" bsstyle="light">
          <Navbar bg="light" variant="light" expand="lg">
             <Navbar.Brand bg="light">Paybear Exchange</Navbar.Brand>
             <Button onClick={this.handleTransfer} variant="outline-success">Transfer</Button>
             <Button onClick={this.handleAdd} variant="outline-success">Add Account</Button>
             <Button onClick={this.handleDeposit} variant="outline-success">Deposit</Button>
             <Button onClick={this.handleWithdraw} variant="outline-success">Withdraw</Button>
          </Navbar>
          <h1>Accounts</h1>
          <Accounts />
          {this.state.transactionModalOpen ? <TransactionModal closeModal={this.handleCloseModal} /> : null}
          {this.state.addModalOpen ? <AddAccountModal closeModal={this.handleCloseModal} /> : null}
          {this.state.depositModalOpen ? <DepositModal closeModal={this.handleCloseModal} /> : null}
          {this.state.withdrawModalOpen ? <WithdrawModal closeModal={this.handleCloseModal} /> : null}
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

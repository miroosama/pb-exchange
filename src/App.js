import React, { Component } from 'react';
import Accounts from './components/accounts'
import TransactionModal from './components/transactionModal'
import AddAccountModal from './components/addAccountModal'
import DepositModal from './components/depositModal'
import WithdrawModal from './components/withdrawModal'
import ExchangeChart from './components/exchangeChart'
import TransactionHistory from './components/history'
import RatesList from './components/ratesList'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { connect } from "react-redux"
import { conversionAction } from './actions/actions'

class App extends Component {

  state = {
    transactionModalOpen: false,
    addModalOpen: false,
    depositModalOpen: false,
    withdrawModalOpen: false,
    rates: false,
    ratesList: false,
    history: false
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
    this.setState({ transactionModalOpen: !this.state.transactionModalOpen})
  }

  handleAdd = () => {
    this.setState({ addModalOpen: !this.state.addModalOpen})
  }

  handleDeposit = () => {
    this.setState({ depositModalOpen: !this.state.depositModalOpen})
  }

  handleWithdraw = () => {
    this.setState({ withdrawModalOpen: !this.state.withdrawModalOpen})
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
  } else if (modal === "ratesList"){
    this.setState({ratesList: false})
  } else if(modal === "history") {
    this.setState({history: false})
  } else {
    this.setState({rates: false})
  }
}

  handleRates = () => {
    this.setState({rates: !this.state.rates})
  }

  handleRatesList = () => {
    this.setState({ratesList: !this.state.ratesList})
  }

  handleHistory = () => {
    this.setState({history: !this.state.history})
  }


  render() {
    return (
      <div className="App" bsstyle="light">
          <Navbar bg="light" variant="light" expand="lg" className="justify-content-between">
             <Navbar.Brand bg="light">Paybear Exchange</Navbar.Brand>
             <ButtonToolbar>
             <Button onClick={this.handleTransfer} variant="outline-primary">Transfer</Button>
             <Button onClick={this.handleAdd} variant="outline-primary">Add Account</Button>
             <Button onClick={this.handleDeposit} variant="outline-primary">Deposit</Button>
             <Button onClick={this.handleWithdraw} variant="outline-primary">Withdraw</Button>
             </ButtonToolbar>
             <ButtonToolbar>
              <DropdownButton drop="left" variant="secondary" title="Options" id={`dropdown-button-drop-left`}key="left">
                <Dropdown.Item key="1" onClick={this.handleRates}>Exchange Rates Chart</Dropdown.Item>
                <Dropdown.Item key="2" onClick={this.handleRatesList}>Exchange Rates List</Dropdown.Item>
                <Dropdown.Item key="3" onClick={this.handleHistory}>Transaction History</Dropdown.Item>
              </DropdownButton>
             </ButtonToolbar>
          </Navbar>
          <h1>Accounts</h1>
          <Accounts/>
          {this.state.transactionModalOpen ? <TransactionModal closeModal={this.handleCloseModal}/> : null}
          {this.state.addModalOpen ? <AddAccountModal closeModal={this.handleCloseModal} /> : null}
          {this.state.depositModalOpen ? <DepositModal closeModal={this.handleCloseModal} /> : null}
          {this.state.withdrawModalOpen ? <WithdrawModal closeModal={this.handleCloseModal} /> : null}
          {this.state.rates ? <ExchangeChart closeModal={this.handleCloseModal} /> : null}
          {this.state.ratesList ? <RatesList closeModal={this.handleCloseModal} /> : null}
          {this.state.history ? <TransactionHistory closeModal={this.handleCloseModal} /> : null}
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

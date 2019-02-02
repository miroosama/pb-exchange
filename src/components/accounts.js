import { connect } from "react-redux"
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'


class Accounts extends Component {

  render() {
    let accs = this.props.accounts.accounts[1].amount
    Object.keys(this.props.accounts.accounts).forEach(acc =>{
      Object.keys(this.props.conversions.conversions).forEach(con =>{
        if(this.props.accounts.accounts[acc].type !== "EUR" && this.props.accounts.accounts[acc].type === con){
           accs += parseInt(this.props.accounts.accounts[acc].amount)/this.props.conversions.conversions[con]
        }
      })
    })
    let accountList = Object.keys(this.props.accounts.accounts).map(account =>{
      return (
        <tr key={this.props.accounts.accounts[account].type}>
          <td>{this.props.accounts.accounts[account].type}</td>
          <td>${parseFloat(this.props.accounts.accounts[account].amount).toFixed(2)}</td>
        </tr>
    )
    })
    return (
      <div>
        <Table striped bordered hover variant="light">
        <tbody>
        <tr key="Total">
          <td>Total</td>
          <td>${parseFloat(accs).toFixed(2)}</td>
        </tr>
        {accountList}
          </tbody>
        </Table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    accounts: state.accounts,
    conversions: state.conversions
  }
}

export default connect(mapStateToProps)(Accounts);

import { connect } from "react-redux"
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'


class Accounts extends Component {


  render() {
    console.log(this.props)
    let accountList = Object.keys(this.props.accounts.accounts).map(account =>{
      return (
        <tr key={this.props.accounts.accounts[account].type}>
          <td>{this.props.accounts.accounts[account].type}</td>
          <td>${this.props.accounts.accounts[account].amount}</td>
        </tr>
    )
    })
    return (
      <div>
        <Table striped bordered hover variant="light">
        <tbody>
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
    conversions: state.conversions,
    history: state.history
  }
}

export default connect(mapStateToProps)(Accounts);

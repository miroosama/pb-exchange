import { connect } from "react-redux"
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'


class Accounts extends Component {

  componentDidMount(){

  }


  render() {
    // console.log(this.props.accounts.accounts.accounts)
    let accountList = this.props.accounts.accounts.accounts.map(account =>{
            return (
                <tr key={account.type}>
                  <td>{account.type}</td>
                  <td>${account.amount}</td>
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
    accounts: state
  }
}

export default connect(mapStateToProps)(Accounts);

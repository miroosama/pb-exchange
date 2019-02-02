import { connect } from "react-redux"
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class TransactionHistory extends Component {


  render() {
    let count = 0
    let hist = []
    this.props.accounts.history.forEach(tx =>{
        if(tx.event === "Transfer"){
          hist.unshift(<tr key={count++}>
            <td>{tx.event}</td>
            <td>{tx.type}</td>
            <td>{tx.to}</td>
            <td>${parseFloat(tx.amount).toFixed(2) + " " + tx.to }</td>
          </tr>
        )
    } else if(tx.event === "Deposit") {
          hist.unshift(<tr key={count++}>
            <td>{tx.event}</td>
            <td>{tx.to}</td>
            <td>{tx.type}</td>
            <td>${parseFloat(tx.amount).toFixed(2) + " " + tx.type}</td>
          </tr>
        )
    } else {
      hist.unshift(<tr key={count++}>
            <td>{tx.event}</td>
            <td>{tx.type}</td>
            <td>{tx.to}</td>
            <td>${parseFloat(tx.amount).toFixed(2) + " " + tx.type }</td>
          </tr>
        )
    }
  })
    return (
      <div>
      <Modal show={true} onHide={() => {this.props.closeModal("history")}}>
        <Modal.Header>
          <Modal.Title>Transaction History</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {hist}
          </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => {this.props.closeModal("history")}}>Close</Button>
        </Modal.Footer>
      </Modal>;
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    accounts: state.accounts
  }
}

export default connect(mapStateToProps)(TransactionHistory);

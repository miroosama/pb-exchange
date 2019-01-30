import { connect } from "react-redux"
import React, { Component } from 'react';


class Accounts extends Component {
  
  render() {
    console.log(this.props.accounts)
    return (
      <div>
        hello
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    accounts: state.accounts
  }
}

export default connect(mapStateToProps)(Accounts);

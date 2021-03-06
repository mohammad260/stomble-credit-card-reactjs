import React, { Component } from 'react';
import '../css/transaction-complete.css';
import '../css/input-form.css';

export default class transactionComplete extends Component {
  render() {
    return (
      <div className='transactionContainer'>
        <div className='transactionText'>
          <h3 className='top-2vh'>Thank you!</h3>
          <h3>Your transaction has been submitted successfully</h3>
          <button
            className='submit buttonMargin'
            onClick={() => {
              window.location = '/';
            }}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }
}

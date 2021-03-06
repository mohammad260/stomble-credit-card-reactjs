import React from 'react';
import '../css/credit-card.css';
import '../css/flip-credit-card.css';

export default function creditCardBack(props) {
  return (
    <div className='card background-color'>
      <div className='color-white'>
        <div className='logo'>STOMBLE</div>
        <div className='cvvLabel '>CVV</div>
        <div className='cvvContainer'>
          <div className='cvvText'>{props.cvv}</div>
        </div>
      </div>
    </div>
  );
}

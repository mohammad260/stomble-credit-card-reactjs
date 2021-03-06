import React from 'react';
import '../css/credit-card.css';
import '../css/flip-credit-card.css';

export default function creditCardFront(props) {
  return (
    <div className='card background-color'>
      <div className='color-white'>
        <div className='logo'>STOMBLE</div>
        <div className='cardNumber'>{props.cardNumber}</div>

        {/* card holder name */}
        <div className='cardNameContainer'>
          <div className='cardHolder ml-4'>Card Holder</div>
          <div className='mt-4 ml-4'>{props.cardName}</div>
        </div>

        {/* card expiry date */}
        <div className='dateContainer'>
          <div className='cardHolder ml-4 mt-20'>Expires</div>
          <div>
            {props.month}/{props.year}
          </div>
        </div>
      </div>
    </div>
  );
}

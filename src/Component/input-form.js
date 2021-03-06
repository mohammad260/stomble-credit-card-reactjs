import React, { Component } from 'react';
import CreditCardFront from './credit-card-front';
import CreditCardBack from './credit-card-back';
import Joi from 'joi-browser';

var cardNumberLength = 0;
var flipCard = false;

export default class inputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: {
        cardNumber: '',
        cardName: '',
        expirationMonth: 'MM',
        expirationYear: 'YYYY',
        cvv: '',
      },
      errors: {
        cardNumber: '',
        cardName: '',
        expiration: '',
        cvv: '',
      },
    };
  }

  // Joi validation
  schema = {
    cardNumber: Joi.number().required().label('Card number'),
    cardName: Joi.string().required().label('Card name'),
    cvv: Joi.number().required().label('cvv'),
  };

  // validates form inputs
  validate = () => {
    const result = Joi.validate(this.state.creditCard, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    const { creditCard } = this.state;
    // checks card numbers length
    if (creditCard.cardNumber.trim().length !== 19)
      errors.cardNumber = '"Card numbers" needs to be 16 digits';
    else errors.cardNumber = '';

    // validate card expiry date
    var currentTime = new Date();
    if (
      creditCard.expirationYear === '2021' &&
      creditCard.expirationMonth <= currentTime.getMonth()
    )
      errors.expiration = 'Credit card has expired';
    else if (
      creditCard.expirationMonth === 'MM' ||
      creditCard.expirationYear === 'YYYY'
    )
      errors.expiration = 'Expiry date is required';

    // cvv length check
    if (creditCard.cvv.trim().length < 3)
      errors.cvv = '"cvv numbers" needs to be 3 or 4 digits';

    // set error objects value to empty string
    if (errors.cardNumber === undefined) errors.cardNumber = '';
    if (errors.cardName === undefined) errors.cardName = '';
    if (errors.expiration === undefined) errors.expiration = '';
    if (errors.cvv === undefined) errors.cvv = '';

    return errors;
  };

  // sets state value when input field is changed
  handleChange = ({ currentTarget: input }) => {
    const creditCard = { ...this.state.creditCard };

    // add auto spacing between card numbers
    if (input.name === 'cardNumber') {
      var inputLength = input.value.length;
      if (inputLength === 4 || inputLength === 9 || inputLength === 14) {
        if (inputLength > cardNumberLength) {
          input.value += ' ';
        }
      }
      cardNumberLength = inputLength;
    }

    creditCard[input.name] = input.value;
    this.setState({ creditCard });
  };

  // is called when submit button is clicked
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({
      errors: errors || {},
    });
    if (
      errors.cardNumber === '' &&
      errors.cardName === '' &&
      errors.expiration === '' &&
      errors.cvv === ''
    )
      window.location = '/transaction';
    else if (errors) return;
  };

  render() {
    const { creditCard, errors } = this.state;
    console.log(flipCard);
    return (
      <div className='container fontSize'>
        {/* credit card displayed on the screens */}
        <div>
          {/* set credit card data */}
          <div className='flip-box'>
            <div className='flip-box-inner'>
              {/* credit card front side */}
              <div className='flip-box-front'>
                {!flipCard && (
                  <CreditCardFront
                    cardNumber={creditCard.cardNumber}
                    cardName={creditCard.cardName}
                    month={creditCard.expirationMonth}
                    year={creditCard.expirationYear}
                  />
                )}
              </div>

              {/* credit card back side */}
              <div className='flip-box-back'>
                {flipCard && <CreditCardBack cvv={creditCard.cvv} />}
              </div>
            </div>
          </div>
        </div>
        {/* end credit card */}

        <div className='formContainer'>
          <form>
            <div className='formContainerMargin'>
              {/* card number */}
              <label htmlFor='cardNumber'>Card Number</label>
              <input
                value={creditCard.cardNumber}
                onChange={this.handleChange}
                onClick={() => {
                  flipCard = false;
                }}
                id='cardNumber'
                name='cardNumber'
                className='formInput'
                type='text'
                minLength='16'
                maxLength='19'
                required
              ></input>
              {errors.cardNumber !== '' && (
                <div className='errorMessage'>
                  {this.state.errors.cardNumber}
                </div>
              )}

              {/* card name */}
              <label htmlFor='cardName'>Card Name</label>
              <input
                value={creditCard.cardName}
                onChange={this.handleChange}
                onClick={() => {
                  flipCard = false;
                }}
                id='cardName'
                name='cardName'
                className='formInput'
                type='text'
                maxLength='40'
              ></input>
              {errors.cardName !== '' && (
                <div className='errorMessage'>{this.state.errors.cardName}</div>
              )}

              {/* expiration date */}
              <label htmlFor='expirationDate'>Expiration Date</label>
              <br></br>
              <select
                value={creditCard.expirationMonth}
                onChange={this.handleChange}
                onClick={() => {
                  flipCard = false;
                }}
                id='expirationMonth'
                name='expirationMonth'
                className='expirationDate mt-12'
              >
                <option value='MM'>Month</option>
                <option value='01'>1</option>
                <option value='02'>2</option>
                <option value='03'>3</option>
                <option value='04'>4</option>
                <option value='05'>5</option>
                <option value='06'>6</option>
                <option value='07'>7</option>
                <option value='08'>8</option>
                <option value='09'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
              </select>

              <select
                value={creditCard.expirationYear}
                onChange={this.handleChange}
                onClick={() => {
                  flipCard = false;
                }}
                id='expirationYear'
                name='expirationYear'
                className='expirationDate'
              >
                <option value='YYYY'>Year</option>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
              </select>
              {errors.expiration !== '' && (
                <div className='errorMessage'>
                  {this.state.errors.expiration}
                </div>
              )}

              {/* cvv input field */}
              <label htmlFor='cvv'>cvv</label>
              <br></br>
              <input
                value={creditCard.cvv}
                onChange={this.handleChange}
                onClick={() => {
                  flipCard = true;
                }}
                id='cvv'
                name='cvv'
                className='expirationDate'
                type='text'
                maxLength='4'
              ></input>
              <div className='cvvInfo'>
                3 or 4 digits usually found on the signature strip
              </div>
              {errors.cvv !== '' && (
                <div className='errorMessage cvvErrorPadding'>
                  {this.state.errors.cvv}
                </div>
              )}

              {/* submit button */}
              <button onClick={this.handleSubmit} className='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

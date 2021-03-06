import React from 'react';
import './App.css';
import './css/input-form.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import creditCardForm from './Views/credit-card-form';
import transactionComplete from './Component/transaction-complete';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <>
            <div className='centered'>
              <Route exact path='/' component={creditCardForm} />
              <Route
                exact
                path='/transaction'
                component={transactionComplete}
              />
            </div>
          </>
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;

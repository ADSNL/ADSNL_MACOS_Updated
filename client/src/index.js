import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
   
      <Switch>
        <Route exact component={App} />
      </Switch>
    
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();


// ReactDOM.render(
//   <BaseLayout />,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './vendor/normalize.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </React.StrictMode>,
  document.querySelector('.page')
);
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <SnackbarProvider maxSnack={5}>
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

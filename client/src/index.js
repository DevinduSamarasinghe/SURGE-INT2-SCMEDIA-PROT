import React from 'react';
//import ReactDOM  from 'react-dom';
import './index.css';
import { ContextProvider } from './contexts/ContextProvider';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );


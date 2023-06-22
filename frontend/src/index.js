import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BingosContextProvider } from './context/BingosContext'
import { AuthContextProvider } from './context/AuthContext'
import { CollectionsContextProvider } from './context/CollectionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CollectionsContextProvider>
        <BingosContextProvider>
          <App />
        </BingosContextProvider>
      </CollectionsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
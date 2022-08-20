import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './reset.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeContextProvider from './utils/contexts/modeContext';
import { SearchProvider } from './utils/contexts/searchContext';
import store from './redux/store';
import { AuthProvider } from './utils/contexts/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <AuthProvider>
        <SearchProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </SearchProvider>
      </AuthProvider>
    </ThemeContextProvider>
  </BrowserRouter>,
);

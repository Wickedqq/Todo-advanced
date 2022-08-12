import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './reset.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeContextProvider from './utils/modeContext';
import { SearchProvider } from './utils/searchContext';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <SearchProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SearchProvider>
    </ThemeContextProvider>
  </BrowserRouter>,
);

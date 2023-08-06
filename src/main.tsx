import 'normalize.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactModal from 'react-modal';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx'
import store, { persistor } from './redux/store/store.ts';

ReactModal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

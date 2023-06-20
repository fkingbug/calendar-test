import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/css/index.css'
import { store, persistor } from './app/store'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { PersistGate } from 'redux-persist/lib/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

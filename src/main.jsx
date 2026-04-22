import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './styles/components.css'
import { StatusBar } from '@capacitor/status-bar';

// Set up full screen
try {
  StatusBar.setOverlaysWebView({ overlay: true });
} catch (e) {
  console.log('StatusBar not available');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

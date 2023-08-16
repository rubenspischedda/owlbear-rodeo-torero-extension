import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PluginGate } from './PluginGate.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PluginGate>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PluginGate>
  </React.StrictMode>,
)

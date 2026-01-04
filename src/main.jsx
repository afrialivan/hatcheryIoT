import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import TestFirebase from './TestFirebase'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <TestFirebase /> */}
    <App />
  </StrictMode>,
)

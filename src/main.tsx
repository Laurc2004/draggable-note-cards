import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import "./tailwind.css"
import App from './App.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)

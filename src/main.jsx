import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

const rootElement = document.getElementById('root')

const appTree = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

if (rootElement && rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appTree)
} else if (rootElement) {
  createRoot(rootElement).render(appTree)
}

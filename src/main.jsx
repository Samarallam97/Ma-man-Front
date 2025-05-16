import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { setupMocks } from './mocks/browser'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { ApiProvider } from './context/ApiContext'
import './i18n'

// Initialize mock service worker in development
if (import.meta.env.DEV) {
  setupMocks()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <LanguageProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </ApiProvider>
    </BrowserRouter>
  </StrictMode>,
)
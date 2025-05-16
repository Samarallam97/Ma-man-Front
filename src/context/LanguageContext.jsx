import { createContext, useContext, useState, useEffect } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enTranslation from '../locales/en.json'
import arTranslation from '../locales/ar.json'

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ar: {
        translation: arTranslation
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  // Initialize language from localStorage or browser language
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'en'
  })

  // Get text direction based on language
  const dir = language === 'ar' ? 'rtl' : 'ltr'

  // Update i18n and localStorage when language changes
  useEffect(() => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }, [language])

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, dir, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
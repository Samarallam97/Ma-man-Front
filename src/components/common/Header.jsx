import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { 
  FiSun, 
  FiMoon, 
  FiMenu,
  FiGlobe
} from 'react-icons/fi'

export default function Header() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header 
      className="sticky top-0 z-50 px-6 bg-[var(--primary-color)] text-white shadow-md transition-shadow duration-300"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-full">
        <Link
          to="/"
          className="text-xl font-bold flex items-center"
        >
          Ma'man | مأمن
        </Link>

        <button
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="md:hidden p-6 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          aria-label="Toggle menu"
        >
      <FiMenu />
        </button>

        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row md:items-center absolute md:relative top-[100%] left-0 right-0 bg-[var(--primary-color)] md:bg-transparent px-4 md:px-4 py-2 md:py-2 gap-4 md:gap-6`}
          style={{ paddingTop: 'var(--spacing-2)', paddingBottom: 'var(--spacing-2)' }}
        >

          <div className="flex items-center space-x-4 md:space-x-2 rtl:space-x-reverse mt-4 md:mt-0">
                        <div 
              className="cursor-pointer p-2 rounded-full text-white hover:bg-white hover:bg-opacity-20 hover:text-white transition-colors"
              title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')} 
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </div>


 <div 
            className="cursor-pointer p-2 rounded-full text-white hover:bg-white hover:bg-opacity-20 hover:text-white transition-colors"
            title={t('nav.language')} onClick={toggleLanguage}>
              <FiGlobe size={20} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
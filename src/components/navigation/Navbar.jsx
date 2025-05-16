import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { 
  FiSun, 
  FiMoon, 
  FiGlobe, 
  FiUser, 
  FiBell, 
  FiSettings, 
  FiLogOut,
  FiCheckSquare,
  FiBook,
  FiMenu,
  FiX
} from 'react-icons/fi'
import Logo from './Logo'

function Navbar() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { toggleLanguage } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-neutral-800 sticky top-0 shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary-600 dark:text-primary-400">
                {t('app.name')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="nav-icon" title={t('nav.modules')}>
              <FiCheckSquare size={20} />
            </Link>
            <div className="nav-icon" title={t('nav.diary')}>
              <FiBook size={20} />
            </div>
            <div className="nav-icon" title={t('nav.notifications')}>
              <FiBell size={20} />
            </div>
            <div className="nav-icon" title={t('nav.settings')}>
              <FiSettings size={20} />
            </div>
            <div 
              className="nav-icon" 
              title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')} 
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </div>
            <div className="nav-icon" title={t('nav.language')} onClick={toggleLanguage}>
              <FiGlobe size={20} />
            </div>
            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
            <div className="nav-icon" title={t('nav.profile')}>
              <FiUser size={20} />
            </div>
            <button className="btn-outline text-sm">
              <FiLogOut className="inline mr-1" size={16} />
              {t('nav.logout')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="nav-icon"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-800 pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiCheckSquare className="mr-3" size={20} />
              <span>{t('nav.modules')}</span>
            </Link>
            <div className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
              <FiBook className="mr-3" size={20} />
              <span>{t('nav.diary')}</span>
            </div>
            <div className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
              <FiBell className="mr-3" size={20} />
              <span>{t('nav.notifications')}</span>
            </div>
            <div className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
              <FiSettings className="mr-3" size={20} />
              <span>{t('nav.settings')}</span>
            </div>
            <div 
              className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <FiSun className="mr-3" size={20} /> : <FiMoon className="mr-3" size={20} />}
              <span>{theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}</span>
            </div>
            <div 
              className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded cursor-pointer"
              onClick={toggleLanguage}
            >
              <FiGlobe className="mr-3" size={20} />
              <span>{t('nav.language')}</span>
            </div>
            <div className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
              <FiUser className="mr-3" size={20} />
              <span>{t('nav.profile')}</span>
            </div>
            <div className="flex items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded text-error-500">
              <FiLogOut className="mr-3" size={20} />
              <span>{t('nav.logout')}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
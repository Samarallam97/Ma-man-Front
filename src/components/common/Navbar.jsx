import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

// Import icons from react-icons/fi
import {
  FiCheckSquare,
  FiBook,
  FiBell,
  FiSun,
  FiMoon,
  FiGlobe,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi'

export default function Navbar() {
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
          to="/categories"
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
          } md:flex flex-col md:flex-row md:items-center absolute md:relative top-[100%] left-0 right-0 bg-[var(--primary-color)] md:bg-transparent px-4 md:px-0 py-2 md:py-0 gap-4 md:gap-6`}
          style={{ paddingTop: 'var(--spacing-2)', paddingBottom: 'var(--spacing-2)' }}
        >

          <div className="flex items-center space-x-4 md:space-x-2 rtl:space-x-reverse mt-4 md:mt-0">
            
             <Link to="/todos" className="nav-icon p-2 rounded-full text-white hover:bg-white hover:bg-opacity-20 hover:text-white transition-colors" title={t('nav.todos')}>
              <FiCheckSquare size={20} />
             </Link>
            
            <Link  to="/diaries" className="nav-icon p-2 rounded-full text-white hover:bg-white hover:bg-opacity-20 hover:text-white transition-colors" title={t('nav.diary')}>
              <FiBook size={20} />
            </Link>

             <Link  to="/notifications" className="nav-icon p-2 rounded-full text-white hover:bg-white hover:bg-opacity-20 hover:text-white transition-colors" title={t('nav.notifications')}>
              <FiBell size={20} />
            </Link>


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

            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
            
            <Link 
            to="/profile"
             className="nav-icon p-2 rounded-full text-white hover:bg-white hover:bg-opacity-20 hover:text-white transition-colors"
            title={t('nav.profile')}>
              <FiUser size={20} />
            </Link>

            <button className="btn-outline text-sm">
              <FiLogOut className="inline mr-1" size={16} />
              {t('nav.logout')}
            </button>
            
          </div>
        </nav>
      </div>
    </header>
  )
  
}
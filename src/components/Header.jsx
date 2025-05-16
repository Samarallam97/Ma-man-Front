import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// Icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
)

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-2);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px var(--shadow-color);
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  
  &:hover {
    color: white;
    opacity: 0.9;
  }
`

const Nav = styled.nav`
  @media (max-width: 768px) {
    display: ${props => props.$isMenuOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--primary-color);
    flex-direction: column;
    padding: var(--spacing-2);
  }

  @media (min-width: 769px) {
    display: flex;
    align-items: center;
  }
`

const NavLink = styled(Link)`
  color: white;
  margin: 0 var(--spacing-2);
  padding: var(--spacing-1) 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width var(--transition-normal) ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-1) 0;
    margin: var(--spacing-1) 0;
    
    &:hover::after {
      width: 30%;
    }
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button`
  background: transparent;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-2);
  padding: var(--spacing-1);
  border-radius: 50%;
  transition: background-color var(--transition-fast) ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const LanguageButton = styled(Button)`
  font-weight: bold;
  width: 40px;
  height: 40px;
`

const MenuButton = styled(Button)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`

function Header() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ma'man | مأمن
          </motion.span>
        </Logo>
        
        <MenuButton onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </MenuButton>
        
        <Nav $isMenuOpen={isMenuOpen}>
          {/* <NavLink to="/">{t('home')}</NavLink>
          <NavLink to="/rules">{t('rules')}</NavLink>
          <NavLink to="/vision">{t('vision')}</NavLink>
          <NavLink to="/about">{t('about')}</NavLink>
          <NavLink to="/goal">{t('goal')}</NavLink>
          <NavLink to="/login">{t('login')}</NavLink> */}
          
          <Controls>
            <Button onClick={toggleTheme} aria-label={theme === 'light' ? t('dark_mode') : t('light_mode')}>
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            
            <LanguageButton onClick={toggleLanguage}>
              {language === 'en' ? 'ع' : 'En'}
            </LanguageButton>
          </Controls>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
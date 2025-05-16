import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: var(--secondary-color);
  color: var(--text-color);
  padding: var(--spacing-3) 0;
  border-top: 1px solid var(--border-color);
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-2);
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-2);
  }
`

const SocialLink = styled.a`
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  transition: color var(--transition-fast) ease;
  
  &:hover {
    color: var(--primary-light);
  }
`

const Copyright = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
`

function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          &copy; {currentYear} Ma'man | مأمن. {t('welcome_description')}
        </Copyright>
        
        <SocialLinks>
          <SocialLink href="/support-us" aria-label={t('support_us')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>{t('support_us')}</span>
          </SocialLink>
          
          <SocialLink href="/contact-us" aria-label={t('contact_us')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>{t('contact_us')}</span>
          </SocialLink>
          
          <SocialLink href="/join-us" aria-label={t('join_us')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span>{t('join_us')}</span>
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
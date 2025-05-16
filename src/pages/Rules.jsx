import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../context/LanguageContext'
import { useApi } from '../context/ApiContext'
import NextButton from '../components/NextButton'
import PrevButton from '../components/PrevButton'
import PageTransition from '../components/PageTransition'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px);
  padding: var(--spacing-4) var(--spacing-2);
  text-align: center;
  background: linear-gradient(
    135deg,
    var(--card-background) 0%,
    var(--background-color) 50%,
    var(--card-background) 100%
  );
  position: relative;
  overflow: hidden;
`

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: var(--spacing-3);
  text-align: center;
`

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: var(--spacing-4);
  text-align: center;
  max-width: 1000px;
`

const RulesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-5);
  width: 100%;
`

const RuleItem = styled(motion.li)`
  background-color: var(--card-background);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  margin-bottom: var(--spacing-2);
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  
  svg {
    color: var(--primary-color);
    margin-right: var(--spacing-2);
    min-width: 24px;
    
    [dir="rtl"] & {
      margin-right: 0;
      margin-left: var(--spacing-2);
    }
  }
`

function Rules() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { api } = useApi()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await api.getContent()
        setContent(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching content:', error)
        setLoading(false)
      }
    }
    
    fetchContent()
  }, [api])
  
  if (loading) {
    return (
      <Container>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
            <path d="M12 2C6.48 2 2 6.48 2 12" />
          </svg>
        </motion.div>
      </Container>
    )
  }
  
  const rulesContent = content?.rules[language] || {}
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, x: language === 'ar' ? 20 : -20 },
    visible: { opacity: 1, x: 0 }
  }
  
  return (
    <PageTransition>
      <Container>
        <Title>{rulesContent.title || t('rules')}</Title>
        <Description>{rulesContent.description}</Description>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%' }}
        >
          <RulesList>
            {rulesContent.points?.map((rule, index) => (
              <RuleItem key={index} variants={itemVariants} whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                {rule}
              </RuleItem>
            ))}
          </RulesList>
        </motion.div>
        
      <NextButton to="/vision" />
      <PrevButton to="/intro" />

      </Container>
    </PageTransition>
  )
}

export default Rules
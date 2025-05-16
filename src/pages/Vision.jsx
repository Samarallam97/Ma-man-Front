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
  // overflow: hidden;
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
  max-width: 700px;
  
`

const VisionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-3);
  width: 100%;
  margin-bottom: var(--spacing-6);
`

const VisionItem = styled(motion.div)`
  background-color: var(--card-background);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  box-shadow: 0 4px 12px var(--shadow-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    color: var(--primary-color);
    margin-bottom: var(--spacing-2);
    width: 48px;
    height: 48px;
  }
  
  h3 {
    margin-bottom: var(--spacing-2);
    font-size: 1.2rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin: 0;
  }
`
// Icons for vision items
const visionIcons = [
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
    <line x1="6" y1="1" x2="6" y2="4"></line>
    <line x1="10" y1="1" x2="10" y2="4"></line>
    <line x1="14" y1="1" x2="14" y2="4"></line>
  </svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
]

function Vision() {
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
  
  const visionContent = content?.vision[language] || {}
  
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <PageTransition>
      <Container>
        <Title>{visionContent.title || t('vision')}</Title>
        <Description>{visionContent.description}</Description>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%' }}
        >
          <VisionContainer>
            {visionContent.points?.map((point, index) => (
              <VisionItem key={index} 
              variants={itemVariants} 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                {visionIcons[index % visionIcons.length]}
                <h3>Vision {index + 1}</h3>
                <p>{point}</p>
              </VisionItem>
            ))}
          </VisionContainer>
        </motion.div>
        
          <NextButton to="/about" />

          <PrevButton to="/rules" />

      </Container>
    </PageTransition>
  )
}

export default Vision
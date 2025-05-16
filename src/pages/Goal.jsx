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
  max-width: 700px;
`

const GoalsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 16px;

  gap: var(--spacing-3);
  width: 100%;
  margin-bottom: var(--spacing-6);
`

const GoalItem = styled(motion.div)`
  background-color: var(--card-background);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  box-shadow: 0 4px 12px var(--shadow-color);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background-color: var(--primary-color);
  }
  
  h3 {
    margin-bottom: var(--spacing-1);
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    
    svg {
      color: var(--primary-color);
    }
  }
  
  p {
    margin: 0;
    color: var(--text-secondary);
    padding-left: var(--spacing-4);
    
    [dir="rtl"] & {
      padding-left: 0;
      padding-right: var(--spacing-4);
    }
  }
`

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: var(--border-color);
  border-radius: 5px;
  margin-top: var(--spacing-2);
  overflow: hidden;
  
  div {
    height: 100%;
    border-radius: 5px;
    background-color: var(--primary-color);
    width: ${props => props.$progress}%;
    transition: width 1s ease;
  }
`


// Icons for goal items
const goalIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
)

function Goal() {
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
  
  const goalContent = content?.goal[language] || {}
  
  // Mock progress percentages for the goals
  const progressValues = [75, 60, 45, 80, 30]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, x: language === 'ar' ? 50 : -50 },
    visible: { opacity: 1, x: 0 }
  }
  
  return (
    <PageTransition>
      <Container>
        <Title>{goalContent.title || t('goal')}</Title>
        <Description>{goalContent.description}</Description>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%' }}
        >
          <GoalsContainer>
            {goalContent.points?.map((goal, index) => (
              <GoalItem key={index} variants={itemVariants}>
                <h3>
                  {goalIcon}
                  Goal {index + 1}
                </h3>
                <p>{goal}</p>
                <ProgressBar $progress={progressValues[index % progressValues.length]}>
                  <div />
                </ProgressBar>
              </GoalItem>
            ))}
          </GoalsContainer>
        </motion.div>
        
          <NextButton to="/login" />
          <PrevButton to="/about" />
      </Container>
    </PageTransition>
  )
}

export default Goal
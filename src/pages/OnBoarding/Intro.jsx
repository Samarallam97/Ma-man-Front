import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../context/LanguageContext'
// import { useApi } from '../context/ApiContext'
import NextButton from '../../components/common/NextButton'
import PrevButton from '../../components/common/PrevButton'

import PageTransition from '../../components/common/PageTransition'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const WelcomeContainer = styled.div`
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

const WelcomeContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-5);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  box-shadow: 
    0 10px 30px var(--shadow-color),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
`

const Title = styled(motion.h1)`
  color: var(--primary-color);
  margin-bottom: var(--spacing-3);
  font-size: 4rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px var(--shadow-color);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Description = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-4);
  line-height: 1.8;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const ButtonContainer = styled.div`
  margin-top: var(--spacing-4);
`

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--primary-light) 0%,
    var(--primary-color) 100%
  );
  opacity: 0.1;
  z-index: 1;
`

function Intro() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  // const { api } = useApi()
  // const [content, setContent] = useState(null)
  // const [loading, setLoading] = useState(true)
  
  // useEffect(() => {
  //   const fetchContent = async () => {
  //     try {
  //       const data = await api.getContent()
  //       setContent(data)
  //       setLoading(false)
  //     } catch (error) {
  //       console.error('Error fetching content:', error)
  //       setLoading(false)
  //     }
  //   }
    
  //   fetchContent()
  // }, [api])
  
  // if (loading) {
  //   return (
  //     <WelcomeContainer>
  //       <motion.div 
  //         animate={{ rotate: 360 }}
  //         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
  //       >
  //         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //           <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
  //           <path d="M12 2C6.48 2 2 6.48 2 12" />
  //         </svg>
  //       </motion.div>
  //     </WelcomeContainer>
  //   )
  // }
  
  // const welcomeContent = content?.welcome[language] || {}
  
  const shapes = [
    { size: 300, top: '10%', left: '-5%' },
    { size: 200, bottom: '20%', right: '-5%' },
    { size: 150, top: '40%', right: '10%' },
    { size: 250, bottom: '-5%', left: '20%' },
  ]
  
  return (
    <PageTransition>
      <WelcomeContainer>
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        <WelcomeContent>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('intro.title')}
          </Title>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
           {t('intro.description')}
          </Description>
          
        </WelcomeContent>
        <NextButton to="/rules" />
        <PrevButton to="/" />
      </WelcomeContainer>
    </PageTransition>
  )
}

export default Intro
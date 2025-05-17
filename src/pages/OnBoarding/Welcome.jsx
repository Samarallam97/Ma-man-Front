import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../context/LanguageContext'
import NextButton from '../../components/common/NextButton'
import PageTransition from '../../components/common/PageTransition'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import  remove  from '../../assets/Images/remove.png'

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 140px);
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

const ImageContainer = styled.div`
  max-width: 600px;
  width: 90%;
  margin-bottom: var(--spacing-4);
  position: relative;
  z-index: 2;
`

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 20px 30px var(--shadow-color));
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

function Welcome() {
  
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
        
        <ImageContainer>
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ 
              scale: 1,
              opacity: 1,
              y: [0, -15, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <HeroImage 
              src={remove}
              alt="Happy children and parents learning together illustration" 
            />
          </motion.div>
        </ImageContainer>
          <NextButton to="/intro" />
      </WelcomeContainer>
    </PageTransition>
  )
}

export default Welcome
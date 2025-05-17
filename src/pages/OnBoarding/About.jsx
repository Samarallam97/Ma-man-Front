import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext.jsx';
// import { useApi } from '../context/ApiContext';
import NextButton from '../../components/common/NextButton.jsx';
import PrevButton from '../../components/common/PrevButton';
import PageTransition from '../../components/common/PageTransition.jsx';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
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
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: var(--spacing-3);
  text-align: center;
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: var(--spacing-4);
  text-align: left;
  max-width: 1000px;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  color: var(--primary-color);
  margin-top: var(--spacing-4);
  margin-bottom: var(--spacing-2);
  font-size: 1.5rem;
  text-align: left;
  width: 100%;
`;


const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-6);

`;

const TeamCard = styled(motion.div)`
  background-color: var(--card-background);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px var(--shadow-color);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TeamImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const TeamInfo = styled.div`
  padding: var(--spacing-3);
  text-align: center;
`;

const TeamName = styled.h3`
  margin: 0 0 var(--spacing-1) 0;
  font-size: 1.1rem;
  color: var(--primary-color);
`;

const TeamRole = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;



function About() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title>{t('about.title')}</Title>

          <Description variants={itemVariants}>
            {t('about.description')}
          </Description>
          <TeamContainer>
            {t('about.team', { returnObjects: true }).map((member, index) => (
              <TeamCard
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <TeamImage src={member.image} alt={member.name} />
                <TeamInfo>
                  <TeamName>{member.name}</TeamName>
                  <TeamRole>{member.role}</TeamRole>
                </TeamInfo>
              </TeamCard>
            ))}
          </TeamContainer>
        </motion.div>

          <NextButton to="/goal" />
          <PrevButton to="/vision" />
      </Container>
    </PageTransition>
  );
}

export default About;
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: calc(100vh - 140px);
  padding: var(--spacing-4);
  background: linear-gradient(135deg, #e6f3ff 0%, #ffffff 100%);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: var(--spacing-4);
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: var(--spacing-4);
`;

const Opportunities = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
`;

const OpportunityCard = styled(motion.div)`
  background: white;
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-2);
  }
  
  ul {
    text-align: left;
    margin-bottom: var(--spacing-3);
    padding-left: var(--spacing-3);
    
    li {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-1);
    }
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    background: var(--primary-light);
    color: white;
  }
`;

function JoinUs() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <Container>
        <Content>
          <Title>{t('join_us')}</Title>
          <Description>
            Join our open-source community and help make education accessible to everyone
          </Description>

          <Opportunities>
            <OpportunityCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>Frontend Engineers</h3>
              <ul>
                <li>React.js</li>
                <li>UI/UX Design</li>
                <li>Accessibility</li>
              </ul>
              <Button
                href="https://github.com/maman-edu"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project
              </Button>
            </OpportunityCard>

            <OpportunityCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3>Backend Engineers</h3>
              <ul>
                <li>ASP.NET API</li>
                <li>SQL Server</li>
              </ul>
              <Button
                href="https://github.com/maman-edu"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project
              </Button>
            </OpportunityCard>

          <OpportunityCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3>Security Engineers</h3>
              <ul>
                <li>Pen Testing</li>
              </ul>
              <Button
                href="https://github.com/maman-edu"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project
              </Button>
            </OpportunityCard>


          <OpportunityCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3>AI Engineers</h3>
              <ul>
                <li>Data Scientist</li>
                <li>Data Analysis</li>
              </ul>
              <Button
                href="https://github.com/maman-edu"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project
              </Button>
            </OpportunityCard>

            <OpportunityCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Content Creation</h3>
              <ul>
                <li>Educational Content</li>
                <li>Documentation</li>
                <li>Translations</li>
              </ul>
              <Button
                href="https://github.com/maman-edu"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </Button>
            </OpportunityCard>
          </Opportunities>
        </Content>
      </Container>
    </PageTransition>
  );
}

export default JoinUs;
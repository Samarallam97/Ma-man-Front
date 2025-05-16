import { useState } from 'react';
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
  // max-width: 800px;
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

const SupportOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-4);
`;

const SupportCard = styled(motion.div)`
  background: white;
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-2);
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-3);
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

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: var(--spacing-5);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 500px;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const ShareLink = styled.a`
  display: inline-block;
  margin: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CopyButton = styled.button`
  margin-top: 16px;
  padding: 10px 16px;
  width: 100%;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-light);
  }
`;

function SupportUs() {
  const { t } = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);
  const siteUrl = window.location.origin; // Or your specific homepage URL

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <PageTransition>
      <Container>
        <Content>
          <Title>{t('support_us')}</Title>
          <Description>
            Help us make education accessible to every child
          </Description>

          <SupportOptions>
            <SupportCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>Financial Support</h3>
              <p>Your donation helps us develop better educational tools</p>
              <Button
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Donate Now
              </Button>
            </SupportCard>

            <SupportCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3>Spread the Word</h3>
              <p>Share our mission with your network</p>
              <Button
                onClick={() => setShowShareModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Share Now
              </Button>
            </SupportCard>

            <SupportCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Volunteer</h3>
              <p>Join our team of dedicated volunteers</p>
              <Button
                href="/join-us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Us
              </Button>
            </SupportCard>
          </SupportOptions>
        </Content>
      </Container>

      {/* Share Modal */}
      {showShareModal && (
        <ModalOverlay onClick={() => setShowShareModal(false)}>
          <ModalContent
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={() => setShowShareModal(false)}>&times;</CloseButton>
            <h2 className="text-xl font-bold mb-4">Share Our Mission</h2>
            <p className="mb-4">Help us reach more people by sharing our mission:</p>

            {/* Social Sharing Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              <ShareLink
                href={`https://www.facebook.com/sharer/sharer.php?u= ${encodeURIComponent(siteUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#1877F2' }}
              >
                Facebook
              </ShareLink>
              <ShareLink
                href={`https://twitter.com/intent/tweet?url= ${encodeURIComponent(siteUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#1DA1F2' }}
              >
                Twitter
              </ShareLink>
              <ShareLink
                href={`https://api.whatsapp.com/send?text= ${encodeURIComponent(`Check this out: ${siteUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#25D366' }}
              >
                WhatsApp
              </ShareLink>
            </div>

            {/* Copy Link Button */}
            <CopyButton onClick={handleCopyLink}>Copy Link</CopyButton>
          </ModalContent>
        </ModalOverlay>
      )}

    </PageTransition>
  );
}

export default SupportUs;
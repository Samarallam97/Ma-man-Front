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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: var(--spacing-4);
  text-align: center;
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 800px;
  background: white;
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-3);
`;

const Label = styled.label`
  display: block;
  margin-bottom: var(--spacing-1);
  color: var(--text-color);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-2);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: var(--spacing-2);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-2);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: var(--primary-light);
  }
`;

const ContactInfo = styled.div`
  margin-top: var(--spacing-4);
  text-align: center;
  
  h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-2);
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-1);
  }
`;

function ContactUs() {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <PageTransition>
      <Container>
        <Content>
          <Title>{t('contact_us')}</Title>

          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" required />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input type="email" required />
            </FormGroup>

            <FormGroup>
              <Label>Subject</Label>
              <Input type="text" required />
            </FormGroup>

            <FormGroup>
              <Label>Message</Label>
              <TextArea required />
            </FormGroup>

            <Button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              Send Message
            </Button>
          </ContactForm>

          <ContactInfo>
            <h3>Other Ways to Reach Us</h3>
            <p>Email: support@maman.edu</p>
            <p>Phone: +1 234 567 890</p>
          </ContactInfo>
        </Content>
      </Container>
    </PageTransition>
  );
}

export default ContactUs;
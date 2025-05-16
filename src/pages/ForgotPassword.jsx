import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 140px);
  padding: var(--spacing-4);
  background: linear-gradient(135deg, var(--background-color) 0%, var(--card-background) 100%);
`;

const FormContainer = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  padding: var(--spacing-4);
  background: var(--card-background);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px var(--shadow-color);
`;

const Logo = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--spacing-4);
  font-size: 2.5rem;
`;

const Description = styled.p`
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-4);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
`;

const Label = styled.label`
  color: var(--text-color);
  font-weight: 500;
`;

const Input = styled.input`
  padding: var(--spacing-2);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--background-color);
  color: var(--text-color);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;

const Button = styled(motion.button)`
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  border: none;
  
  &:hover {
    background: var(--primary-light);
  }
  
  &:disabled {
    background: var(--border-color);
    cursor: not-allowed;
  }
`;

const BackToLogin = styled.div`
  text-align: center;
  margin-top: var(--spacing-3);
  
  a {
    color: var(--primary-color);
    text-decoration: underline;
    
    &:hover {
      color: var(--primary-light);
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

function ForgotPassword() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Reset password request:', data);
      setSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageTransition>
      <Container>
        <FormContainer>
          <Logo>Ma'man | مأمن</Logo>
          
          <Description>
            {success
              ? t('reset_password_success')
              : t('reset_password_description')}
          </Description>
          
          {!success && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>{t('email')}</Label>
                <Input type="email" {...register('email')} />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </FormGroup>
              
              <Button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? t('sending') : t('send_reset_link')}
              </Button>
            </Form>
          )}
          
          <BackToLogin>
            <a href="/login">{t('back_to_login')}</a>
          </BackToLogin>
        </FormContainer>
      </Container>
    </PageTransition>
  );
}

export default ForgotPassword;
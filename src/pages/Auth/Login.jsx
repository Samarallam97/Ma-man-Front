import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageTransition from '../../components/common/PageTransition';
import remove from '../../assets/Images/remove.png'

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 140px);
  padding: var(--spacing-4);
  background: linear-gradient(135deg, var(--background-color) 0%, var(--card-background) 100%);
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  gap: var(--spacing-4);
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  max-width: 500px;
  padding: var(--spacing-4);
  background: var(--card-background);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px var(--shadow-color);
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const Logo = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--spacing-4);
  font-size: 2.5rem;
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

const Links = styled.div`
  display: flex;
  justify-content: space-between;
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
  password: yup.string().required('Password is required'),
});

function Login() {
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
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
      console.log('Login data:', data);
      // Handle successful login
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageTransition>
      <Container>
        <ContentContainer>
          <FormContainer>
            <Logo>Ma'man | مأمن</Logo>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>{t('login.email')}</Label>
                <Input type="email" {...register('email')} />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label>{t('login.password')}</Label>
                <Input type="password" {...register('password')} />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              </FormGroup>
              
              <Button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? t('login.signing_in') : t('login.sign_in')}
              </Button>
            </Form>
            
            <Links>
              <a href="/forgot-password">{t('login.forgot_password')}</a>
              <a href="/register">{t('login.register')}</a>
            </Links>
          </FormContainer>
          
          <ImageContainer>
            <motion.img
              src={remove}
              alt="Kids studying online"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </ImageContainer>
        </ContentContainer>
      </Container>
    </PageTransition>
  );
}

export default Login;
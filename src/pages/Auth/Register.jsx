import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { differenceInYears, parse } from 'date-fns';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageTransition from '../../components/common/PageTransition';
import remove from '../../assets/Images/remove.png'


const Container = styled.div`
 
  position: relative;
  display: flex;
  min-height: calc(100vh - 140px);
  padding: var(--spacing-4);
  overflow: hidden;
  z-index: 1;
  background: linear-gradient(135deg, var(--background-color) 0%, var(--card-background) 100%);
  `;

const ContentContainer = styled.div`
  display: flex;
  justify-content : center;
  align-items : center;
  flex: 1;
  gap: var(--spacing-4);
  margin: 0 auto;
  
`;

const FormContainer = styled.div`
  flex: 1;
  max-width: 1000px;
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

const Select = styled.select`
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

const LoginLink = styled.div`
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
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  nationalId: yup.string().required('National ID is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  dateOfBirth: yup.string()
    .required('Date of birth is required')
    .test('age', 'Invalid age for selected role', function (value) {
      if (!value) return false;
      
      const age = differenceInYears(
        new Date(),
        parse(value, 'yyyy-MM-dd', new Date())
      );
      
      const role = this.parent.role;
      
      if (role === 'adult') {
        return age >= 14 && age <= 18;
      } else if (role === 'parent') {
        return age >= 18;
      }
      
      return false;
    }),
  role: yup.string()
    .oneOf(['adult', 'parent'], 'Please select a role')
    .required('Role is required')
});

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const role = watch('role');
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Registration data:', data);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
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
                <Label>{t('register.name')}</Label>
                <Input {...register('name')} />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label>{t('register.email')}</Label>
                <Input type="email" {...register('email')} />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </FormGroup>

              
              <FormGroup>
                <Label>{t('register.password')}</Label>
                <Input type="password" {...register('password')} />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label>{t('register.confirm_password')}</Label>
                <Input type="password" {...register('confirmPassword')} />
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label>{t('register.date_of_birth')}</Label>
                <Input type="date" {...register('dateOfBirth')} />
                {errors.dateOfBirth && <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label>{t('register.role')}</Label>
                <Select {...register('role')}>
                  <option value="">{t('register.select_role')}</option>
                  <option value="adult">{t('register.adult')}</option>
                  <option value="parent">{t('register.parent')}</option>
                </Select>
                {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
              </FormGroup>
              
              <Button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? t('register.registering') : t('register.register')}
              </Button>
            </Form>
            
            <LoginLink>
              {t('register.already_have_account')} <a href="/login">{t('register.login')}</a>
            </LoginLink>
          </FormContainer>
        </ContentContainer>
      </Container>
    </PageTransition>
  );
}

export default Register;
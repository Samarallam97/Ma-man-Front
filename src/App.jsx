import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

import './App.css';

// Pages
import Welcome from './pages/Welcome';
import Intro from './pages/Intro.jsx';
import Rules from './pages/Rules';
import Vision from './pages/Vision';
import About from './pages/About';
import Goal from './pages/Goal';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import SupportUs from './pages/SupportUs';
import ContactUs from './pages/ContactUs';
import JoinUs from './pages/JoinUs';
import ModulesPage from './pages/ModulesPage'
import ModuleContentPage from './pages/ModuleContentPage'
import NotFoundPage from './pages/NotFoundPage'

// Layouts
import MainLayout from './layouts/MainLayout'
import Layout from './components/Layout';

function App() {
  const { theme } = useTheme();
  const { language, dir } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [theme, language, dir]);

    useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  return (
    <div className={`app ${theme} ${language}`}>
      
        <Routes location={location} key={location.pathname}>

          <Route element={<MainLayout />}>
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:moduleId" element={<ModuleContentPage />} />
          </Route>
          <Route element={<Layout />}>
              <Route index element={<Welcome />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/about" element={<About />} />
              <Route path="/goal" element={<Goal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/support-us" element={<SupportUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App
import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

import './App.css';

// OnBoarding
import Welcome from './pages/OnBoarding/Welcome.jsx';
import Intro from './pages/OnBoarding/Intro.jsx';
import Rules from './pages/OnBoarding/Rules';
import Vision from './pages/OnBoarding/Vision';
import About from './pages/OnBoarding/About';
import Goal from './pages/OnBoarding/Goal';
import SupportUs from './pages/OnBoarding/SupportUs';
import ContactUs from './pages/OnBoarding/ContactUs';
import JoinUs from './pages/OnBoarding/JoinUs';

// Auth
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Content
import CategoriesPage from './pages/Category/CategoriesPage'
import ModulesPage from './pages/Module/ModulesPage'
import ModuleContentPage from './pages/Module/ModuleContentPage'
import Profile from './pages/User/Profile.jsx'
import Notifications from './pages/User//Notifications'
import Todos from './pages/User/Todos.jsx'
import Diary from './pages/User/Diary'
import NotFoundPage from './pages/NotFoundPage'


// Layouts
import MainLayout from './layouts/MainLayout.jsx'
import Layout from './layouts/Layout.jsx';

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
              <Route path="/modules/:category?" element={<ModulesPage />} />
              <Route path="/modules/:moduleId" element={<ModuleContentPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/diaries" element={<Diary />} />
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
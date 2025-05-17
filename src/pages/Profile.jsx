import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

import useUserStore from '../stores/userStore';

const Profile = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  
  const { user, isLoading, error, fetchUser, updateUser, updatePassword } = useUserStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [message, setMessage] = useState({ text: '', type: '' });
  
  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setFormData({
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    }
  }, [user, fetchUser]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await updateUser(formData);
    
    if (success) {
      setMessage({ text: t('profile.updateSuccess'), type: 'success' });
      setIsEditing(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    const success = await updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
    
    if (success) {
      setMessage({ text: 'Password updated successfully', type: 'success' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center text-error-500">
        <p>{error}</p>
        <button 
          onClick={fetchUser}
          className="mt-4 btn btn-primary"
        >
          {t('common.retry')}
        </button>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className={`text-3xl font-bold mb-8 ${isRtl ? 'text-right' : ''}`}>
          {t('profile.title')}
        </h1>
        
        {/* Status Message */}
        {message.text && (
          <motion.div
            className={`mb-6 p-4 rounded-md ${
              message.type === 'success' ? 'bg-success-500/10 text-success-500' : 'bg-error-500/10 text-error-500'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {message.text}
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Photo Section */}
          <div className="md:col-span-1">
            <div className="card flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-neutral-700 shadow-md">
                <img 
                  src={formData.profilePicture} 
                  alt={formData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {isEditing && (
                <div className="w-full mt-4">
                  <label className={`block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${isRtl ? 'text-right' : ''}`}>
                    {t('profile.changePhoto')}
                  </label>
                  <input
                    type="text"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    placeholder="Photo URL"
                    className="input"
                  />
                </div>
              )}
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 btn btn-outlined w-full"
                >
                  {t('profile.edit')}
                </button>
              )}
            </div>
          </div>
          
          {/* Profile Info Section */}
          <div className="md:col-span-2">
            <div className="card">
              <h2 className={`text-xl font-semibold mb-4 ${isRtl ? 'text-right' : ''}`}>
                {t('profile.personalInfo')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${isRtl ? 'text-right' : ''}`}>
                    {t('profile.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${isRtl ? 'text-right' : ''}`}>
                    {t('profile.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    disabled={!isEditing}
                  />
                </div>
                
                {isEditing && (
                  <div className={`flex gap-3 mt-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <button type="submit" className="btn btn-primary">
                      {t('profile.save')}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          profilePicture: user.profilePicture,
                        });
                      }}
                      className="btn btn-outlined"
                    >
                      {t('profile.cancel')}
                    </button>
                  </div>
                )}
              </form>
              
              {/* Password Change Section */}
              {!isEditing && (
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <h2 className={`text-xl font-semibold mb-4 ${isRtl ? 'text-right' : ''}`}>
                    {t('profile.securityInfo')}
                  </h2>
                  
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${isRtl ? 'text-right' : ''}`}>
                        {t('profile.password')}
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${isRtl ? 'text-right' : ''}`}>
                        {t('profile.newPassword')}
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${isRtl ? 'text-right' : ''}`}>
                        {t('profile.confirmPassword')}
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <button type="submit" className="btn btn-primary">
                        {t('common.save')}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
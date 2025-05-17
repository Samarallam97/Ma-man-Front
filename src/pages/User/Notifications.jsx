import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { IoCheckmarkCircleOutline, IoWarningOutline, IoInformationCircleOutline, IoCloseCircleOutline, IoTrashOutline, IoCheckmarkOutline } from 'react-icons/io5';

import useNotificationStore from '../../stores/notificationStore';

// Notification item component
const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  
  const getIcon = () => {
    switch (notification.type) {
      case 'warning':
        return <IoWarningOutline className="text-warning-500 text-xl" />;
      case 'success':
        return <IoCheckmarkCircleOutline className="text-success-500 text-xl" />;
      case 'error':
        return <IoCloseCircleOutline className="text-error-500 text-xl" />;
      default:
        return <IoInformationCircleOutline className="text-primary-500 text-xl" />;
    }
  };
  
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPp');
  };
  
  return (
    <motion.div 
      className={`notification-item notification-${notification.type} ${!notification.read ? 'notification-unread' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        
        <div className="flex-grow">
          <div className={`${isRtl ? 'text-right' : ''}`}>
            <h3 className="font-medium text-neutral-900 dark:text-white">
              {notification.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-1">
              {notification.message}
            </p>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              {formatDate(notification.date)}
            </div>
          </div>
        </div>
        
        <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          {!notification.read && (
            <button 
              onClick={() => onMarkAsRead(notification.id)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-success-500"
              title={t('notifications.actions.markRead')}
            >
              <IoCheckmarkOutline />
            </button>
          )}
          
          <button 
            onClick={() => onDelete(notification.id)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-error-500"
            title={t('notifications.actions.delete')}
          >
            <IoTrashOutline />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main component
const Notifications = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  
  const { 
    notifications, 
    isLoading, 
    error, 
    fetchNotifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotificationStore();
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  
  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
  };
  
  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };
  
  const handleDelete = async (id) => {
    await deleteNotification(id);
  };
  
  const handleClearAll = async () => {
    if (window.confirm(t('notifications.actions.clear'))) {
      await clearAllNotifications();
    }
  };
  
  if (isLoading && notifications.length === 0) {
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
          onClick={fetchNotifications}
          className="mt-4 btn btn-primary"
        >
          {t('notifications.actions.retry')}
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className={`flex items-center justify-between mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-3xl font-bold">
          {t('notifications.title')}
        </h1>
        
        <div className={`flex gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={handleMarkAllAsRead}
            className="btn btn-outlined text-sm"
            disabled={notifications.filter(n => !n.read).length === 0}
          >
            {t('notifications.markAllRead')}
          </button>
          
          <button 
            onClick={handleClearAll}
            className="btn btn-outlined text-sm text-error-500 border-error-500 hover:bg-error-50"
            disabled={notifications.length === 0}
          >
            {t('notifications.clearAll')}
          </button>
        </div>
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-xl text-neutral-500 dark:text-neutral-400">
            {t('notifications.empty')}
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Notifications;
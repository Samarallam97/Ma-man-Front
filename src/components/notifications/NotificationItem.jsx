import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, AlertTriangle, Info, XCircle, Trash2, Check } from 'lucide-react';

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'warning':
        return <AlertTriangle className="text-amber-500 h-6 w-6" />;
      case 'success':
        return <CheckCircle className="text-emerald-500 h-6 w-6" />;
      case 'error':
        return <XCircle className="text-rose-500 h-6 w-6" />;
      default:
        return <Info className="text-blue-500 h-6 w-6" />;
    }
  };
  
  const getBorderColor = () => {
    switch (notification.type) {
      case 'warning':
        return 'border-l-amber-500';
      case 'success':
        return 'border-l-emerald-500';
      case 'error':
        return 'border-l-rose-500';
      default:
        return 'border-l-blue-500';
    }
  };
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 ${getBorderColor()} 
        mb-4 transform transition-all duration-200 hover:shadow-md ${!notification.read ? 'bg-slate-50' : ''}`}
    >
      <div className="p-4 sm:p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            {getIcon()}
          </div>
          
          <div className="flex-grow min-w-0">
            <h3 className="font-semibold text-slate-900 text-lg">
              {notification.title}
            </h3>
            <p className="text-slate-600 mt-1 text-base">
              {notification.message}
            </p>
            <div className="text-sm text-slate-500 mt-2">
              {format(new Date(notification.date), 'MMM d, yyyy • h:mm a')}
            </div>
          </div>
          
          <div className="flex flex-col gap-2 ml-4">
            {!notification.read && (
              <button 
                onClick={() => onMarkAsRead(notification.id)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-emerald-500"
                title="Mark as read"
              >
                <Check className="h-5 w-5" />
              </button>
            )}
            
            <button 
              onClick={() => onDelete(notification.id)}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-rose-500"
              title="Delete notification"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
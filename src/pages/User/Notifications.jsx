import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, XCircle, Trash2, Check, ChevronDown, Search, Filter } from 'lucide-react';
import NotificationItem from '../../components/notifications/NotificationItem';
import  useNotificationStore from '../../stores/notificationStore.js'; // adjust the path to wherever it's defined

const ITEMS_PER_PAGE = 5;

const Notifications = () => {
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
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'read', 'unread'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Filter and sort notifications
  const filteredNotifications = notifications
    .filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'read' && notification.read) ||
                          (statusFilter === 'unread' && !notification.read);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  if (isLoading && notifications.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary-color)]  border-t-[var(--primary-color)]"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <div className="bg-rose-50 rounded-lg p-6 border border-rose-200">
          <XCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <p className="text-rose-700 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchNotifications}
            className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6">

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  {/* Title */}
  <div className="flex items-center gap-3">
    <Bell className="h-8 w-8 text-[var(--primary-color)]" />
    <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
    <button 
      onClick={markAllAsRead}
      disabled={notifications.filter(n => !n.read).length === 0}
      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[var(--primary-color)] bg-[var(--secondary-color)]
        rounded-lg hover:bg-[var(--secondary-color)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
    >
      <CheckCircle className="h-4 w-4" />
      Mark All Read
    </button>

    <button 
      onClick={() => {
        if (window.confirm('Are you sure you want to clear all notifications?')) {
          clearAllNotifications();
        }
      }}
      disabled={notifications.length === 0}
      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 
        rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
    >
      <Trash2 className="h-4 w-4" />
      Clear All
    </button>
  </div>
</div>


      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
            </select>
          </div>

          <div className="relative">
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>
      
      {paginatedNotifications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
          <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-lg text-slate-600">
            No notifications to display
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === index + 1
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;
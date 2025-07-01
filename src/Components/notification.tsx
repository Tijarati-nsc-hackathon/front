import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../api/api.config';

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  useEffect(() => {
    const sseUrl = baseUrl + '/notifications/sse';
    const eventSource = new EventSource(sseUrl);

    eventSource.addEventListener('Notification', (event: MessageEvent) => {
      try {
        const data = event.data;
        toast.success(data || 'New notification', {
          position: 'top-right',
          autoClose: 5000,
        });
      } catch (error) {
        toast.error('Failed to parse notification', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {children}
    </>
  );
};

export default NotificationProvider;

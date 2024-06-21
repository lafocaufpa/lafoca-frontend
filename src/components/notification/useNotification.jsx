import { useState, useEffect } from 'react';

const useNotification = (initialState = null, timeout = 4000) => {
  const [message, setMessage] = useState(initialState);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [message, timeout]);

  const showMessage = (msg) => setMessage(msg);
  const hideMessage = () => setMessage(null);

  return [message, showMessage, hideMessage];
};

export default useNotification;

import { useEffect } from 'react';
import { notification } from 'antd';

export function useErrorNotification(error, message) {
  useEffect(() => {
    if (error !== null) {
      notification.error({
        message,
        description: error,
      });
    }
  }, [error]);
}

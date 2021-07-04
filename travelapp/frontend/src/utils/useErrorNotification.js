import { useEffect } from 'react';
import { notification } from 'antd';
import { createErrorMessage } from './createErrorMessage';

export function useErrorNotification(error, message) {
  useEffect(() => {
    if (error !== null) {
      notification.error({
        message,
        description: createErrorMessage(error),
      });
    }
  }, [error]);
}

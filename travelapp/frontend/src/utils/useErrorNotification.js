import { useEffect } from 'react';
import { notification } from 'antd';
import { createErrorMessage } from './createErrorMessage';

export function useErrorNotification(error, message) {
  useEffect(() => {
    if (error !== null) {
      notification.error({
        message,
        description:
          typeof error === 'string' ? error : createErrorMessage(error),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
}

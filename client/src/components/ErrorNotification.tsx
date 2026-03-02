import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IconExclamationCircle } from '@tabler/icons-react';

type ErrorNotificationProps = {
  message: string;
};

function ErrorNotification({ message }: ErrorNotificationProps) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <IconExclamationCircle />
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription>Failed to fetch Wikipedia page :(</AlertDescription>
    </Alert>
  );
}

export default ErrorNotification;

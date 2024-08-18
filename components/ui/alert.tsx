import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
  ChatBubbleIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

const Note = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  if (!message) {
    return null;
  }

  return (
    <Alert variant="default" className={cn(className)}>
      <ChatBubbleIcon className="h-4 w-4" />
      <AlertTitle>Notification</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
Note.displayName = 'AlertNote';

const Error = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  if (!message) {
    return null;
  }

  return (
    <Alert variant="destructive" className={cn(className)}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Oups!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
Error.displayName = 'AlertError';

const Success = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  if (!message) {
    return null;
  }

  return (
    <Alert className={cn(className)}>
      <CheckCircledIcon className="h-4 w-4" />
      <AlertTitle>Notification</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
Success.displayName = 'AlertSuccess';

export { Alert, AlertTitle, AlertDescription, Error, Success, Note };

import { InputHTMLAttributes, forwardRef, memo } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground dark:text-foreground-dark dark:border-input-dark dark:bg-background-dark dark:placeholder:text-muted-foreground-dark dark:ring-offset-background-dark dark:focus-visible:ring-ring-dark',
  {
    variants: {
      variant: {
        default: 'border-input dark:border-input-dark',
        error:
          'border-destructive focus-visible:ring-destructive dark:border-destructive-dark dark:focus-visible:ring-destructive-dark',
      },
      size: {
        default: 'h-10',
        sm: 'h-9 px-2',
        lg: 'h-11 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  label?: string;
  helperText?: string;
  variant?: InputVariantProps['variant'];
  size?: InputVariantProps['size'];
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, size, error, type = 'text', label, helperText, id, ...props }, ref) => {
      const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
      const errorId = error ? `${inputId}-error` : undefined;
      const helperId = helperText ? `${inputId}-helper` : undefined;

      return (
        <div className="relative w-full space-y-1">
          {label && (
            <label htmlFor={inputId} className="text-sm font-medium">
              {label}
            </label>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(inputVariants({ variant: error ? 'error' : variant, size, className }))}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={cn(errorId, helperId)}
            {...props}
          />
          {helperText && !error && (
            <p id={helperId} className="text-sm text-muted-foreground">
              {helperText}
            </p>
          )}
          {error && (
            <p id={errorId} className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

Input.displayName = 'Input';

export { Input, inputVariants };

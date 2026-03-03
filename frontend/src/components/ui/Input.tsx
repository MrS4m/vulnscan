import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import './Input.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon, id, ...props }, ref) => {
        // Generate a unique ID if none is provided but a label exists
        const inputId = id || (label ? `input-${Math.random().toString(36).substring(2, 9)}` : undefined);
        const errorId = error ? `${inputId}-error` : undefined;

        return (
            <div className={`input-wrapper ${className}`}>
                {label && (
                    <label htmlFor={inputId} className="input-label">
                        {label}
                    </label>
                )}
                <div className="input-container">
                    {icon && <span className="input-icon">{icon}</span>}
                    <input
                        id={inputId}
                        ref={ref}
                        className={`input-field ${error ? 'input-error' : ''} ${icon ? 'has-icon' : ''}`}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={errorId}
                        {...props}
                    />
                </div>
                {error && (
                    <p id={errorId} className="input-error-message" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

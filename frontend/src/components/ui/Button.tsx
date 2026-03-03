import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className = '',
            variant = 'primary',
            size = 'md',
            isLoading = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseClasses = 'btn-base';
        const variantClasses = `btn-${variant}`;
        const sizeClasses = `btn-${size}`;
        const widthClass = fullWidth ? 'btn-full-width' : '';
        const loadingClass = isLoading ? 'btn-loading' : '';

        const combinedClasses = [
            baseClasses,
            variantClasses,
            sizeClasses,
            widthClass,
            loadingClass,
            className,
        ].filter(Boolean).join(' ');

        return (
            <button
                ref={ref}
                className={combinedClasses}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <span className="btn-spinner" aria-hidden="true">
                        {/* Simple CSS spinner icon */}
                    </span>
                )}

                {!isLoading && leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
                <span className="btn-text">{children}</span>
                {!isLoading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';

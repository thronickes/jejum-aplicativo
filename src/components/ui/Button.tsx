import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
    selected?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = true,
    selected = false,
    className = '',
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const widthClass = fullWidth ? 'btn-full' : '';
    const selectedClass = selected ? 'selected' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${widthClass} ${selectedClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}

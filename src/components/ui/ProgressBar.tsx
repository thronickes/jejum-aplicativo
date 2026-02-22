import React from 'react';

interface ProgressBarProps {
    progress: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div style={{ padding: '0.5rem 0 1.5rem 0', width: '100%' }}>
            <div style={{ height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                    height: '100%',
                    backgroundColor: 'var(--primary)',
                    width: `${progress}%`,
                    transition: 'width 0.3s ease-out'
                }} />
            </div>
        </div>
    );
}

import React from 'react';
import { Home, Utensils, Activity, LineChart, GraduationCap, PlaySquare } from 'lucide-react';

interface BottomNavProps {
    activeTab: number;
    setActiveTab: (index: number) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 0, label: 'Meu Dia', icon: <Home size={24} /> },
        { id: 1, label: 'Alimentar', icon: <Utensils size={24} /> },
        { id: 2, label: 'Fitness', icon: <Activity size={24} /> },
        { id: 3, label: 'Progresso', icon: <LineChart size={24} /> },
        { id: 4, label: 'Crescer', icon: <GraduationCap size={24} /> },
        { id: 5, label: 'Gelatina', icon: <PlaySquare size={24} /> },
    ];

    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            backgroundColor: 'var(--surface-color)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            zIndex: 50,
        }}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            flex: 1,
                            height: '100%',
                            transition: 'color 0.2s',
                        }}
                    >
                        {React.cloneElement(tab.icon as React.ReactElement, {
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)'
                        } as any)}
                        <span style={{ fontSize: '0.65rem', fontWeight: isActive ? '600' : '500' }}>
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

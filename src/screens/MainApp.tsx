import React, { useState } from 'react';
import { BottomNav } from '../components/ui/BottomNav';
import { HomeTab } from './tabs/HomeTab';
import { DietTab } from './tabs/DietTab';
import { FitnessTab } from './tabs/FitnessTab';
import { ProgressTab } from './tabs/ProgressTab';
import { LearnTab } from './tabs/LearnTab';
import { GelatinaTab } from './tabs/GelatinaTab';

export const MainApp: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const renderTab = () => {
        switch (activeTab) {
            case 0: return <HomeTab />;
            case 1: return <DietTab />;
            case 2: return <FitnessTab />;
            case 3: return <ProgressTab />;
            case 4: return <LearnTab />;
            case 5: return <GelatinaTab />;
            default: return <HomeTab />;
        }
    };

    return (
        <div className="screen-container" style={{ padding: 0 }}>
            {/* Tab Content Area: Takes remaining space minus nav height */}
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '70px', backgroundColor: 'var(--bg-color)' }}>
                {renderTab()}
            </div>

            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

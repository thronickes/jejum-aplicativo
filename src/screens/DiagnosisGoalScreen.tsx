import React from 'react';
import { useAppStore, type Goal } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Flame, Brain, ShieldPlus, Target } from 'lucide-react';

export const DiagnosisGoalScreen: React.FC = () => {
    const { goal, setGoal, nextStep } = useAppStore();

    const options: { id: Goal; label: string; icon: React.ReactNode }[] = [
        { id: 'weight_loss', label: 'Perder Peso', icon: <Flame color="var(--primary)" /> },
        { id: 'mental_clarity', label: 'Clareza Mental e Foco', icon: <Brain color="var(--primary)" /> },
        { id: 'health_longevity', label: 'Saúde e Longevidade', icon: <ShieldPlus color="var(--primary)" /> },
        { id: 'binge_control', label: 'Controlo de Compulsão Alimentar', icon: <Target color="var(--primary)" /> },
    ];

    const handleSelect = (id: Goal) => {
        setGoal(id);
        // User asked to auto-advance or show a continue button. Let's auto advance after a short delay for better UX.
        setTimeout(() => {
            nextStep();
        }, 300);
    };

    return (
        <div className="screen-container">
            <ProgressBar progress={20} />

            <div className="screen-content">
                <h2 className="title">Qual é o seu objetivo principal?</h2>
                <p className="subtitle">Personalizaremos a sua experiência com base na sua meta.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {options.map((option) => (
                        <Button
                            key={option.id}
                            variant={goal === option.id ? 'primary' : 'secondary'}
                            selected={goal === option.id}
                            onClick={() => handleSelect(option.id)}
                            style={{ justifyContent: 'flex-start', padding: '1.25rem', gap: '1rem' }}
                        >
                            {option.icon}
                            <span style={{ color: goal === option.id ? 'white' : 'var(--text-color)' }}>
                                {option.label}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>

            <div className="screen-footer">
                <Button disabled={!goal} onClick={nextStep}>Continuar</Button>
            </div>
        </div>
    );
};

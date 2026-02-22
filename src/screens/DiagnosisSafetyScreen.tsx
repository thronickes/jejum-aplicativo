import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AlertTriangle } from 'lucide-react';

export const DiagnosisSafetyScreen: React.FC = () => {
    const { setSafetyCheckPassed, nextStep } = useAppStore();

    const [conditions, setConditions] = useState({
        pregnant: false,
        underage: false,
        disorders: false,
        diabetes: false,
        none: false,
    });

    const hasConditions = conditions.pregnant || conditions.underage || conditions.disorders || conditions.diabetes;

    const handleToggle = (key: keyof typeof conditions) => {
        if (key === 'none') {
            setConditions({ pregnant: false, underage: false, disorders: false, diabetes: false, none: !conditions.none });
        } else {
            setConditions({ ...conditions, [key]: !conditions[key], none: false });
        }
    };

    const handleContinue = () => {
        setSafetyCheckPassed(conditions.none);
        nextStep();
    };

    const checkboxStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        marginBottom: '0.75rem',
        cursor: 'pointer',
        backgroundColor: 'var(--surface-color)',
        transition: 'border-color 0.2s'
    };

    return (
        <div className="screen-container">
            <ProgressBar progress={80} />

            <div className="screen-content">
                <h2 className="title">A sua saúde é a nossa prioridade</h2>
                <p className="subtitle">O jejum não é para todos. Alguma destas condições aplica-se a si?</p>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { id: 'pregnant', label: 'Gestante ou amamentando' },
                        { id: 'underage', label: 'Menor de 18 anos' },
                        { id: 'disorders', label: 'Histórico de distúrbios alimentares (anorexia, bulimia)' },
                        { id: 'diabetes', label: 'Diabetes Tipo 1' },
                    ].map((item) => (
                        <label key={item.id} style={{ ...checkboxStyle, borderColor: conditions[item.id as keyof typeof conditions] ? 'var(--primary)' : 'var(--border-color)' }}>
                            <input
                                type="checkbox"
                                checked={conditions[item.id as keyof typeof conditions]}
                                onChange={() => handleToggle(item.id as keyof typeof conditions)}
                                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
                            />
                            <span>{item.label}</span>
                        </label>
                    ))}

                    <label style={{ ...checkboxStyle, borderColor: conditions.none ? 'var(--primary)' : 'var(--border-color)' }}>
                        <input
                            type="checkbox"
                            checked={conditions.none}
                            onChange={() => handleToggle('none')}
                            style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
                        />
                        <span style={{ fontWeight: 'bold' }}>Nenhuma das anteriores</span>
                    </label>
                </div>

                {hasConditions && (
                    <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#FEF2F2', border: '1px solid #F87171', borderRadius: '12px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <AlertTriangle color="#DC2626" size={24} style={{ flexShrink: 0 }} />
                        <p style={{ color: '#991B1B', fontSize: '0.875rem', lineHeight: 1.4 }}>
                            Recomendamos fortemente que consulte um médico antes de iniciar qualquer protocolo de jejum.
                        </p>
                    </div>
                )}
            </div>

            <div className="screen-footer">
                <Button
                    disabled={!hasConditions && !conditions.none}
                    onClick={handleContinue}
                    style={{
                        backgroundColor: hasConditions ? 'var(--border-color)' : 'var(--primary)',
                        color: hasConditions ? 'var(--text-color)' : 'white'
                    }}
                >
                    {hasConditions ? 'Continuar mesmo assim' : 'Continuar'}
                </Button>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const DiagnosisAgeScreen: React.FC = () => {
    const { age, setAge, nextStep, prevStep } = useAppStore();
    const [ageInput, setAgeInput] = useState(age ? age.toString() : '');

    const handleContinue = () => {
        const a = parseInt(ageInput, 10);
        if (!isNaN(a) && a >= 18 && a <= 120) {
            setAge(a);
            nextStep();
        } else {
            alert('Por favor, informe uma idade válida (entre 18 e 120 anos).');
        }
    };

    return (
        <div className="screen-container">
            {/* ProgressBar around 45% now */}
            <ProgressBar progress={45} />

            <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <header>
                    <h2 className="title">Qual é a sua idade?</h2>
                    <p className="subtitle">Isso ajuda a personalizar o protocolo de acordo com o seu metabolismo basal.</p>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={ageInput}
                            onChange={(e) => setAgeInput(e.target.value)}
                            placeholder="00"
                            style={{
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                color: 'var(--text-color)',
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                width: '100px',
                                textAlign: 'center',
                                borderBottom: '2px solid var(--primary)'
                            }}
                        />
                        <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 'bold' }}>anos</span>
                    </div>
                </div>
            </div>

            <div className="screen-footer" style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="secondary" onClick={prevStep} style={{ width: 'auto' }}>Voltar</Button>
                <Button disabled={!ageInput} onClick={handleContinue}>Continuar</Button>
            </div>
        </div>
    );
};

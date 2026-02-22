import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const DiagnosisWeightScreen: React.FC = () => {
    const { initialWeight, setInitialWeight, nextStep, prevStep } = useAppStore();
    const [weightInput, setWeightInput] = useState(initialWeight ? initialWeight.toString() : '');

    const handleContinue = () => {
        const w = parseFloat(weightInput.replace(',', '.'));
        if (!isNaN(w) && w > 20 && w < 300) {
            setInitialWeight(w);
            nextStep();
        } else {
            alert('Por favor, informe um peso válido.');
        }
    };

    return (
        <div className="screen-container">
            {/* ProgressBar around 35% */}
            <ProgressBar progress={35} />

            <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <header>
                    <h2 className="title">Qual é o seu peso atual?</h2>
                    <p className="subtitle">Isso nos ajudará a traçar a evolução do seu progresso ao longo do tempo.</p>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={weightInput}
                            onChange={(e) => setWeightInput(e.target.value)}
                            placeholder="00.0"
                            style={{
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                color: 'var(--text-color)',
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                width: '120px',
                                textAlign: 'center',
                                borderBottom: '2px solid var(--primary)'
                            }}
                        />
                        <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 'bold' }}>kg</span>
                    </div>
                </div>
            </div>

            <div className="screen-footer" style={{ display: 'flex', gap: '1rem' }}>
                <Button variant="secondary" onClick={prevStep} style={{ width: 'auto' }}>Voltar</Button>
                <Button disabled={!weightInput} onClick={handleContinue}>Continuar</Button>
            </div>
        </div>
    );
};

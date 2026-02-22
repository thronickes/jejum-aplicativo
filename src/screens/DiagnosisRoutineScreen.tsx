import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const DiagnosisRoutineScreen: React.FC = () => {
    const { lastMealTime, setLastMealTime, nextStep } = useAppStore();

    return (
        <div className="screen-container">
            <ProgressBar progress={60} />

            <div className="screen-content">
                <h2 className="title">A que horas costuma fazer a sua última refeição?</h2>
                <p className="subtitle">Precisamos de saber quando a sua janela de alimentação costuma fechar (ex: jantar).</p>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}>
                    <input
                        type="time"
                        value={lastMealTime}
                        onChange={(e) => setLastMealTime(e.target.value)}
                        style={{
                            padding: '1.5rem',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            border: '2px solid var(--primary)',
                            borderRadius: 'var(--radius)',
                            color: 'var(--primary-dark)',
                            backgroundColor: 'var(--surface-color)',
                            outline: 'none',
                            fontFamily: 'var(--font-sans)',
                            boxShadow: '0 4px 6px -1px rgb(236 72 153 / 0.2)',
                        }}
                    />
                </div>
            </div>

            <div className="screen-footer">
                <Button onClick={nextStep}>Confirmar Horário</Button>
            </div>
        </div>
    );
};

import React from 'react';
import { useAppStore, type Protocol } from '../store/useAppStore';
import { ProgressBar } from '../components/ui/ProgressBar';

export const ProtocolChoiceScreen: React.FC = () => {
    const { setProtocol, nextStep } = useAppStore();

    const handleSelect = (id: Protocol) => {
        setProtocol(id);
        // Move to Dashboard (Step 7)
        nextStep();
    };

    const protocols: { id: Protocol; title: string; subtitle: string; level: string; desc: string; isPopular?: boolean }[] = [
        {
            id: '12:12',
            title: '12:12 - Ritmo Circadiano',
            subtitle: '12h de jejum e 12h para comer',
            level: 'Iniciante',
            desc: 'Ideal para começar e melhorar o sono.',
        },
        {
            id: '14:10',
            title: '14:10 - Equilíbrio',
            subtitle: '14h de jejum e 10h de janela',
            level: 'Intermediário',
            desc: 'Acelera a queima de gordura.',
        },
        {
            id: '16:8',
            title: '16:8 - Padrão Ouro',
            subtitle: '16h de jejum e 8h de janela',
            level: 'Avançado',
            desc: 'O mais popular para perda de peso real.',
            isPopular: true,
        },
        {
            id: '20:4',
            title: '20:4 - Warrior Diet',
            subtitle: '20h de jejum',
            level: 'Desafiador',
            desc: 'Para quem procura um reset metabólico profundo.',
        }
    ];

    return (
        <div className="screen-container">
            <ProgressBar progress={100} />

            <div className="screen-content" style={{ paddingBottom: '2rem' }}>
                <h2 className="title">Escolha o seu Protocolo de Jejum</h2>
                <p className="subtitle">Com base no seu perfil, aqui estão as melhores opções. Qual se adapta melhor ao seu estilo de vida?</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {protocols.map((protocol) => (
                        <div
                            key={protocol.id}
                            onClick={() => handleSelect(protocol.id)}
                            style={{
                                position: 'relative',
                                border: `2px solid ${protocol.isPopular ? 'var(--primary)' : 'var(--border-color)'}`,
                                borderRadius: '16px',
                                padding: '1.25rem',
                                cursor: 'pointer',
                                backgroundColor: 'var(--surface-color)',
                                transition: 'all 0.2s',
                                boxShadow: protocol.isPopular ? '0 4px 12px -2px rgb(236 72 153 / 0.15)' : 'none'
                            }}
                        >
                            {protocol.isPopular && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    right: '16px',
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)'
                                }}>
                                    Mais Escolhido
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{protocol.title}</h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    backgroundColor: protocol.isPopular ? '#fce7f3' : 'var(--bg-color)',
                                    color: protocol.isPopular ? 'var(--primary-dark)' : 'var(--text-muted)',
                                    padding: '4px 8px',
                                    borderRadius: '6px'
                                }}>
                                    {protocol.level}
                                </span>
                            </div>

                            <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{protocol.subtitle}</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{protocol.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

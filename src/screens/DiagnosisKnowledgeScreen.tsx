import React from 'react';
import { useAppStore, type KnowledgeLevel } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Book, GraduationCap, Microscope } from 'lucide-react';

export const DiagnosisKnowledgeScreen: React.FC = () => {
    const { knowledgeLevel, setKnowledgeLevel, nextStep } = useAppStore();

    const options: { id: KnowledgeLevel; label: string; icon: React.ReactNode }[] = [
        { id: 'beginner', label: 'Não sei nada, sou iniciante.', icon: <Book color="var(--primary)" /> },
        { id: 'basic', label: 'Conheço o básico (janelas de alimentação).', icon: <GraduationCap color="var(--primary)" /> },
        { id: 'advanced', label: 'Já pratico e entendo os benefícios biológicos.', icon: <Microscope color="var(--primary)" /> },
    ];

    const handleSelect = (id: KnowledgeLevel) => {
        setKnowledgeLevel(id);
        setTimeout(() => {
            nextStep();
        }, 300);
    };

    return (
        <div className="screen-container">
            <ProgressBar progress={40} />

            <div className="screen-content">
                <h2 className="title">O quanto já sabe sobre Jejum Intermitente?</h2>
                <p className="subtitle">Isto ajuda-nos a definir o nível das nossas dicas e conteúdos.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {options.map((option) => (
                        <Button
                            key={option.id}
                            variant={knowledgeLevel === option.id ? 'primary' : 'secondary'}
                            selected={knowledgeLevel === option.id}
                            onClick={() => handleSelect(option.id)}
                            style={{ justifyContent: 'flex-start', padding: '1.25rem', gap: '1rem', textAlign: 'left' }}
                        >
                            {React.cloneElement(option.icon as React.ReactElement, { color: knowledgeLevel === option.id ? 'white' : 'var(--primary)' } as any)}
                            <span style={{ color: knowledgeLevel === option.id ? 'white' : 'var(--text-color)', lineHeight: 1.4 }}>
                                {option.label}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>

            <div className="screen-footer">
                <Button disabled={!knowledgeLevel} onClick={nextStep}>Continuar</Button>
            </div>
        </div>
    );
};

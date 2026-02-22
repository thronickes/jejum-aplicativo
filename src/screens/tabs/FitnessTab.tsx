import React, { useState } from 'react';
import { Activity, Zap, Flame, PlayCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const FitnessTab: React.FC = () => {
    const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

    const hiitVideos = [
        { id: 1, title: 'HIIT Queima Intensa (15min)', thumb: 'https://img.youtube.com/vi/scTUovcfajA/maxresdefault.jpg', ytId: 'scTUovcfajA' },
        { id: 2, title: 'HIIT Sem Impacto (20min)', thumb: 'https://img.youtube.com/vi/NelOh2hvoZo/maxresdefault.jpg', ytId: 'NelOh2hvoZo' },
        { id: 3, title: 'HIIT Corpo Inteiro (10min)', thumb: 'https://img.youtube.com/vi/ImvFAvSqaLc/maxresdefault.jpg', ytId: 'ImvFAvSqaLc' },
    ];

    const workouts = [
        { id: 1, title: 'Treino HIIT (Queima Rápida)', time: '10-20 min', level: 'Intenso', color: '#FEF2F2', borderColor: '#FCA5A5', icon: <Flame color="#EF4444" /> },
        { id: 2, title: 'Yoga Matinal', time: '20 min', level: 'Leve', color: '#F0FDF4', borderColor: '#86EFAC', icon: <Activity color="#22C55E" /> },
    ];

    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    return (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '80px', position: 'relative' }}>
            <header>
                <h1 className="title">Atividade Diária</h1>
                <p className="subtitle">Movimente-se para acelerar os resultados.</p>
            </header>


            {/* Tip of the Day */}
            <section>
                <div style={{
                    backgroundColor: '#FFFBEB', // amber-50
                    border: '1px solid #FCD34D', // amber-300
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                }}>
                    <div style={{ backgroundColor: '#F59E0B', padding: '8px', borderRadius: '12px' }}>
                        <Zap color="white" size={20} />
                    </div>
                    <div>
                        <h3 style={{ fontWeight: 'bold', color: '#B45309', marginBottom: '4px' }}>Dica do Dia</h3>
                        <p style={{ fontSize: '0.875rem', color: '#92400E', lineHeight: '1.4' }}>
                            Treinar durante o jejum (especialmente aeróbico leve a moderado) obriga o corpo a usar a gordura armazenada como fonte de energia principal.
                        </p>
                    </div>
                </div>
            </section>

            {/* Workouts */}
            <section>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Treinos Rápidos</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {workouts.map(workout => (
                        <div key={workout.id}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1rem',
                                borderRadius: '16px',
                                backgroundColor: workout.color,
                                border: `1px solid ${workout.borderColor}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: selectedWorkout === workout.id ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none'
                            }} onClick={() => { setSelectedWorkout(selectedWorkout === workout.id ? null : workout.id); setActiveVideo(null); }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '12px', boxShadow: '0 2px 4px rgb(0 0 0 / 0.05)' }}>
                                        {workout.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '2px' }}>{workout.title}</h3>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{workout.level} • {workout.time}</p>
                                    </div>
                                </div>
                                <Button
                                    style={{ padding: '0.5rem 1rem', width: 'auto', borderRadius: '20px', fontSize: '0.875rem', backgroundColor: selectedWorkout === workout.id ? 'var(--text-color)' : 'var(--primary)' }}
                                    onClick={(e) => { e.stopPropagation(); setSelectedWorkout(selectedWorkout === workout.id ? null : workout.id); setActiveVideo(null); }}
                                >
                                    {selectedWorkout === workout.id ? 'Fechar' : 'Iniciar'}
                                </Button>
                            </div>

                            {/* Dropdown / Horizontal Scroll Menu (Apenas para o HIIT) */}
                            {selectedWorkout === workout.id && workout.id === 1 && (
                                <div style={{
                                    marginTop: '1rem',
                                    paddingLeft: '0.5rem',
                                    animation: 'fadeInDown 0.3s ease-out'
                                }}>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <PlayCircle size={16} color="var(--primary)" />
                                        Escolha uma aula (Deslize):
                                    </h3>

                                    <div style={{ display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '12px', scrollbarWidth: 'none' }}>
                                        {hiitVideos.map(video => (
                                            <div
                                                key={video.id}
                                                onClick={() => setActiveVideo(video.ytId)}
                                                style={{
                                                    minWidth: '260px',
                                                    backgroundColor: 'var(--surface-color)',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    border: '1px solid var(--border-color)',
                                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {activeVideo === video.ytId ? (
                                                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                                                        <iframe
                                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                                            src={`https://www.youtube.com/embed/${video.ytId}?autoplay=1`}
                                                            title={video.title}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                ) : (
                                                    <div style={{ position: 'relative', width: '100%', height: '140px', backgroundImage: `url(${video.thumb})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <PlayCircle size={28} color="#EF4444" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {activeVideo !== video.ytId && (
                                                    <div style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', lineHeight: '1.2' }}>{video.title}</h4>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

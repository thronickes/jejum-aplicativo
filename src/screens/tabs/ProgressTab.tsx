import React, { useState } from 'react';
import { Target, Trophy, Clock, History, Award, Plus } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ProgressTab: React.FC = () => {
    const { initialWeight, weightHistory, addWeightRecord, completedFasts } = useAppStore();
    const [showWeightModal, setShowWeightModal] = useState(false);
    const [newWeight, setNewWeight] = useState('');

    const handleAddWeight = () => {
        const w = parseFloat(newWeight.replace(',', '.'));
        if (!isNaN(w) && w > 20 && w < 300) {
            addWeightRecord(w);
            setShowWeightModal(false);
            setNewWeight('');
        } else {
            alert('Por favor, insira um peso válido.');
        }
    };

    // Chart logic
    const history = weightHistory && weightHistory.length > 0
        ? weightHistory
        : initialWeight ? [{ date: new Date().toISOString(), weight: initialWeight }] : [];

    // Mocks if the array is too small or missing to show a nice graph by default
    const displayHistory = history.length > 0 ? history : [
        { date: '1', weight: 80 },
        { date: '2', weight: 79 },
        { date: '3', weight: 77.5 }
    ];

    const currentWeight = displayHistory[displayHistory.length - 1]?.weight || 0;
    const startWeight = displayHistory[0]?.weight || 0;

    // Using simple format + sign if gained, - if lost
    const diff = currentWeight - startWeight;
    const diffStr = diff > 0 ? `+${diff.toFixed(1)} kg` : `${diff.toFixed(1)} kg`;
    const diffColor = diff > 0 ? '#EF4444' : 'var(--primary)'; // red if gained, primary (pink) if lost
    const diffBg = diff > 0 ? '#FEE2E2' : '#FCE7F3';

    // SVG coordinates
    const weights = displayHistory.map(h => h.weight);
    const maxW = Math.max(...weights) + 2;
    const minW = Math.min(...weights) - 2;
    const range = maxW - minW || 1;

    const width = 300;
    const topY = 20;
    const bottomY = 80;
    const heightRange = bottomY - topY;

    const points = displayHistory.map((entry, i) => {
        const x = displayHistory.length === 1 ? width / 2 : (i / (displayHistory.length - 1)) * width;
        const normalizedY = (entry.weight - minW) / range;
        const y = bottomY - (normalizedY * heightRange);
        return { x, y, weight: entry.weight };
    });

    const pathD = points.length === 1
        ? `M 0 ${points[0].y} L ${width} ${points[0].y}`
        : `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;

    // Fasting Dynamic Stats
    const totalHours = completedFasts.reduce((sum, fast) => sum + fast.durationHours, 0);
    const avgHours = completedFasts.length > 0 ? (totalHours / completedFasts.length).toFixed(1) : '0';
    const maxHours = completedFasts.length > 0 ? Math.max(...completedFasts.map(f => f.durationHours)) : 0;

    // Badges Unlocks
    const firstStepUnlocked = completedFasts.length >= 1;
    const sevenDaysUnlocked = completedFasts.length >= 7;
    const twentyFourHUnlocked = maxHours >= 24;

    return (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '80px' }}>
            <header>
                <h1 className="title">O Seu Progresso</h1>
                <p className="subtitle">Pequenos passos, grandes resultados.</p>
            </header>

            {/* Weight Chart */}
            <section style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target color="var(--primary)" size={20} />
                        <h2 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Evolução de Peso</h2>
                    </div>
                    {diff !== 0 && (
                        <span style={{ fontSize: '0.75rem', color: diffColor, fontWeight: 'bold', backgroundColor: diffBg, padding: '4px 8px', borderRadius: '12px' }}>
                            {diffStr}
                        </span>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{currentWeight} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>kg</span></span>
                    <button
                        onClick={() => setShowWeightModal(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        <Plus size={14} /> Atualizar
                    </button>
                </div>

                {/* SVG Line Chart */}
                <div style={{ width: '100%', height: '140px', position: 'relative', marginTop: '1rem' }}>
                    <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="50" x2="300" y2="50" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="80" x2="300" y2="80" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4" />

                        {/* Trend Line */}
                        <path
                            d={pathD}
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Data points */}
                        {points.map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? "6" : "4"} fill={i === points.length - 1 ? "var(--primary)" : "white"} stroke="var(--primary)" strokeWidth="2" />
                        ))}
                    </svg>
                </div>
            </section>

            {/* Fasting Stats Grid */}
            <section>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Estatísticas de Jejum</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

                    <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>Total Acumulado</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalHours.toFixed(1)} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>horas</span></p>
                        </div>
                        <div style={{ backgroundColor: '#F3F4F6', padding: '12px', borderRadius: '50%' }}>
                            <History color="var(--text-color)" size={24} />
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>Média Diária</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{avgHours} <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>h</span></p>
                    </div>

                    <div style={{ backgroundColor: 'var(--surface-color)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>Jejum Mais Longo</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{maxHours.toFixed(1)} <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>h</span></p>
                    </div>

                </div>
            </section>

            {/* Achievements / Badges */}
            <section>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Conquistas</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>

                    {/* Primeiro Passo */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: firstStepUnlocked ? 1 : 0.5 }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: firstStepUnlocked ? '#FEF08A' : '#E5E7EB', border: firstStepUnlocked ? '2px solid #EAB308' : '2px dashed #9CA3AF', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: firstStepUnlocked ? '0 4px 6px rgb(234 179 8 / 0.2)' : 'none' }}>
                            <Trophy color={firstStepUnlocked ? '#A16207' : '#6B7280'} size={32} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', color: firstStepUnlocked ? 'var(--text-color)' : 'var(--text-muted)' }}>Primeiro Passo</span>
                    </div>

                    {/* 7 Dias Seguidos */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: sevenDaysUnlocked ? 1 : 0.5 }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: sevenDaysUnlocked ? '#BFDBFE' : '#E5E7EB', border: sevenDaysUnlocked ? '2px solid #3B82F6' : '2px dashed #9CA3AF', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: sevenDaysUnlocked ? '0 4px 6px rgb(59 130 246 / 0.2)' : 'none' }}>
                            <Award color={sevenDaysUnlocked ? '#1D4ED8' : '#6B7280'} size={32} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', color: sevenDaysUnlocked ? 'var(--text-color)' : 'var(--text-muted)' }}>7 Dias</span>
                    </div>

                    {/* Jejum de 24h */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: twentyFourHUnlocked ? 1 : 0.5 }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: twentyFourHUnlocked ? '#FBCFE8' : '#E5E7EB', border: twentyFourHUnlocked ? '2px solid #EC4899' : '2px dashed #9CA3AF', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: twentyFourHUnlocked ? '0 4px 6px rgb(236 72 153 / 0.2)' : 'none' }}>
                            <Clock color={twentyFourHUnlocked ? '#BE185D' : '#6B7280'} size={32} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', color: twentyFourHUnlocked ? 'var(--text-color)' : 'var(--text-muted)' }}>Jejum de 24h</span>
                    </div>

                </div>
            </section>

            {/* Modal de Peso */}
            {showWeightModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 200,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1.5rem'
                }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' }}>Registar Peso Atual</h2>

                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px' }}>
                            <input
                                type="number"
                                inputMode="decimal"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
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

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                onClick={() => setShowWeightModal(false)}
                                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'transparent', fontWeight: 'bold', color: 'var(--text-color)', cursor: 'pointer' }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddWeight}
                                disabled={!newWeight}
                                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 'bold', cursor: 'pointer', opacity: !newWeight ? 0.5 : 1 }}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

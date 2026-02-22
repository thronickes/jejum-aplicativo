import React, { useEffect, useState } from 'react';
import { useAppStore, type Protocol } from '../../store/useAppStore';
import { Button } from '../../components/ui/Button';
import { Droplet, Smile, Edit3, CheckCircle2, Settings } from 'lucide-react';
import { SettingsScreen } from '../SettingsScreen';

export const HomeTab: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);
    const {
        user,
        isFasting,
        fastStartTime,
        fastDurationHours,
        waterCount,
        incrementWater,
        decrementWater,
        toggleFasting,
        protocol,
        setProtocol
    } = useAppStore();

    const { name } = useAppStore();

    const [timeDisplay, setTimeDisplay] = useState(() => {
        if (!isFasting || !fastStartTime) return `${fastDurationHours.toString().padStart(2, '0')}:00:00`;
        const start = new Date(fastStartTime).getTime();
        const diff = new Date().getTime() - start;
        const goalMs = fastDurationHours * 60 * 60 * 1000;
        let remaining = goalMs - diff;
        if (remaining < 0) remaining = 0;
        const h = Math.floor(remaining / (1000 * 60 * 60));
        const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((remaining % (1000 * 60)) / 1000);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    });

    const [progressPercent, setProgressPercent] = useState(() => {
        if (!isFasting || !fastStartTime) return 0;
        const start = new Date(fastStartTime).getTime();
        const diff = new Date().getTime() - start;
        const goalMs = fastDurationHours * 60 * 60 * 1000;
        let pct = (diff / goalMs) * 100;
        return pct > 100 ? 100 : pct;
    });

    const [mood, setMood] = useState<string | null>(null);
    const [showMoodPicker, setShowMoodPicker] = useState(false);
    const moodOptions = ['Feliz', 'Tranquilo', 'Cansado', 'Estressado', 'Focado'];

    // Protocol Modal State
    const [showProtocolModal, setShowProtocolModal] = useState(false);
    const protocolOptions: Protocol[] = ['12:12', '14:10', '16:8', '20:4'];

    // Dynamic Username
    const userName = name || user?.email?.split('@')[0] || 'Visitante';

    useEffect(() => {
        let interval: number;

        if (isFasting && fastStartTime) {
            interval = window.setInterval(() => {
                const start = new Date(fastStartTime).getTime();
                const now = new Date().getTime();
                const diff = now - start; // milliseconds elapsed

                const goalMs = fastDurationHours * 60 * 60 * 1000;

                let remaining = goalMs - diff;
                if (remaining < 0) remaining = 0; // Or allow it to count up as overtime

                // Calculate hours, mins, secs
                const h = Math.floor(remaining / (1000 * 60 * 60));
                const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((remaining % (1000 * 60)) / 1000);

                setTimeDisplay(
                    `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
                );

                let pct = (diff / goalMs) * 100;
                if (pct > 100) pct = 100;
                setProgressPercent(pct);

            }, 1000);
        } else {
            // If not fasting
            setProgressPercent(0);
            setTimeDisplay(`${fastDurationHours.toString().padStart(2, '0')}:00:00`);
        }

        return () => clearInterval(interval);
    }, [isFasting, fastStartTime, fastDurationHours]);

    // SVG Circle Parameters
    const circleRadius = 120;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

    return (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* 1. Header & Streak */}
            <header>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Bom dia, {userName}!</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Pronta para mais um dia?</p>

                {/* Streak Calendar Dynamic */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    {Array.from({ length: 7 }).map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (6 - i)); // Ends today
                        const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
                        const dayName = dayNames[date.getDay()];
                        const isToday = i === 6;
                        const isCompleted = i < 6;

                        return (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.75rem', color: isToday ? 'var(--text-color)' : 'var(--text-muted)', fontWeight: isToday ? 'bold' : 'normal' }}>
                                    {dayName}
                                </span>
                                <span style={{ fontSize: '0.7rem', color: isToday ? 'var(--text-color)' : 'var(--text-muted)' }}>
                                    {date.getDate()}
                                </span>
                                {isCompleted ? (
                                    <CheckCircle2 size={24} color="var(--primary)" fill="#fce7f3" />
                                ) : (
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: isToday ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                                        backgroundColor: isToday ? 'var(--primary)' : 'transparent',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {isToday && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }} />}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </header>

            <button
                onClick={() => setShowSettings(true)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
            >
                <Settings color="var(--text-muted)" size={20} />
            </button>

            {/* 2. Central Timer Hub */}
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '280px', height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Background Track */}
                    <svg width="280" height="280" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                        <circle
                            cx="140"
                            cy="140"
                            r={circleRadius}
                            fill="transparent"
                            stroke="var(--border-color)"
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress Track */}
                        <circle
                            cx="140"
                            cy="140"
                            r={circleRadius}
                            fill="transparent"
                            stroke={isFasting ? "var(--primary)" : "#10B981"} // Green when eating
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={isFasting ? strokeDashoffset : 0}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
                        />
                    </svg>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {isFasting ? 'Tempo Restante' : 'Para Comer'}
                        </span>
                        <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'monospace', margin: '0.5rem 0' }}>
                            {timeDisplay}
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            backgroundColor: isFasting ? '#fce7f3' : '#D1FAE5',
                            color: isFasting ? 'var(--primary-dark)' : '#047857',
                            padding: '6px 12px',
                            borderRadius: '20px'
                        }}>
                            {isFasting ? (progressPercent > 70 ? '🧹 Autofagia Ativa' : '🔥 Queima de Gordura') : '🍏 Janela Aberta'}
                        </span>
                    </div>
                </div>

                <Button
                    onClick={toggleFasting}
                    style={{
                        marginTop: '2rem',
                        minWidth: '200px',
                        backgroundColor: isFasting ? 'var(--text-color)' : 'var(--primary)'
                    }}
                >
                    {isFasting ? 'Terminar Jejum' : 'Iniciar Jejum'}
                </Button>
            </section>

            {/* 3. Time Adjustments */}
            {/* 3. Time Adjustments */}
            <section style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <div style={{ flex: '0 0 auto', width: '150px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>PROTOCOLO</p>
                        <p style={{ fontWeight: '600', marginTop: '4px' }}>{protocol || 'Personalizado'}</p>
                    </div>
                    <Button
                        onClick={() => setShowProtocolModal(true)}
                        variant="outline"
                        style={{ padding: '0.5rem', width: 'auto', borderRadius: '50%', color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}
                    >
                        <Edit3 size={16} />
                    </Button>
                </div>

                <div style={{ flex: '0 0 auto', width: '150px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>INÍCIO DO JEJUM</p>
                        <p style={{ fontWeight: '600', marginTop: '4px' }}>Hoje 20:00</p>
                    </div>
                    <Button variant="outline" style={{ padding: '0.5rem', width: 'auto', borderRadius: '50%', color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}>
                        <Edit3 size={16} />
                    </Button>
                </div>
                <div style={{ flex: '0 0 auto', width: '150px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>FIM DO JEJUM</p>
                        <p style={{ fontWeight: '600', marginTop: '4px' }}>Amanhã 12:00</p>
                    </div>
                    <Button variant="outline" style={{ padding: '0.5rem', width: 'auto', borderRadius: '50%', color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}>
                        <Edit3 size={16} />
                    </Button>
                </div>
            </section>

            {/* 4. Quick Logs */}
            <section>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Registros Diários</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Water */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ backgroundColor: '#E0F2FE', padding: '10px', borderRadius: '12px' }}>
                                <Droplet color="#0284C7" size={24} />
                            </div>
                            <div>
                                <p style={{ fontWeight: '600' }}>Copos de Água</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{waterCount} / 8 copos</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={decrementWater} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)', backgroundColor: 'transparent', fontSize: '1.2rem', fontWeight: 'bold' }}>-</button>
                            <button onClick={incrementWater} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', backgroundColor: '#0284C7', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>+</button>
                        </div>
                    </div>

                    {/* Mood */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ backgroundColor: '#FEF3C7', padding: '10px', borderRadius: '12px' }}>
                                <Smile color="#D97706" size={24} />
                            </div>
                            <div>
                                <p style={{ fontWeight: '600' }}>Humor de Hoje</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{mood ? `Registrado: ${mood}` : 'Como se sente?'}</p>
                            </div>
                        </div>

                        {!mood && !showMoodPicker && (
                            <Button
                                onClick={() => setShowMoodPicker(true)}
                                variant="outline"
                                style={{ padding: '0.5rem 1rem', width: 'auto', borderRadius: '20px', fontSize: '0.875rem' }}
                            >
                                Registrar
                            </Button>
                        )}

                        {mood && <CheckCircle2 color="#10B981" />}
                    </div>

                    {showMoodPicker && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '-8px' }}>
                            {moodOptions.map(m => (
                                <button
                                    key={m}
                                    onClick={() => {
                                        setMood(m);
                                        setShowMoodPicker(false);
                                    }}
                                    style={{
                                        padding: '8px 12px',
                                        borderRadius: '20px',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'white',
                                        fontSize: '0.875rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            </section>

            {/* Protocol Switcher Modal */}
            {showProtocolModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem'
                }}>
                    <div style={{
                        backgroundColor: 'white', borderRadius: '24px', padding: '2rem',
                        width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>Alterar Protocolo</h3>
                        {protocolOptions.map(p => (
                            <button
                                key={p}
                                onClick={() => {
                                    setProtocol(p);
                                    setShowProtocolModal(false);
                                }}
                                style={{
                                    padding: '1rem', borderRadius: '16px',
                                    border: protocol === p ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                                    backgroundColor: protocol === p ? '#FCE7F3' : 'white',
                                    fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer',
                                    transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}
                            >
                                <span>{p}</span>
                                {protocol === p && <CheckCircle2 size={20} color="var(--primary)" />}
                            </button>
                        ))}
                        <Button variant="secondary" onClick={() => setShowProtocolModal(false)} style={{ marginTop: '1rem' }}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && <SettingsScreen onClose={() => setShowSettings(false)} />}
        </div>
    );
};

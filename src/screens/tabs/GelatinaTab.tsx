import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { SettingsScreen } from '../SettingsScreen';

export const GelatinaTab: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div style={{ position: 'relative', height: '100%', minHeight: '100dvh' }}>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '80px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 className="title" style={{ fontSize: '1.75rem', color: '#1E293B' }}>Gelatina Bariátrica</h1>
                        <p className="subtitle" style={{ color: '#64748B' }}>Aprenda mais sobre este aliado.</p>
                    </div>

                    <button
                        onClick={() => setShowSettings(true)}
                        style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <Settings color="var(--text-muted)" size={20} />
                    </button>
                </header>

                <section>
                    <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', aspectRatio: '16/9' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dEYQr33g2r8?rel=0"
                            title="Gelatina Bariátrica"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ border: 'none', display: 'block' }}
                        ></iframe>
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1E293B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>🌿</span> A Receita: Gelatina Funcional 
                            </h2>
                            <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                Uma bala de gelatina (chá de corte) com incríveis efeitos anti-inflamatórios e diuréticos.
                            </p>

                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1E293B', marginBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>Ingredientes Principais (Chá base)</h3>
                            <ul style={{ listStyleType: 'disc', color: '#475569', paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '0.95rem' }}>
                                <li style={{ paddingLeft: '0.5rem' }}>Água (suficiente para ferver por 10-15 min)</li>
                                <li style={{ paddingLeft: '0.5rem' }}>Cravo-da-índia</li>
                                <li style={{ paddingLeft: '0.5rem' }}>Canela em pau (ou em pó)</li>
                                <li style={{ paddingLeft: '0.5rem' }}>Gengibre fresco (ou em pó)</li>
                                <li style={{ paddingLeft: '0.5rem' }}>Hibisco (flores secas)</li>
                                <li style={{ paddingLeft: '0.5rem' }}>Cavalinha (ervas secas)</li>
                            </ul>

                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1E293B', marginBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>Ingredientes para Finalizar</h3>
                            <ul style={{ listStyleType: 'disc', color: '#475569', paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '0.95rem' }}>
                                <li style={{ paddingLeft: '0.5rem' }}>Gelatina neutra, incolor e sem sabor</li>
                                <li style={{ paddingLeft: '0.5rem' }}>Óleo de coco (apenas para untar o refratário)</li>
                                <li style={{ paddingLeft: '0.5rem' }}>Adoçante Estévia (opcional)</li>
                            </ul>

                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1E293B', marginBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>Resumo do Preparo</h3>
                            <ol style={{ listStyleType: 'decimal', color: '#475569', paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '0.95rem' }}>
                                <li style={{ marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Ferva a água com o cravo, a canela e o gengibre por 10 a 15 minutos (decocção).</li>
                                <li style={{ marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Desligue o fogo e adicione o hibisco e a cavalinha, deixando em infusão por 5 minutos.</li>
                                <li style={{ marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Coe o chá e, com ele ainda morno, dissolva bem a gelatina incolor.</li>
                                <li style={{ marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Coloque em um recipiente untado com óleo de coco e leve à geladeira por cerca de 2 horas até firmar.</li>
                                <li style={{ paddingLeft: '0.5rem' }}>Corte em cubinhos (balinhas) e mantenha na geladeira.</li>
                            </ol>
                        </div>
                    </div>
                </section>
            </div>

            {/* Settings Modal */}
            {showSettings && <SettingsScreen onClose={() => setShowSettings(false)} />}
        </div>
    );
};

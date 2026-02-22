import React, { useState } from 'react';
import { Settings, Bell, Apple, Smartphone, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { requestNotificationPermission } from '../lib/notifications';

interface SettingsScreenProps {
    onClose: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose }) => {
    const { protocol, setStep, notificationsEnabled, setNotificationsEnabled } = useAppStore();
    const [isRequesting, setIsRequesting] = useState(false);

    const handleLogout = () => {
        onClose();
        setStep(1); // Back to auth screen
    };

    const handleToggleNotifications = async () => {
        if (notificationsEnabled) {
            // User wants to disable them (only locally in the app state)
            setNotificationsEnabled(false);
            return;
        }

        // User wants to enable them
        setIsRequesting(true);
        const granted = await requestNotificationPermission();
        setIsRequesting(false);

        if (granted) {
            setNotificationsEnabled(true);
        } else {
            alert('Permissão de notificações recusada pelas configurações do seu telemóvel/navegador.');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bg-color)',
            zIndex: 1000,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderBottom: '1px solid var(--border-color)' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Settings size={20} color="var(--primary)" />
                    Configurações
                </h1>
                <button
                    onClick={onClose}
                    style={{ background: 'var(--surface-color)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                >
                    <X size={20} color="var(--text-color)" />
                </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>

                {/* Account / Preferences Section */}
                <section>
                    <h2 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Preferências</h2>

                    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>

                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Bell size={18} color="var(--text-color)" />
                                <span style={{ fontWeight: '500' }}>Notificações</span>
                            </div>

                            {/* Simple Toggle Switch */}
                            <button
                                onClick={handleToggleNotifications}
                                disabled={isRequesting}
                                style={{
                                    width: '44px', height: '24px',
                                    backgroundColor: notificationsEnabled ? 'var(--primary)' : '#E2E8F0',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    border: 'none',
                                    cursor: isRequesting ? 'wait' : 'pointer',
                                    transition: 'background-color 0.2s',
                                    opacity: isRequesting ? 0.7 : 1
                                }}
                            >
                                <div style={{
                                    width: '18px', height: '18px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '3px',
                                    left: notificationsEnabled ? '23px' : '3px',
                                    transition: 'left 0.2s',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                }} />
                            </button>
                        </div>

                        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '500' }}>Protocolo Atual</span>
                            <span style={{ backgroundColor: '#FCE7F3', color: 'var(--primary-dark)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 'bold' }}>{protocol || 'Desconhecido'}</span>
                        </div>
                    </div>
                </section>

                {/* PWA Instalation Guide */}
                <section>
                    <h2 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Como Instalar a App</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {/* iOS Card */}
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                                <div style={{ backgroundColor: '#F3F4F6', padding: '8px', borderRadius: '8px' }}>
                                    <Apple size={20} color="#1E293B" />
                                </div>
                                <h3 style={{ fontWeight: 'bold' }}>Apple iOS (iPhone)</h3>
                            </div>
                            <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-color)', lineHeight: '1.6' }}>
                                <li>Abra este site no navegador <strong>Safari</strong>.</li>
                                <li>Toque no ícone de partilha (quadrado com seta para cima) na barra inferior.</li>
                                <li>Desça as opções e toque em <strong>"Adicionar ao Ecrã Principal"</strong>.</li>
                            </ol>
                        </div>

                        {/* Android Card */}
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                                <div style={{ backgroundColor: '#F3F4F6', padding: '8px', borderRadius: '8px' }}>
                                    <Smartphone size={20} color="#10B981" />
                                </div>
                                <h3 style={{ fontWeight: 'bold' }}>Android</h3>
                            </div>
                            <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-color)', lineHeight: '1.6' }}>
                                <li>Abra este site no navegador <strong>Google Chrome</strong>.</li>
                                <li>Toque no menu (três pontos) no canto superior direito.</li>
                                <li>Toque em <strong>"Instalar Aplicação"</strong> ou "Adicionar ao ecrã principal".</li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <button
                        onClick={handleLogout}
                        style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: '1px solid #FCA5A5', color: '#EF4444', borderRadius: '16px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                    >
                        Sair da Conta
                    </button>
                </section>

            </div>
        </div>
    );
};

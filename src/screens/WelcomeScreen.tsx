import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { Apple } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
    const { nextStep, setUser, setName } = useAppStore();
    const [nameInput, setNameInput] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // In a real app we might send a magic link, but for this demo 
        // or if the user just wants to bypass quickly, we can mock it 
        // or use supabase signInWithOtp.
        try {
            if (!nameInput.trim()) {
                setMessage('Por favor, informe o seu nome.');
                setLoading(false);
                return;
            }
            if (!email) {
                setMessage('Por favor, informe um email válido.');
                setLoading(false);
                return;
            }

            // We use a fixed password under the hood to completely bypass email checking 
            // as requested by the user, providing a frictionless "just enter email" experience.
            const defaultPassword = 'FrictionlessUser123!';

            // Try to sign up first
            let authResponse = await supabase.auth.signUp({
                email: email,
                password: defaultPassword,
                options: {
                    data: { name: nameInput }
                }
            });

            // If the user already exists, signUp might not log them in or throws an error.
            // We then try to sign in.
            if (authResponse.error?.message.includes('already registered') || !authResponse.data.session) {
                authResponse = await supabase.auth.signInWithPassword({
                    email: email,
                    password: defaultPassword,
                });
            }

            if (authResponse.error) throw authResponse.error;

            // Wait for SupabaseSync to hydrate if the user already existed
            await new Promise(resolve => setTimeout(resolve, 800));
            // Move to the next step (which will be handled by SupabaseSync changing the global state if they are returning,
            // or we just move them to step 2 if they are new).
            if (useAppStore.getState().currentStep === 1) {
                nextStep();
            }

        } catch (error: any) {
            setMessage(error.message || 'Ocorreu um erro.');
        } finally {
            setLoading(false);
        }
    };

    const handleBypass = () => {
        // For testing the UI without email verification
        setUser({ id: 'dummy', email: 'test@example.com' } as any);
        setName(nameInput || 'Visitante');
        nextStep();
    }

    return (
        <div className="screen-container">
            <div className="screen-content" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1.5rem', borderRadius: '50%', marginBottom: '2rem' }}>
                    <Apple size={48} />
                </div>

                <h1 className="title">Transforme o seu corpo e a sua mente com o poder do jejum.</h1>
                <p className="subtitle" style={{ maxWidth: '80%', margin: '0 auto 2rem auto' }}>Junte-se a nós e descubra um estilo de vida mais saudável.</p>

                <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Seu nome"
                        className="auth-input"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                        style={{ marginBottom: '0' }}
                    />
                    <input
                        type="email"
                        placeholder="Seu melhor email"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: '0' }}
                    />
                    {message && <p style={{ color: message.includes('erro') ? 'red' : 'green', marginBottom: '1rem', fontSize: '0.875rem' }}>{message}</p>}
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Criar Conta com Email'}
                    </Button>
                </form>

                <button
                    onClick={handleBypass}
                    style={{
                        marginTop: '1.5rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                >
                    Já tenho uma conta. Entrar
                </button>
            </div>
        </div>
    );
};

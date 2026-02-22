import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { supabase } from '../lib/supabase';

export const SupabaseSync: React.FC = () => {
    const state = useAppStore();
    const isHydrating = useRef(false);

    // 1. Handle Auth State and Hydration
    useEffect(() => {
        // Fetch session on load
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                state.setUser(session.user);
                fetchProfile(session.user.id);
            }
        });

        // Listen for Auth changes (Magic link clicks)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                state.setUser(session.user);
                fetchProfile(session.user.id);
            } else {
                state.setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        isHydrating.current = true;
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data && !error) {
            state.hydrateState({
                name: data.name || '',
                goal: data.goal,
                initialWeight: data.initial_weight,
                age: data.age,
                knowledgeLevel: data.knowledge_level,
                lastMealTime: data.last_meal_time || '20:00',
                safetyCheckPassed: data.safety_check_passed,
                protocol: data.protocol,
                currentStep: data.current_step || 2, // skip welcome screen if logged in
                isFasting: data.is_fasting || false,
                fastStartTime: data.fast_start_time,
                fastDurationHours: data.fast_duration_hours || 16,
                weightHistory: data.weight_history || [],
                completedFasts: data.completed_fasts || [],
                notificationsFired: data.notifications_fired || {
                    fourHour: false, twelveHour: false, sixteenHour: false, endGoal: false
                }
            });
        }

        // Allow a small delay to prevent immediate re-sync 
        setTimeout(() => { isHydrating.current = false; }, 1000);
    };

    // 2. Continuous Sync (Debounced Push)
    // We watch significant state variables and push them to Supabase
    useEffect(() => {
        if (!state.user || isHydrating.current) return;

        const syncTimeout = setTimeout(async () => {
            try {
                await supabase.from('profiles').update({
                    name: state.name,
                    goal: state.goal,
                    initial_weight: state.initialWeight,
                    age: state.age,
                    knowledge_level: state.knowledgeLevel,
                    last_meal_time: state.lastMealTime,
                    safety_check_passed: state.safetyCheckPassed,
                    protocol: state.protocol,
                    current_step: state.currentStep,
                    is_fasting: state.isFasting,
                    fast_start_time: state.fastStartTime,
                    fast_duration_hours: state.fastDurationHours,
                    weight_history: state.weightHistory,
                    completed_fasts: state.completedFasts,
                    notifications_fired: state.notificationsFired,
                    updated_at: new Date().toISOString()
                }).eq('id', state.user?.id || '');
            } catch (err) {
                console.error('Failed to sync state to Supabase', err);
            }
        }, 3000); // 3-second debounce to batch updates together

        return () => clearTimeout(syncTimeout);
    }, [
        state.user,
        state.name,
        state.goal,
        state.initialWeight,
        state.age,
        state.knowledgeLevel,
        state.lastMealTime,
        state.safetyCheckPassed,
        state.protocol,
        state.currentStep,
        state.isFasting,
        state.fastStartTime,
        state.fastDurationHours,
        state.weightHistory,
        state.completedFasts,
        state.notificationsFired
    ]);

    return null; // Headless
};

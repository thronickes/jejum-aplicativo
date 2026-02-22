import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

export type Goal = 'weight_loss' | 'mental_clarity' | 'health_longevity' | 'binge_control' | null;
export type KnowledgeLevel = 'beginner' | 'basic' | 'advanced' | null;
export type Protocol = '12:12' | '14:10' | '16:8' | '20:4' | null;

interface AppState {
    currentStep: number;
    user: User | null;
    name: string;
    goal: Goal;
    initialWeight: number | null;
    weightHistory: { date: string; weight: number }[];
    age: number | null;
    knowledgeLevel: KnowledgeLevel;
    lastMealTime: string;
    safetyCheckPassed: boolean | null;
    protocol: Protocol;

    // Dashboard / Fasting State
    isFasting: boolean;
    fastStartTime: string | null;  // ISO string
    fastDurationHours: number;
    waterCount: number;
    completedFasts: { date: string; durationHours: number }[];

    // Notifications State
    notificationsEnabled: boolean;
    notificationsFired: {
        fourHour: boolean;
        twelveHour: boolean;
        sixteenHour: boolean;
        endGoal: boolean;
    };

    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    setUser: (user: User | null) => void;
    setName: (name: string) => void;
    setGoal: (goal: Goal) => void;
    setInitialWeight: (weight: number) => void;
    addWeightRecord: (weight: number) => void;
    setAge: (age: number) => void;
    setKnowledgeLevel: (level: KnowledgeLevel) => void;
    setLastMealTime: (time: string) => void;
    setSafetyCheckPassed: (passed: boolean) => void;
    setProtocol: (protocol: Protocol) => void;

    toggleFasting: () => void;
    setFastStartTime: (time: string) => void;
    setFastDurationHours: (hours: number) => void;
    incrementWater: () => void;
    decrementWater: () => void;

    // Notifications Actions
    setNotificationsEnabled: (enabled: boolean) => void;
    setNotificationFired: (milestone: 'fourHour' | 'twelveHour' | 'sixteenHour' | 'endGoal') => void;

    // Database Hydration
    hydrateState: (data: Partial<AppState>) => void;
}

export const useAppStore = create<AppState>((set) => ({
    currentStep: 1,
    user: null,
    name: '',
    goal: null,
    initialWeight: null,
    weightHistory: [],
    age: null,
    knowledgeLevel: null,
    lastMealTime: '20:00',
    safetyCheckPassed: null,
    protocol: null,
    isFasting: false,
    fastStartTime: null,
    fastDurationHours: 16, // Default to 16:8 if unknown
    waterCount: 0,
    completedFasts: [],
    notificationsEnabled: false,
    notificationsFired: {
        fourHour: false,
        twelveHour: false,
        sixteenHour: false,
        endGoal: false,
    },

    setStep: (step) => set({ currentStep: step }),
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
    setUser: (user) => set({ user }),
    setName: (name) => set({ name }),
    setGoal: (goal) => set({ goal }),
    setInitialWeight: (weight) => set(() => ({
        initialWeight: weight,
        weightHistory: [{ date: new Date().toISOString(), weight }]
    })),
    addWeightRecord: (weight) => set((state) => ({
        weightHistory: [...state.weightHistory, { date: new Date().toISOString(), weight }]
    })),
    setAge: (age) => set({ age }),
    setKnowledgeLevel: (knowledgeLevel) => set({ knowledgeLevel }),
    setLastMealTime: (lastMealTime) => set({ lastMealTime }),
    setSafetyCheckPassed: (safetyCheckPassed) => set({ safetyCheckPassed }),
    setProtocol: (protocol) => {
        let hours = 16;
        if (protocol === '12:12') hours = 12;
        if (protocol === '14:10') hours = 14;
        if (protocol === '20:4') hours = 20;

        set({ protocol, fastDurationHours: hours });
    },

    toggleFasting: () => set((state) => {
        const isNowFasting = !state.isFasting;

        let newCompletedFasts = [...state.completedFasts];

        // If we are turning OFF the fast, record the duration
        if (!isNowFasting && state.fastStartTime) {
            const start = new Date(state.fastStartTime).getTime();
            const now = new Date().getTime();
            const elapsedHours = (now - start) / (1000 * 60 * 60);

            // Only count if it's more than, say, 1 hour, to avoid spam clicks 
            // but for testing let's log anything above 0 for now.
            if (elapsedHours > 0) {
                newCompletedFasts.push({
                    date: new Date().toISOString(),
                    durationHours: parseFloat(elapsedHours.toFixed(1))
                });
            }
        }

        return {
            isFasting: isNowFasting,
            fastStartTime: isNowFasting ? new Date().toISOString() : null,
            completedFasts: newCompletedFasts,
            // Reset fired notifications when starting a new fast
            notificationsFired: isNowFasting ? {
                fourHour: false,
                twelveHour: false,
                sixteenHour: false,
                endGoal: false,
            } : state.notificationsFired
        };
    }),
    setFastStartTime: (time) => set({ fastStartTime: time }),
    setFastDurationHours: (hours) => set({ fastDurationHours: hours }),
    incrementWater: () => set((state) => ({ waterCount: state.waterCount + 1 })),
    decrementWater: () => set((state) => ({ waterCount: Math.max(0, state.waterCount - 1) })),
    setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
    setNotificationFired: (milestone) => set((state) => ({
        notificationsFired: {
            ...state.notificationsFired,
            [milestone]: true
        }
    })),
    hydrateState: (data) => set((state) => ({ ...state, ...data }))
}));

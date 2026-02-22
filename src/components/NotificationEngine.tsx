import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { showLocalNotification } from '../lib/notifications';

export const NotificationEngine: React.FC = () => {
    const {
        isFasting,
        fastStartTime,
        fastDurationHours,
        notificationsEnabled,
        notificationsFired,
        setNotificationFired
    } = useAppStore();

    useEffect(() => {
        // Only run if notifications are enabled and the user is fasting
        if (!notificationsEnabled || !isFasting || !fastStartTime) return;

        // Check if we are in "Quiet Hours" (23:00 to 07:00)
        // We do not want to wake the user up for biological milestones!
        const isQuietHours = () => {
            const currentHour = new Date().getHours();
            return currentHour >= 23 || currentHour < 7;
        };

        const interval = setInterval(() => {
            const startStr = fastStartTime;
            if (!startStr) return;

            const startMs = new Date(startStr).getTime();
            const nowMs = new Date().getTime();
            const elapsedMs = nowMs - startMs;
            const elapsedHours = elapsedMs / (1000 * 60 * 60);

            // 1. Biological Milestone: Sugar Burning (4 Hours)
            if (elapsedHours >= 4 && !notificationsFired.fourHour) {
                setNotificationFired('fourHour');
                if (!isQuietHours()) {
                    showLocalNotification('🩸 Açúcar a descer...', {
                        body: 'O seu corpo está a consumir o último açúcar disponível no sangue. A queima de gordura está quase a começar. Mantenha-se firme!',
                    });
                }
            }

            // 2. Biological Milestone: Fat Burning (12 Hours)
            if (elapsedHours >= 12 && !notificationsFired.twelveHour) {
                setNotificationFired('twelveHour');
                if (!isQuietHours()) {
                    showLocalNotification('🔥 Modo Queima Ativado!', {
                        body: 'Incrível! As suas reservas de açúcar acabaram e o seu corpo está agora a queimar a gordura armazenada como energia.',
                    });
                }
            }

            // 3. Biological Milestone: Autophagy (16 Hours+)
            if (elapsedHours >= 16 && !notificationsFired.sixteenHour) {
                setNotificationFired('sixteenHour');
                if (!isQuietHours()) {
                    showLocalNotification('🧹 Limpeza Profunda!', {
                        body: 'Chegou à fase da Autofagia. As suas células estão a renovar-se e a reciclar proteínas antigas. Saúde e longevidade a trabalhar!',
                    });
                }
            }

            // 4. Critical Event: End of Fasting Goal
            if (elapsedHours >= fastDurationHours && !notificationsFired.endGoal) {
                setNotificationFired('endGoal');
                // The end goal notification should bypass quiet hours if the goal mathematically landed during the night.
                // Usually this is an error on user planning, but we should inform them.
                showLocalNotification('🎉 Parabéns, você conseguiu!', {
                    body: 'A sua meta de jejum foi atingida. Lembre-se de quebrar o jejum com proteínas e gorduras boas. Veja as nossas sugestões de receitas!',
                });
            }

        }, 60000); // Check every minute (60,000 ms)

        return () => clearInterval(interval);
    }, [isFasting, fastStartTime, fastDurationHours, notificationsEnabled, notificationsFired, setNotificationFired]);

    return null; // Headless component, renders no UI
};

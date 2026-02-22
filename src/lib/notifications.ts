export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
        console.warn('Este browser não suporta notificações de desktop.');
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
};

export const showLocalNotification = (title: string, options?: NotificationOptions) => {
    if (!('Notification' in window)) {
        return;
    }

    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then((reg) => {
            if (reg) {
                reg.showNotification(title, {
                    icon: '/icon-192.png',
                    badge: '/icon-192.png',
                    vibrate: [200, 100, 200],
                    ...options
                } as any);
            } else {
                // Fallback Se não houver SW registado
                new Notification(title, {
                    icon: '/icon-192.png',
                    ...options
                });
            }
        });
    }
};

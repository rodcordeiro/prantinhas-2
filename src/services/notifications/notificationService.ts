import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Plant } from '../../types';

let notificationsConfigured = false;

export async function configureNotifications(): Promise<void> {
  if (!notificationsConfigured) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    notificationsConfigured = true;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('hydration-reminders', {
      name: 'Lembretes de hidratação',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 200, 200, 200],
      lightColor: '#2C8653',
    });
  }
}

export async function ensureNotificationPermissions(): Promise<boolean> {
  await configureNotifications();

  const permissions = await Notifications.getPermissionsAsync();
  let finalStatus = permissions.status;

  if (finalStatus !== 'granted') {
    finalStatus = (await Notifications.requestPermissionsAsync()).status;
  }

  return finalStatus === 'granted';
}

export async function cancelHydrationReminder(
  scheduledNotificationId?: string,
): Promise<void> {
  if (!scheduledNotificationId) {
    return;
  }

  await Notifications.cancelScheduledNotificationAsync(scheduledNotificationId);
}

export async function scheduleHydrationReminder(
  plant: Plant,
): Promise<string | undefined> {
  if (!plant.remindersEnabled) {
    return undefined;
  }

  const granted = await ensureNotificationPermissions();
  if (!granted) {
    return undefined;
  }

  const triggerDate = new Date(plant.nextHydrationAt);
  if (Number.isNaN(triggerDate.getTime())) {
    return undefined;
  }

  if (triggerDate.getTime() <= Date.now()) {
    triggerDate.setTime(Date.now() + 60 * 1000);
  }

  triggerDate.setHours(plant.reminderHour, 0, 0, 0);
  if (triggerDate.getTime() <= Date.now()) {
    triggerDate.setDate(triggerDate.getDate() + 1);
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: `Hora de cuidar da ${plant.name}`,
      body: `${plant.name} precisa de ${plant.waterAmount} de água hoje.`,
      data: {
        plantId: plant.id,
        type: 'hydration-reminder',
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });
}

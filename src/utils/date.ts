export function addDays(baseDate: Date, days: number, reminderHour = 9): Date {
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + days);
  nextDate.setHours(reminderHour, 0, 0, 0);
  return nextDate;
}

export function calculateNextHydrationAt(
  lastHydrationAt: string,
  wateringIntervalDays: number,
  reminderHour = 9,
): string {
  const nextDate = addDays(new Date(lastHydrationAt), wateringIntervalDays, reminderHour);
  return nextDate.toISOString();
}

export function formatDate(dateString?: string): string {
  if (!dateString) {
    return '--/--/----';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '--/--/----';
  }

  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatReminderDate(dateString?: string): string {
  if (!dateString) {
    return '--';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '--';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function parseFrequencyDays(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 14;
}

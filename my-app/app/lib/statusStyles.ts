// Talep statüleri için global renk ve metin stilleri
import { COLORS } from '../utils/colors';

export const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  Approve: {
    label: 'Onaylandı',
    bg: COLORS.green100,
    text: COLORS.green700Text,
  },
  Wait: {
    label: 'Beklemede',
    bg: COLORS.yellow100,
    text: COLORS.yellow700Text,
  },
  Work: {
    label: 'Çalışılıyor',
    bg: COLORS.blue100,
    text: COLORS.blue700Text,
  },
  Complete: {
    label: 'Tamamlandı',
    bg: COLORS.green200,
    text: COLORS.green900Text,
  },
  Reject: {
    label: 'Reddedildi',
    bg: COLORS.red100,
    text: COLORS.red700Text,
  },
};

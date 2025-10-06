// Talep statüleri için global renk ve metin stilleri
export const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  Approve: {
    label: 'Onaylandı',
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  Wait: {
    label: 'Beklemede',
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
  },
  Work: {
    label: 'Çalışılıyor',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  Complete: {
    label: 'Tamamlandı',
    bg: 'bg-green-200',
    text: 'text-green-900',
  },
  Reject: {
    label: 'Reddedildi',
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
};

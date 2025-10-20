
export const ROUTES = {
  // general
  HOME: '/',
  DASHBOARD: '/dashboard',

  // top-level menu (from Menu.tsx)
  ASSETS: '/pages/assets',
  REQUESTS: '/requests',
  INVENTORY: '/inventory',
  HR: '/hr',
  PROFILE: '/profile',

  // new pages
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
  MAINTENANCE: '/maintenance',

  // specific request/entity routes
  REQUEST_DETAIL: '/requests/:id',

  
  ARIZA_TALEBI: '/pages/ariza',
  MALZEME_TALEBI: '/pages/malzeme',
  SEHIR_DISI_ARAC_TALEBI: '/pages/arac/sehir-disi-arac',
  SEHIR_ICI_ARAC_TALEBI: '/pages/arac/sehir-ici-arac',
  TEMIZLIK_TALEBI: '/pages/temizlik',
  YENI_IS_TALEBI: '/pages/is',
  IS_TALEBI_DETAY: '/entity/entity-pages/detail',
  IS_TALEBI_DUZENLE: '/entity/entity-pages/info',

} as const;

export type RouteKey = keyof typeof ROUTES;

export default ROUTES;



# 🛠️ VYS Project - Development Guide

Quick reference for working with the enhanced VYS project.

---

## 📁 File Organization

```
my-app/
├── app/
│   ├── components/
│   │   ├── tabs/
│   │   │   └── Tabs.tsx              # Advanced tabs component
│   │   ├── navbar/
│   │   │   ├── Menu.tsx              # Updated with new pages
│   │   │   ├── Navbar.tsx
│   │   │   ├── Language.tsx
│   │   │   └── ...
│   │   ├── footer/
│   │   ├── providers/
│   │   └── ...
│   ├── analytics/
│   │   └── page.tsx                  # Analytics & Reports page
│   ├── settings/
│   │   └── page.tsx                  # Settings page
│   ├── notifications/
│   │   └── page.tsx                  # Notifications page
│   ├── maintenance/
│   │   └── page.tsx                  # Maintenance page
│   ├── inventory/
│   │   └── page.tsx                  # Enhanced with tabs
│   ├── lib/
│   │   ├── router.tsx                # Updated routes
│   │   ├── i18n.ts
│   │   └── statusStyles.ts
│   ├── layout.tsx
│   ├── globals.css
│   └── ...
└── package.json
```

---

## 🚀 Quick Start

### 1. Run Development Server

```bash
cd my-app
npm install --legacy-peer-deps
npm run dev
```

Visit `http://localhost:3000`

### 2. Build for Production

```bash
npm run build
npm start
```

### 3. Linting

```bash
npm run lint
```

---

## 🎯 Common Tasks

### Creating a New Page with Tabs

**1. Create page directory:**
```bash
mkdir app/myfeature
touch app/myfeature/page.tsx
```

**2. Create page component:**
```typescript
'use client';

import React, { useState } from 'react';
import { Home, Settings } from 'lucide-react';
import Tabs, { TabItem } from '../components/tabs/Tabs';

export default function MyFeaturePage() {
  const Tab1Content = () => <div>Tab 1 Content</div>;
  const Tab2Content = () => <div>Tab 2 Content</div>;

  const tabs: TabItem[] = [
    {
      id: 'tab1',
      label: 'First Tab',
      icon: <Home size={20} />,
      content: <Tab1Content />,
    },
    {
      id: 'tab2',
      label: 'Second Tab',
      icon: <Settings size={20} />,
      content: <Tab2Content />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          My Feature
        </h1>
        <Tabs tabs={tabs} variant="underline" size="lg" />
      </div>
    </div>
  );
}
```

### 3. Add route to router.tsx

```typescript
export const ROUTES = {
  // ... existing routes
  MY_FEATURE: '/myfeature',
};
```

### 4. Add to menu in Menu.tsx

```typescript
const menuItems = [
  // ... existing items
  { name: 'My Feature', path: ROUTES.MY_FEATURE, icon: Star, description: 'Description' },
];
```

---

## 🎨 Styling Guide

### Color System

```typescript
// Primary Colors
'bg-red-600'      // Main red
'bg-blue-500'     // Info
'bg-green-500'    // Success
'bg-yellow-500'   // Warning
'bg-gray-50'      // Backgrounds

// Text Colors
'text-gray-900'   // Headers
'text-gray-600'   // Body text
'text-gray-500'   // Secondary text
```

### Common Patterns

**Card:**
```typescript
<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg transition">
  {/* content */}
</div>
```

**Button:**
```typescript
<button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
  Click me
</button>
```

**Badge:**
```typescript
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
  Success
</span>
```

**Table:**
```typescript
<table className="w-full text-sm">
  <thead className="bg-gray-50 border-b border-gray-200">
    <tr>
      <th className="px-6 py-3 text-left font-semibold text-gray-900">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4">Data</td>
    </tr>
  </tbody>
</table>
```

---

## 📦 Component Usage

### Tabs Component

```typescript
import Tabs, { TabItem } from '@/components/tabs/Tabs';

// Basic usage
<Tabs
  tabs={[
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart3 size={20} />,
      badge: 5,
      content: <OverviewContent />,
    },
  ]}
  variant="underline"
  size="lg"
  onTabChange={(tabId) => console.log(tabId)}
/>

// Tab Variants
variant="default"    // Border bottom
variant="pills"      // Rounded buttons
variant="underline"  // Modern underline
variant="cards"      // Card style

// Sizes
size="sm"   // Compact
size="md"   // Medium (default)
size="lg"   // Spacious
```

### Icons (Lucide React)

```typescript
import {
  Home, Settings, Bell, BarChart3, Download,
  Upload, Delete, Edit2, Plus, Search,
  Filter, Menu, LogOut, Users, Package,
  // ... many more
} from 'lucide-react';

// Usage
<Home size={20} className="text-red-600" />
<Settings size={24} className="hover:text-gray-700" />
```

---

## 🔧 Hooks & Patterns

### useState

```typescript
const [isOpen, setIsOpen] = useState(false);

const toggle = () => setIsOpen(!isOpen);
```

### useMemo

```typescript
const filtered = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);
```

### useRouter (Navigation)

```typescript
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/router';

const router = useRouter();

const goToAnalytics = () => {
  router.push(ROUTES.ANALYTICS);
};
```

### useTranslation (i18n)

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

return <h1>{t('inventory.inventory_management')}</h1>;
```

---

## 🧪 Testing Checklist

- [ ] All pages load without errors
- [ ] Tabs work in all variants
- [ ] Keyboard navigation works
- [ ] Mobile responsive (test on devices)
- [ ] Dark mode toggle works (in settings)
- [ ] Language switching works
- [ ] All links navigate correctly
- [ ] Forms validate properly
- [ ] Modals open and close
- [ ] Filters work correctly

---

## 📊 Data Structures

### Material (Inventory)

```typescript
type Material = {
  id: number;
  name: string;
  warehouse: string;
  quantity: number;
  minStock: number;
  unitPrice: number;
  unit: string;
  category: string;
  lastUpdated: string;
};
```

### Notification

```typescript
type Notification = {
  id: number;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: ReactNode;
  color: string;
};
```

### TabItem

```typescript
type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
};
```

---

## 🔗 API Routes (Future)

When connecting to backend, update in `app/lib/` or create new `api/` folder:

```typescript
// Example API integration
async function fetchAnalytics() {
  const response = await fetch('/api/analytics');
  return response.json();
}

async function updateSettings(settings: any) {
  const response = await fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  return response.json();
}
```

---

## 🐛 Debugging Tips

### Check Browser Console

```bash
# Dev tools: F12 → Console
# Look for errors or warnings
```

### Next.js Dev Tools

```bash
# Terminal shows compilation errors
# Visit http://localhost:3000 for hot reload
```

### React DevTools

```bash
# Install React DevTools Chrome extension
# Inspect component tree
# Check props and state
```

### Common Issues

**Issue:** Page not loading
**Solution:** Check router.tsx for correct route definition

**Issue:** Styling not applied
**Solution:** Clear cache: `npm run dev` after changes

**Issue:** Component not rendering
**Solution:** Check console for TypeScript errors

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [i18next](https://www.i18next.com)

---

## ✅ Deployment

### Build Steps

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Build project
npm run build

# 3. Test production build
npm start

# 4. Deploy to hosting
# Use Vercel, Netlify, or your hosting provider
```

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=your_api_url
# Add other env vars
```

---

## 👨‍💼 Code Standards

### Naming Conventions

```typescript
// Components - PascalCase
export default function MyComponent() {}

// Functions - camelCase
const handleClick = () => {}

// Constants - UPPER_SNAKE_CASE
const MAX_ITEMS = 100;

// Variables - camelCase
const userName = 'John';
```

### File Structure

```typescript
// 1. Imports
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyComponent from '../components/MyComponent';

// 2. Types
type Props = { /* ... */ };

// 3. Component
export default function Page() {
  // State
  // Functions
  // Effects
  // Render
}
```

---

## 🎉 You're Ready!

Now you have everything to:
- ✅ Build new features
- ✅ Enhance existing pages
- ✅ Create tabbed interfaces
- ✅ Add to the menu system
- ✅ Deploy to production

Happy coding! 🚀

---

**Last Updated:** October 2024  
**Version:** 2.0.0

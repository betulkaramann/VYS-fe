# 👨‍💻 Developer Quick Reference - VYS v3.0

Quick reference guide for using the new components, hooks, and features added in v3.0.

---

## 📦 Import Paths

### Contexts
```typescript
import { useToast } from '@/app/contexts/ToastContext';
import { useAppContext } from '@/app/contexts/AppContext';
```

### Hooks
```typescript
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { useDebounce } from '@/app/hooks/useDebounce';
import { useClickOutside } from '@/app/hooks/useClickOutside';
import { useIsMobile, useIsTablet, useIsDesktop } from '@/app/hooks/useMediaQuery';
```

### Components
```typescript
import Breadcrumb from '@/app/components/common/Breadcrumb';
import Loading, { Skeleton, CardSkeleton, TableSkeleton } from '@/app/components/common/Loading';
import SearchBar from '@/app/components/common/SearchBar';
import { FadeIn, SlideInLeft, ScaleIn } from '@/app/components/common/PageTransition';
```

---

## 🔔 Toast Notifications

### Show Toast
```typescript
'use client';
import { useToast } from '@/app/contexts/ToastContext';

export default function MyComponent() {
  const { showToast } = useToast();
  
  // Success
  showToast('Operation successful!', 'success');
  
  // Error
  showToast('Something went wrong!', 'error');
  
  // Warning
  showToast('Please be careful!', 'warning');
  
  // Info
  showToast('Did you know...', 'info');
  
  // Custom duration (default 5000ms)
  showToast('Quick message', 'info', 2000);
  
  return <button onClick={() => showToast('Test', 'success')}>Click me</button>;
}
```

---

## 🧭 Breadcrumbs

### Basic Usage
```typescript
import Breadcrumb from '@/app/components/common/Breadcrumb';

<Breadcrumb 
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/users' },
    { label: 'John Doe' } // Current page (no href)
  ]} 
/>
```

### Without Home
```typescript
<Breadcrumb 
  items={[{ label: 'Profile' }]} 
  showHome={false}
/>
```

---

## ⏳ Loading States

### Loading Spinner
```typescript
import Loading from '@/app/components/common/Loading';

// Small
<Loading size="sm" />

// Medium (default)
<Loading size="md" text="Loading data..." />

// Large
<Loading size="lg" text="Please wait..." />

// Extra Large
<Loading size="xl" />

// Full Screen
<Loading size="lg" text="Loading..." fullScreen />
```

### Skeleton Loaders
```typescript
import { Skeleton, CardSkeleton, TableSkeleton } from '@/app/components/common/Loading';

// Basic skeleton
<Skeleton className="h-4 w-full" />
<Skeleton className="h-8 w-48" />

// Card skeleton
<CardSkeleton />

// Table skeleton
<TableSkeleton rows={5} columns={4} />
```

### Loading Pattern
```typescript
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData()
    .then(data => setData(data))
    .finally(() => setLoading(false));
}, []);

if (loading) return <Loading size="lg" text="Yükleniyor..." />;

return <div>{/* Your content */}</div>;
```

---

## ✨ Animations

### Fade In
```typescript
import { FadeIn } from '@/app/components/common/PageTransition';

<FadeIn>
  <h1>This fades in</h1>
</FadeIn>

// With delay
<FadeIn delay={0.3}>
  <p>This fades in after 300ms</p>
</FadeIn>
```

### Slide In
```typescript
import { SlideInLeft } from '@/app/components/common/PageTransition';

<SlideInLeft>
  <h1>This slides in from left</h1>
</SlideInLeft>

<SlideInLeft delay={0.2}>
  <p>Delayed slide</p>
</SlideInLeft>
```

### Scale In
```typescript
import { ScaleIn } from '@/app/components/common/PageTransition';

<ScaleIn>
  <Card>This scales up</Card>
</ScaleIn>

<ScaleIn delay={0.5}>
  <div>Delayed scale</div>
</ScaleIn>
```

### Staggered Animations
```typescript
{items.map((item, index) => (
  <ScaleIn key={item.id} delay={0.1 * index}>
    <Card item={item} />
  </ScaleIn>
))}
```

---

## 🎣 Custom Hooks

### useLocalStorage
```typescript
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

function MyComponent() {
  const [name, setName] = useLocalStorage('userName', 'Guest');
  
  return (
    <input 
      value={name} 
      onChange={e => setName(e.target.value)} 
    />
  );
}
```

### useDebounce
```typescript
import { useDebounce } from '@/app/hooks/useDebounce';
import { useState, useEffect } from 'react';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      // This only runs 500ms after user stops typing
      performSearch(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return (
    <input 
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### useClickOutside
```typescript
import { useClickOutside } from '@/app/hooks/useClickOutside';
import { useRef, useState } from 'react';

function DropdownComponent() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => setOpen(false));
  
  return (
    <div ref={dropdownRef}>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && <div>Dropdown content</div>}
    </div>
  );
}
```

### useMediaQuery
```typescript
import { useIsMobile, useIsTablet, useIsDesktop } from '@/app/hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  
  if (isMobile) return <MobileView />;
  if (isTablet) return <TabletView />;
  return <DesktopView />;
}
```

---

## 🌐 Global State

### App Context
```typescript
import { useAppContext } from '@/app/contexts/AppContext';

function MyComponent() {
  const { 
    theme, 
    setTheme, 
    notificationCount,
    setNotificationCount,
    searchQuery,
    setSearchQuery 
  } = useAppContext();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme (Current: {theme})
    </button>
  );
}
```

---

## 🎨 CSS Animations

### Available Classes
```css
.animate-slide-in    /* Slide from right */
.animate-fade-in     /* Fade in */
.animate-scale-in    /* Scale up */
.animate-pulse-glow  /* Glowing pulse */
```

### Usage
```tsx
<div className="animate-fade-in">
  This fades in
</div>

<div className="animate-slide-in">
  This slides in
</div>
```

---

## 📱 Responsive Patterns

### Using Hooks
```typescript
const isMobile = useIsMobile();

return (
  <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
    {isMobile ? <MobileNav /> : <DesktopNav />}
  </div>
);
```

### Using Tailwind
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive text */}
</div>
```

---

## 🔍 Search Implementation

### Navbar Search
```typescript
// Already implemented in Navbar component
// Click search icon in navbar
```

### Custom Search
```typescript
import SearchBar from '@/app/components/common/SearchBar';

<SearchBar />
```

---

## 🎯 Common Patterns

### Page with Breadcrumbs and Loading
```typescript
'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/app/components/common/Breadcrumb';
import Loading from '@/app/components/common/Loading';
import { FadeIn } from '@/app/components/common/PageTransition';

export default function MyPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <Loading size="lg" fullScreen />;
  
  return (
    <div className="p-6">
      <Breadcrumb items={[
        { label: 'Section', href: '/section' },
        { label: 'Page' }
      ]} />
      
      <FadeIn>
        <h1>My Page</h1>
        {/* Content */}
      </FadeIn>
    </div>
  );
}
```

### Form with Toast Feedback
```typescript
'use client';
import { useState } from 'react';
import { useToast } from '@/app/contexts/ToastContext';

export default function MyForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await saveData();
      showToast('Data saved successfully!', 'success');
    } catch (error) {
      showToast('Failed to save data', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

### Dropdown with Click Outside
```typescript
'use client';
import { useState, useRef } from 'react';
import { useClickOutside } from '@/app/hooks/useClickOutside';

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => setOpen(false));
  
  return (
    <div ref={dropdownRef} className="relative">
      <button onClick={() => setOpen(!open)}>
        Options
      </button>
      
      {open && (
        <div className="absolute mt-2 bg-white shadow-lg rounded">
          <button>Option 1</button>
          <button>Option 2</button>
        </div>
      )}
    </div>
  );
}
```

### Search with Debounce
```typescript
'use client';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/app/hooks/useDebounce';

export default function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 500);
  
  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery).then(setResults);
    }
  }, [debouncedQuery]);
  
  return (
    <div>
      <input 
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <div>
        {results.map(result => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🚨 Important Notes

### Client Components
All components using hooks MUST be client components:
```typescript
'use client';  // Add this at the top of the file

import { useState } from 'react';
// ... rest of your component
```

### Type Safety
All components and hooks are fully typed. Use TypeScript for best experience:
```typescript
import type { Toast, ToastType } from '@/app/contexts/ToastContext';
import type { BreadcrumbItem } from '@/app/components/common/Breadcrumb';
```

### Performance
- Use `useDebounce` for expensive operations (search, API calls)
- Use `useMemo` and `useCallback` when needed
- Animations are optimized (300ms default)

---

## 📚 Additional Resources

- **Full Documentation:** See `FRONTEND_ENHANCEMENTS_V3.md`
- **Quick Summary:** See `QUICK_SUMMARY_V3.md`
- **Previous Features:** See `ENHANCEMENT_SUMMARY.md` (v2.0)
- **Original Features:** See `IMPLEMENTATION_SUMMARY.md` (v1.0)

---

## ✅ Checklist for New Pages

When creating a new page:
- [ ] Add 'use client' if using hooks
- [ ] Add Breadcrumb navigation
- [ ] Add loading states
- [ ] Add toast notifications for user feedback
- [ ] Add page transitions/animations
- [ ] Make it responsive
- [ ] Add to router if needed

---

## 🎯 Quick Tips

1. **Always show feedback:** Use toasts for actions
2. **Always show loading:** Users need to know something is happening
3. **Animate carefully:** Don't overdo it, 300ms is good
4. **Be responsive:** Test on mobile, tablet, desktop
5. **Use hooks:** Don't reinvent the wheel
6. **Follow patterns:** Look at existing pages for examples

---

**Happy Coding! 🚀**

Need help? Check the documentation or look at existing implementations in:
- `app/page.tsx` (Home)
- `app/profile/page.tsx` (Profile)
- `app/requests/page.tsx` (Requests)

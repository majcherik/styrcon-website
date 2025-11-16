# Hook Implementation Guide for STYRCON Website

This document outlines where and how to implement the newly created hooks throughout the codebase for maximum benefit.

## ✅ Already Implemented

### 1. **useIsClient** - `/src/components/blog/social-share.tsx`
**Implementation:** Replaced `typeof window !== 'undefined'` check
```typescript
const isClient = useIsClient();
const shareUrl = isClient
  ? (process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}` : window.location.href)
  : url;
```
**Benefit:** SSR-safe, prevents hydration mismatches

---

## 🎯 High-Priority Implementation Opportunities

### 2. **useIsClient** - Additional Candidates

#### `/src/components/ui/cookie-consent.tsx`
**Current:** Likely uses window checks for localStorage
**Implementation:**
```typescript
const isClient = useIsClient();
if (!isClient) return null;
```
**Benefit:** Safe localStorage access

#### `/src/components/analytics/google-analytics.tsx`
**Current:** Accesses window object
**Implementation:**
```typescript
const isClient = useIsClient();
if (!isClient) return null;
// Then safely use window.gtag, etc.
```
**Benefit:** Prevents SSR errors with analytics

#### `/src/hooks/use-local-storage.ts` & `/src/hooks/use-session-storage.ts`
**Implementation:** Use `useIsClient` internally before accessing storage
**Benefit:** Extra safety layer for storage hooks

---

### 3. **useEventListener** - Refactor Manual addEventListener Calls

#### `/src/components/sections/before-after.tsx` ⭐ HIGH IMPACT
**Current:** Manual addEventListener/removeEventListener (lines 60-76)
```typescript
// BEFORE (lines 60-76)
handle.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
// ... cleanup in return
```

**After Implementation:**
```typescript
import { useEventListener } from '@/hooks/use-event-listener';

// Replace manual listeners with hooks
useEventListener('mousedown', onMouseDown, handleRef);
useEventListener('mousemove', onMouseMove);  // Window event
useEventListener('mouseup', onMouseUp);

useEventListener('touchstart', onTouchStart, handleRef, { passive: false });
useEventListener('touchmove', onTouchMove, undefined, { passive: false });
useEventListener('touchend', onTouchEnd);
```
**Benefits:**
- Automatic cleanup (no memory leaks)
- Cleaner code (removes 40+ lines)
- Type-safe event handling
- Stable handler references

#### `/src/components/navigation/aceternity-navbar.tsx`
**Current:** Likely has scroll listeners
**Implementation:** Replace with `useEventListener('scroll', handleScroll)`

#### `/src/components/ui/sticky-scroll-reveal.tsx`
**Current:** Scroll event listeners
**Implementation:** `useEventListener('scroll', handleScroll)`

#### `/src/components/ui/before-after-slider.tsx`
**Current:** Mouse/touch event listeners
**Implementation:** Similar to before-after.tsx pattern

---

### 4. **useEventCallback** - Optimize Form Handlers

#### `/src/components/forms/enhanced-contact-form.tsx` ⭐ HIGH IMPACT
**Current:** Uses `useCallback` for handlers (lines 73, 172)
```typescript
// BEFORE (line 73)
const handleSubmit = useCallback(async (formData: FormData) => {
  // ...
}, [addOptimisticMessage])
```

**After Implementation:**
```typescript
import { useEventCallback } from '@/hooks/use-event-callback';

// REPLACE useCallback with useEventCallback
const handleSubmit = useEventCallback(async (formData: FormData) => {
  const messageData: OptimisticMessage = {
    id: Date.now().toString(),
    name: formData.get('name') as string || '',
    // ... always uses latest addOptimisticMessage
  }
  addOptimisticMessage(messageData)
  setOptimisticSubmitted(true)
})

// Line 172 - handleFieldChange
const handleFieldChange = useEventCallback((field: keyof typeof formData, value: string | boolean) => {
  setFormData(prev => ({ ...prev, [field]: value }))
})
```
**Benefits:**
- No need to track dependencies
- Always uses latest closure
- Prevents stale closure bugs
- Stable reference (prevents re-renders)

#### `/src/components/forms/contact-form.tsx`
**Implementation:** Replace form submission handler with `useEventCallback`

---

### 5. **useUnmount** - Cleanup Logic

#### `/src/components/sections/before-after.tsx`
**Current:** useEffect cleanup (lines 69-76)
**After Implementation:**
```typescript
import { useUnmount } from '@/hooks/use-unmount';

// Separate cleanup logic
useUnmount(() => {
  // Cancel any pending operations
  // Clear timeouts
  // Clean up resources
})
```
**Benefit:** Clearer separation of mount/unmount logic

#### `/src/components/pwa/service-worker.tsx`
**Implementation:** Unregister service worker on unmount if needed
```typescript
useUnmount(() => {
  navigator.serviceWorker.getRegistration().then(registration => {
    registration?.unregister();
  });
})
```

#### `/src/components/analytics/google-analytics.tsx`
**Implementation:** Cleanup analytics trackers
```typescript
useUnmount(() => {
  // Stop tracking, clear buffers
})
```

---

### 6. **useScreen** - Advanced Responsive Features

#### `/src/components/sections/features-accordion-section.tsx`
**Current:** Likely uses window size checks
**Implementation:**
```typescript
import { useScreen } from '@/hooks/use-screen';

const screen = useScreen({ debounceDelay: 200 });

// Use screen properties
if (screen && screen.orientation?.type === 'portrait') {
  // Mobile portrait layout
}

// High-DPI displays
if (screen && screen.pixelDepth > 24) {
  // Load higher quality images
}
```
**Benefits:**
- Detect orientation changes (mobile landscape/portrait)
- Optimize for pixel density (Retina displays)
- Better than just window.innerWidth

#### `/src/components/sections/canvas-scroll-section.tsx`
**Implementation:**
```typescript
const screen = useScreen();

// Adjust canvas quality based on pixel ratio
const scaleFactor = screen?.pixelDepth || 24;
```

---

### 7. **useDocumentTitle** - Dynamic Titles (Client Components Only)

**Note:** Server components should use Next.js `metadata` export (already in place).

#### Client-side dynamic title example (if needed):
```typescript
'use client';
import { useDocumentTitle } from '@/hooks/use-document-title';

function ProductModal({ productName }) {
  useDocumentTitle(`${productName} | STYRCON`, {
    preserveTitleOnUnmount: false // Restore previous title when modal closes
  });

  return <div>Modal Content</div>;
}
```

**Use Cases:**
- Modal dialogs that should change the title temporarily
- Client-side navigation without page reload
- Progressive web apps

---

## 📊 Implementation Priority

### Priority 1 (High Impact, Easy Win):
1. ✅ **useIsClient** in social-share.tsx - DONE
2. **useEventListener** in before-after.tsx - Removes ~40 lines, prevents memory leaks
3. **useEventCallback** in enhanced-contact-form.tsx - Better performance, prevents stale closures

### Priority 2 (Good Benefits):
4. **useIsClient** in cookie-consent.tsx, google-analytics.tsx
5. **useEventListener** in other components with manual listeners
6. **useUnmount** for cleanup logic separation

### Priority 3 (Nice to Have):
7. **useScreen** for advanced responsive features
8. **useDocumentTitle** for client-side modals/overlays (if needed)

---

## 🔧 Implementation Notes

### General Guidelines:
- Always import from `@/hooks/use-{hook-name}`
- Test SSR behavior after implementing useIsClient
- Verify no console warnings after useEventListener
- Check that useEventCallback doesn't cause re-renders

### Before Implementing:
1. Read the current implementation
2. Identify the pattern (addEventListener, typeof window, useCallback, etc.)
3. Replace with the appropriate hook
4. Test in development
5. Verify no TypeScript errors
6. Check browser console for warnings

### Testing Checklist:
- [ ] Component renders without errors
- [ ] SSR works correctly (no hydration mismatches)
- [ ] Event listeners work as expected
- [ ] Cleanup happens on unmount
- [ ] No memory leaks
- [ ] TypeScript compilation passes

---

## 📝 Created Hooks Summary

| Hook | File | Purpose | Use When |
|------|------|---------|----------|
| `useIsClient` | `use-is-client.ts` | Detect client-side rendering | Accessing window, document, localStorage |
| `useDocumentTitle` | `use-document-title.ts` | Set page title dynamically | Client-side title changes |
| `useEventListener` | `use-event-listener.ts` | Attach event listeners safely | addEventListener calls |
| `useEventCallback` | `use-event-callback.ts` | Stable callback references | Form handlers, event handlers |
| `useUnmount` | `use-unmount.ts` | Run cleanup on unmount | Cleanup logic separation |
| `useScreen` | `use-screen.ts` | Track screen properties | Advanced responsive features |

**Bonus Hooks Created:**
- `useIsomorphicLayoutEffect` - SSR-safe layout effects
- `useDebounceCallback` - Debounced callbacks

---

## 🚀 Next Steps

1. Review this guide
2. Pick high-priority implementations
3. Implement one hook at a time
4. Test thoroughly
5. Commit with descriptive messages
6. Move to next priority

**Estimated Impact:**
- Code reduction: ~100-150 lines
- Bug prevention: Memory leaks, stale closures, hydration mismatches
- Performance: Better event handling, stable references
- Maintainability: Cleaner, more readable code

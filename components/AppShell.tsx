'use client';
import { ToastStore, Toaster } from '@/components/ui';

/** Envuelve las pantallas de app con el provider de toasts. */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ToastStore>
      {children}
      <Toaster />
    </ToastStore>
  );
}

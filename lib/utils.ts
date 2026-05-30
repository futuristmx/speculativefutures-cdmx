import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper estándar de shadcn/ui para combinar clases con resolución de conflictos.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

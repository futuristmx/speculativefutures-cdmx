import type { ReactNode } from 'react';

// Layout raíz mínimo. El <html>/<body> con lang correcto y el provider de
// next-intl viven en app/[locale]/layout.tsx, que conoce el locale activo.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

// 'use client';
// import React from 'react';
// import ThemeProvider from './ThemeToggle/theme-provider';
// import { SessionProvider, SessionProviderProps } from 'next-auth/react';
// export default function Providers({

//   children
// }: {

//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//         <SessionProvider>{children}</SessionProvider>
//       </ThemeProvider>
//     </>
//   );
// }

'use client';
import React from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({

  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
        <SessionProvider>{children}</SessionProvider>

    </>
  );
}


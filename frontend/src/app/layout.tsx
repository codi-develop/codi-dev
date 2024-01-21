import { ReactNode } from 'react'
import RootLayoutWrapper from '@/components/RootLayoutWrapper'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  )
}

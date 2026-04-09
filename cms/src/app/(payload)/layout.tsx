import React from 'react'
import { importMap } from './admin/importMap'

export const metadata = {
  title: 'Explore Dubuque CMS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

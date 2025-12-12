import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thera Consulting - Gerenciamento de Produtos',
  description: 'Sistema de gerenciamento de produtos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}


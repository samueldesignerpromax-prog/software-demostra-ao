import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SalesBot Pro - Plataforma de Vendas e Atendimento com IA',
  description: 'Solução completa para automatizar vendas e atendimento. Aumente suas conversões em até 300% com nosso chatbot inteligente.',
  keywords: 'chatbot, vendas, automação, IA, atendimento',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}

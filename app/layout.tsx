import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import './globals.css'

// Títulos: Fraunces (serifa editorial, eixo óptico) · Textos: Manrope (sans moderna e limpa)
const serif = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-text',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arpoador Imóveis | Realizando sonhos em São Paulo',
  description:
    'Casas, apartamentos, terrenos e imóveis comerciais na Zona Oeste de São Paulo. Compre, venda ou alugue com o atendimento personalizado da Arpoador Imóveis.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#283027',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`light ${serif.variable} ${sans.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import '@/src/app/styles/index.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['300', '500', '600'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

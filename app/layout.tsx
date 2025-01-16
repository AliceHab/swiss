import '@/src/app/styles/index.css'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'

const montserrat = Montserrat({
  weight: ['300', '500', '600'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'block',
  variable: '--font-montserrat',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}

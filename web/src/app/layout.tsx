import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamJuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jam-juree' })

export const metadata = {
  title: 'Spacetime',
  description: 'Cápsula do tempo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamJuree.variable} font-sans bg-gray-900 text-gray-100`}>
        {children}
      </body>
    </html>
  )
}

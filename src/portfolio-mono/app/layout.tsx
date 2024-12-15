import './globals.css'
import { MatrixText } from '../components/matrix-text'

export const metadata = {
  title: 'Aiman Salim',
  description: 'Software Engineer & Designer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="bg-black text-white">
        <nav className="w-full py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-6 md:px-8 flex gap-4 text-sm justify-center">
            <a href="/" className="text-sm">
              <MatrixText text="[aimansalim]" />
            </a>
            <a href="/cv" className="text-sm">
              <MatrixText text="[cv]" />
            </a>
            <a href="/projects" className="text-sm">
              <MatrixText text="[projects]" />
            </a>
            <a href="/preview" className="text-sm">
              <MatrixText text="[preview]" />
            </a>
          </div>
        </nav>
        <main className="max-w-2xl mx-auto px-6 md:px-8 pb-16 md:pb-24">
          {children}
        </main>
      </body>
    </html>
  )
}


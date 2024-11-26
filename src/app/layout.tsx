import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Todo App',
  description: 'This is react app',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
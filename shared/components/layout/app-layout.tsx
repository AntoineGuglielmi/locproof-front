import Debug from '@/features/Debug/component/debug'
import Container from './container'
import Footer from './footer'
import Header from './header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      {process.env.NODE_ENV === 'development' && <Debug />}
      <main className="py-8 flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  )
}

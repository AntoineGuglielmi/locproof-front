import Container from './container'
import Header from './header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="py-8 flex-1">
        <Container>{children}</Container>
      </main>
    </div>
  )
}

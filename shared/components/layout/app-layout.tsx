import Debug from '@/features/Debug/component/debug'
import Footer from './footer'
import Header from './header'
import { Grid } from './grid'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      {process.env.DEBUG === '1' && <Debug />}
      <main className="pt-16 md:pt-24 pb-20 md:pb-34 flex-1">
        <Grid>{children}</Grid>
      </main>
      <Footer />
    </div>
  )
}

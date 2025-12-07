import { Container } from '@/components/Container'
import { Education } from '@/components/Education'
import { Hero } from '@/components/Hero'
import { Photos } from '@/components/Photos'
import { Projects } from '@/components/Projects'
import { Resume } from '@/components/Resume'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="space-y-10">
            <Resume />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Education />
          </div>
        </div>
      </Container>
    </>
  )
}

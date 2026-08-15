import PageMainTitle from '@/shared/components/headings/page-main-title'
import MotionDiv from '@/shared/components/layout/motion-div'
import TextBody from '@/shared/components/text/text-body'

type PageErrorStateProps = {
  title: string
  description: string
}

export default function PageErrorState({
  title,
  description,
}: PageErrorStateProps) {
  return (
    <section className="text-center pt-16 pb-10">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PageMainTitle version="small">{title}</PageMainTitle>

        <TextBody className="text-balance">{description}</TextBody>
      </MotionDiv>
    </section>
  )
}

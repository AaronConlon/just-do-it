import ApplicationContainer from '@/components/views/homepage/application-container'
import BasicDescription from '@/components/views/homepage/basic-description'

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <BasicDescription />
      <ApplicationContainer />
    </div>
  )
}

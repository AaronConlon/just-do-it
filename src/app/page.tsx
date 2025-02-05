import ApplicationContainer from '@/components/views/homepage/application-container'
import BasicDescription from '@/components/views/homepage/basic-description'

export default async function Home() {
  return (
    <div className="flex flex-col gap-6">
      <BasicDescription />
      <ApplicationContainer title="推荐应用" tag="new" />
    </div>
  )
}

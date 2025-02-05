import ApplicationContainer from '@/components/views/homepage/application-container'

export default function AppsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">应用列表</h1>
        <p className="mt-2 text-muted-foreground">
          这里展示了我开发的所有应用，包括 Web 应用、移动应用和桌面应用。
        </p>
      </div>
      <ApplicationContainer title="所有应用" tag="" />
    </div>
  )
}

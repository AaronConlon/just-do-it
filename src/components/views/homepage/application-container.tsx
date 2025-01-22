import { getApplications } from '@/lib/actions/application'
import { ApplicationCard } from './application-card'

export default async function ApplicationContainer() {
  const applications = await getApplications()

  return (
    <div className="bg-gradient-to-tr from-white via-slate-50 to-gray-50 p-4">
      <h2 className="mb-6 text-2xl font-bold">我的应用</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  )
}

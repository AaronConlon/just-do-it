import { getUser } from '@/lib/actions/auth'
import { EIsAdmin } from '@/lib/validations/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const user = await getUser()

  if (user?.is_admin !== EIsAdmin.YES) {
    redirect('/')
  }
  return redirect('/admin/dashboard')
}

import { getUser } from '@/lib/actions/auth'
import { EIsAdmin } from '@/lib/validations/auth'
import { LoginDialog } from './LoginDialog'
import { LogoutButton } from './LogoutButton'
import { RegisterDialog } from './RegisterDialog'
import { UserNav } from './user-nav'

export default async function Account() {
  const user = await getUser()

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <LogoutButton is_admin={user.is_admin === EIsAdmin.YES}>
          <UserNav user={user} />
        </LogoutButton>
      ) : (
        <>
          <LoginDialog />
          <RegisterDialog />
        </>
      )}
    </div>
  )
}

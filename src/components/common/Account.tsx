import { getUser } from '@/lib/actions/auth'
import { LoginDialog } from './LoginDialog'
import { LogoutButton } from './LogoutButton'
import { RegisterDialog } from './RegisterDialog'
import { UserNav } from './user-nav'

export default async function Account() {
  const user = await getUser()

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <LogoutButton>
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

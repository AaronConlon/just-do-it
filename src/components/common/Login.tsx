import { getUser } from '@/lib/actions/auth'
import { LoginDialog } from './LoginDialog'
import { LogoutButton } from './LogoutButton'
import { RegisterDialog } from './RegisterDialog'

export default async function Login() {
  const user = await getUser()

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-4">
          <span>Hi,{user.username}</span>
          <LogoutButton />
        </div>
      ) : (
        <>
          <LoginDialog />
          <RegisterDialog />
        </>
      )}
    </div>
  )
}

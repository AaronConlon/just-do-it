import { getUser } from '@/lib/actions/auth'
import { PiUserThin } from 'react-icons/pi'
import { LoginDialog } from './LoginDialog'
import { LogoutButton } from './LogoutButton'
import { RegisterDialog } from './RegisterDialog'

export default async function Account() {
  const user = await getUser()

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <LogoutButton>
          <div className="flex items-center gap-1">
            <PiUserThin />
            <span className="max-w-[250px] truncate">Hi,{user.username}</span>
          </div>
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

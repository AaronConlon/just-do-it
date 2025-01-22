'use client'

import { logout } from '@/lib/actions/auth'
import { toast } from 'react-hot-toast'
import { LuLogOut } from 'react-icons/lu'
import { Button } from '../ui/button'

export function LogoutButton() {
  const handleLogout = async () => {
    await logout()
    toast.success('已登出')
  }

  return (
    <Button variant="ghost" onClick={handleLogout} title="logout">
      <LuLogOut />
    </Button>
  )
}

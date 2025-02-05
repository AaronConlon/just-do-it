'use client'

import { logout } from '@/lib/actions/auth'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { toast } from 'react-hot-toast'
import { LuLogOut } from 'react-icons/lu'
import { PiUserThin } from 'react-icons/pi'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function LogoutButton({ children }: PropsWithChildren) {
  const handleLogout = async () => {
    await logout()
    toast.success('已登出')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/profile'}>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>
                <PiUserThin />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} title="logout">
          Logout
          <DropdownMenuShortcut>
            <LuLogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

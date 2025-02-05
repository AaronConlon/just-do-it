'use client'

import { logout } from '@/lib/actions/auth'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { toast } from 'react-hot-toast'
import { LuLogOut } from 'react-icons/lu'
import { PiUserThin } from 'react-icons/pi'
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
        <span className="rounded-full bg-primary p-[2px]">{children}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuLabel>我的账户</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/profile'}>
            <DropdownMenuItem>
              个人信息
              <DropdownMenuShortcut>
                <PiUserThin />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} title="logout">
          登出账号
          <DropdownMenuShortcut>
            <LuLogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

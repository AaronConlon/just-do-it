'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'

export function UserNav({
  user,
}: {
  user: {
    username: string
    avatar: string
  } | null
}) {
  return (
    <motion.div
      className="flex items-center"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <div className="pl-2 font-semibold text-white">Hi！</div>
      <Avatar className="h-8 w-8 cursor-pointer border-primary bg-primary">
        <AvatarImage src={user?.avatar} />
        <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
    </motion.div>
  )
}

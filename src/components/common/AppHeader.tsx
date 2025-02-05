import { globalConfig } from '@/config'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import Account from './Account'
import HeaderBox from './HeaderBox'

export default function AppHeader() {
  return (
    <HeaderBox>
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <h1 className="ml-2 font-bold">{globalConfig.site.name}</h1>
        </Link>
        <div className="flex items-center">
          <Link href={globalConfig.socials.blog.url} target="_blank">
            <Button variant="ghost">Blog</Button>
          </Link>
          <Link href="/apps">
            <Button variant="ghost">Apps</Button>
          </Link>
        </div>
        <Account />
      </div>
    </HeaderBox>
  )
}

import { globalConfig } from '@/config'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import Login from './Login'

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/" className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="ml-2 text-2xl font-bold">{globalConfig.site.name}</h1>
      </Link>
      <div className="flex items-center">
        {/* <section className="mr-12 text-2xl font-semibold md:text-orange-400">
          One account for everything
        </section> */}

        <Link href={globalConfig.socials.blog.url} target="_blank">
          <Button variant="link">Blog</Button>
        </Link>
        <Link href="/about">
          <Button variant="link">About</Button>
        </Link>
        <Link href="/contact">
          <Button variant="link">Contact</Button>
        </Link>
      </div>
      <Login />
    </header>
  )
}

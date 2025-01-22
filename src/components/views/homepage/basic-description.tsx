import { SocialLinks } from '@/components/common/SocialLinks'
import Image from 'next/image'

export default function BasicDescription() {
  return (
    <div className="bg-gradient-to-tr from-white via-slate-50 to-gray-50 p-4">
      <div className="my-4 p-8 text-center text-5xl font-semibold">Build something amazing.</div>
      <div className="flex flex-wrap gap-4">
        <Image
          src="https://de4965e.webp.li/blog-images/2025/01/3fbc98b659f8bc840fc6af6469ed5c85.jpg"
          alt="avatar cover"
          width={400}
          height={400}
          className="rounded-lg"
        />
        <div>
          <p className="w-[640px] max-w-[90%] indent-8 sm:p-4">
            {`Hi there! 👋 I'm a passionate Web Developer who loves building useful applications and
        services. This is my digital garden where I showcase all the projects I've created. From web
        apps to backend services and innovative products - you'll find everything I've built right
        here. Feel free to explore my work and reach out if you'd like to collaborate!`}
          </p>
          <SocialLinks />
        </div>
      </div>
    </div>
  )
}

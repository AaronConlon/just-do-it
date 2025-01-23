import BlurText from '@/components/common/BlurText'
import { SocialLinks } from '@/components/common/SocialLinks'
import SquaresComponent from '@/components/common/Squares/index'
import Image from 'next/image'

export default function BasicDescription() {
  return (
    <div>
      <div className="relative mx-4 h-[300px] overflow-hidden rounded-lg bg-gray-900">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transform text-center text-white">
          <BlurText
            text="Build something amazing."
            delay={150}
            animateBy="words"
            direction="top"
            className="mb-8 text-5xl"
          />
        </div>
        <SquaresComponent
          speed={0.3}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#eeeeee11"
          hoverFillColor="#222222"
        />
      </div>

      <div className="bg-gradient-to-tr from-white via-slate-50 to-gray-50 p-4">
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
    </div>
  )
}

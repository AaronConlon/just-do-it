import RotatingText from '@/components/common/RotatingText'
import { SocialLinks } from '@/components/common/SocialLinks'
import SquaresComponent from '@/components/common/Squares/index'
import { globalConfig } from '@/config'
import Image from 'next/image'

export default function BasicDescription() {
  return (
    <div>
      <div className="relative mx-4 h-[300px] overflow-hidden rounded-lg bg-gray-900">
        <div className="absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] transform flex-col gap-4 text-center text-2xl text-white">
          {/* <BlurText
            text="Build something amazing."
            delay={150}
            animateBy="words"
            direction="top"
            className="mb-8 text-5xl"
          /> */}
          <span className="justify-center overflow-hidden rounded-lg px-2 py-0.5 text-white sm:px-2 sm:py-1 md:px-3 md:py-2">
            Code & Building
          </span>
          <RotatingText
            texts={[
              'Focus on practicality, simplify life.',
              'Break the routine, reshape possibilities',
              'More than code, lies in creation',
              'Code as a spear, efficiency as a shield',
            ]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-orange-500/10 text-orange-500 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={5000}
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
            src="https://de4965e.webp.li/blog-images/2025/01/8d89461ad25e8a0ec5ae73a056a888d7.svg"
            alt="avatar cover"
            width={400}
            height={400}
            className="rounded-lg"
          />
          <div className="">
            <p className="mt-[100px] w-[420px] max-w-[90%] indent-8 sm:p-4 xl:w-[640px]">
              {globalConfig.meta.homepage.description}{' '}
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  )
}

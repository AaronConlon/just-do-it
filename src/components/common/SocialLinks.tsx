import { BsTwitterX } from 'react-icons/bs'
import { PiGithubLogoThin, PiWechatLogoLight } from 'react-icons/pi'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export function SocialLinks() {
  return (
    <div className="mt-6 flex w-full items-center justify-end gap-2">
      <a href="https://github.com/AaronConlon" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <PiGithubLogoThin className="h-10 w-10" />
        </Button>
      </a>
      <a
        href="https://x.com/intent/user?screen_name=AaronConlonDev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="icon">
          <BsTwitterX className="h-10 w-10" />
        </Button>
      </a>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <PiWechatLogoLight className="h-10 w-10" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col items-center gap-2">
              <span>微信公众号</span>
              <img src="/qrcode.jpg" alt="微信公众号二维码" className="h-32 w-32" />
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

'use client'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'
import { Label } from './label'
import { MultiSelect } from './multi-select'

interface ImageSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  carouselClassName?: string
  imgClassName?: string
}

export function ImageSelect({
  label,
  value,
  onChange,
  placeholder,
  carouselClassName,
  imgClassName,
}: ImageSelectProps) {
  const images = value ? value.split(';').filter(Boolean) : []
  const options = images.map((url) => ({ label: url, value: url }))

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <MultiSelect
        label=""
        value={options}
        onChange={(val) => onChange(val.map((v) => v.value).join(';'))}
        placeholder={placeholder}
      />
      {images.length > 0 && (
        <div className={cn('relative w-full max-w-lg', carouselClassName)}>
          <Carousel>
            <CarouselContent>
              {images.map((url, index) => (
                <CarouselItem key={index}>
                  <Avatar className={cn('h-64 w-full rounded-none', imgClassName)}>
                    <AvatarImage src={url} alt={`Image ${index + 1}`} className="object-cover" />
                    <AvatarFallback className="rounded-none">预览图</AvatarFallback>
                  </Avatar>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      )}
    </div>
  )
}

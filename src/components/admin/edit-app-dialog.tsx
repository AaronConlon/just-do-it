'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createApp, updateApp } from '@/lib/actions/admin'
import { TApp } from '@/lib/schemas'
import { omitBy } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PiPlus } from 'react-icons/pi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'

interface EditAppDialogProps {
  app?: TApp
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function EditAppDialog({ app, open, onOpenChange }: EditAppDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: Object.assign(
      {
        app_name: '',
        description: '',
        icon: '',
        categories: '',
        tags: '',
        url: '',
        status: 0,
        platform: '',
        is_free: 0,
        price: 0,
        screenshots: '',
        youtube_video_url: '',
      },
      omitBy(app, (value) => value === null || value === undefined)
    ),
  })

  const isFree = watch('is_free')

  const onSubmit = async (data: Partial<TApp>) => {
    try {
      console.log('form data:', data)
      data.price = data.price ? Number(data.price) : 0
      const result = app ? await updateApp(app.id, data) : await createApp(data)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success(app ? '更新成功' : '创建成功')
      router.refresh()
      setIsOpen(false)
      onOpenChange?.(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '操作失败')
    }
  }

  const iconUrl = watch('icon')

  return (
    <Dialog open={open ?? isOpen} onOpenChange={onOpenChange ?? setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PiPlus className="mr-2 h-4 w-4" />
          新增应用
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{app ? '编辑应用' : '新增应用'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="app_name">应用名称</Label>
            <Input id="app_name" {...register('app_name', { required: '请输入应用名称' })} />
            {errors.app_name && <p className="text-sm text-red-500">{errors.app_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">应用描述</Label>
            <Input id="description" {...register('description', { required: '请输入应用描述' })} />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">图标链接</Label>
            <div className="flex items-center gap-4">
              <Input id="icon" {...register('icon', { required: '请输入图标链接' })} />
              <Avatar className="h-10 w-10">
                <AvatarImage src={iconUrl} alt="应用图标" />
                <AvatarFallback>图标</AvatarFallback>
              </Avatar>
            </div>
            {errors.icon && <p className="text-sm text-red-500">{errors.icon.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="categories">分类</Label>
            <Input id="categories" {...register('categories', { required: '请输入分类' })} />
            {errors.categories && (
              <p className="text-sm text-red-500">{errors.categories.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">标签</Label>
            <Input id="tags" {...register('tags', { required: '请输入标签' })} />
            {errors.tags && <p className="text-sm text-red-500">{errors.tags.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">应用链接</Label>
            <Input id="url" {...register('url', { required: '请输入应用链接' })} />
            {errors.url && <p className="text-sm text-red-500">{errors.url.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>状态</Label>
            <Select
              defaultValue={String(app?.status ?? '0')}
              onValueChange={(value) => setValue('status', Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">开发中</SelectItem>
                <SelectItem value="1">已发布</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">平台</Label>
            <Input id="platform" {...register('platform', { required: '请输入平台' })} />
            {errors.platform && <p className="text-sm text-red-500">{errors.platform.message}</p>}
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="is_free">免费应用</Label>
            <Switch
              id="is_free"
              checked={!!isFree}
              onCheckedChange={(checked) => setValue('is_free', checked ? 1 : 0)}
            />
          </div>

          {!isFree && (
            <div className="space-y-2">
              <Label htmlFor="price">价格</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register('price', {
                  required: !isFree && '请输入价格',
                  min: { value: 0, message: '价格不能小于0' },
                })}
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '提交中...' : app ? '更新' : '创建'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

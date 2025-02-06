'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageSelect } from '@/components/ui/image-select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/multi-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { updateApp } from '@/lib/actions/admin'
import { TApp } from '@/lib/schemas'
import { ExternalLink, Youtube } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

interface Option {
  label: string
  value: string
}

interface FormValues extends Omit<TApp, 'tags' | 'categories' | 'screenshots'> {
  tags: Option[]
  categories: Option[]
  screenshots: string
}

export function BasicInfoTab({ app }: { app: TApp }) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      ...app,
      tags: app.tags ? app.tags.split(';').map((tag) => ({ label: tag, value: tag })) : [],
      categories: app.categories
        ? app.categories.split(';').map((cat) => ({ label: cat, value: cat }))
        : [],
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const formattedData = {
        ...data,
        tags: data.tags.map((t) => t.value).join(';'),
        categories: data.categories.map((c) => c.value).join(';'),
      }
      const result = await updateApp(app.id, formattedData)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('更新成功')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '更新失败')
    }
  }
  const iconUrl = watch('icon')
  const isFree = watch('is_free')
  const url = watch('url')
  const youtubeUrl = watch('youtube_video_url')

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="app_name">应用名称</Label>
              <Input id="app_name" {...register('app_name', { required: '请输入应用名称' })} />
              {errors.app_name && <p className="text-sm text-red-500">{errors.app_name.message}</p>}
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
              <Label htmlFor="description">应用描述</Label>
              <Input
                id="description"
                {...register('description', { required: '请输入应用描述' })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">应用链接</Label>
              <div className="flex items-center gap-4">
                <Input id="url" {...register('url', { required: '请输入应用链接' })} />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={!url}
                  onClick={() => url && window.open(url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              {errors.url && <p className="text-sm text-red-500">{errors.url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>状态</Label>
              <Select
                defaultValue={String(app.status)}
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

            <MultiSelect
              label="分类"
              value={watch('categories')}
              onChange={(val) => setValue('categories', val)}
              placeholder="输入分类..."
            />

            <MultiSelect
              label="标签"
              value={watch('tags')}
              onChange={(val) => setValue('tags', val)}
              placeholder="输入标签..."
            />

            <div className="col-span-2 space-y-2">
              <ImageSelect
                label="应用截图"
                value={watch('screenshots') || ''}
                onChange={(val) => setValue('screenshots', val)}
                placeholder="输入截图链接，按回车添加"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="youtube_video_url">YouTube 视频链接</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="youtube_video_url"
                  {...register('youtube_video_url')}
                  placeholder="输入 YouTube 视频链接"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={!youtubeUrl}
                  onClick={() => youtubeUrl && window.open(youtubeUrl, '_blank')}
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="is_free" className="leading-8">
                免费应用
              </Label>
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
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

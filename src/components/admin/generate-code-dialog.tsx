import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { generateAppCode } from '@/lib/actions/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Calendar } from '../ui/calendar'

interface GenerateCodeDialogProps {
  appId: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const scheme = z.object({
  count: z.number().min(1).max(100),
  discount: z.number().min(0).max(100),
})

type TSchema = z.infer<typeof scheme>

export function GenerateCodeDialog({
  appId,
  open,
  onOpenChange,
  onSuccess,
}: GenerateCodeDialogProps) {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheme),
    defaultValues: {
      count: 1,
      discount: 100,
    },
  })
  const [date, setDate] = useState<Date | undefined>(new Date())

  const onSubmit = async (payload: TSchema) => {
    setLoading(true)
    try {
      const expiredTime = date!.valueOf()
      const { success, data, error } = await generateAppCode({
        count: payload.count,
        discount: Number((payload.discount / 100).toFixed(2)),
        expired_at: expiredTime.valueOf(),
        app_id: appId,
      })
      if (success) {
        toast.success(`成功${data?.successCount}, 失败${data?.failedCount}`)
        onSuccess()
        onOpenChange(false)
      } else {
        toast.error(error ?? '生成失败')
      }
    } catch (error) {
      console.error(error)
      toast.error('生成失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>生成折扣码</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
            <label className="text-sm font-medium">过期时间</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">折扣比例</label>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  className="pr-8"
                  {...register('discount', { valueAsNumber: true })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">%</span>
              </div>
              {errors.discount && <p className="text-sm text-red-500">{errors.discount.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">生成数量</label>
              <Input
                type="number"
                min="1"
                max="100"
                {...register('count', { valueAsNumber: true })}
              />
              {errors.count && <p className="text-sm text-red-500">{errors.count.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" loading={loading}>
              确认
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

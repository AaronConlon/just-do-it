'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { globalConfig } from '@/config'
import { checkRedeemCode, redeemApp } from '@/lib/actions/application'
import { ERedeemStatus } from '@/lib/api/types'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { useQuery } from '@/lib/hooks/use-query'
import { formatDate } from '@/lib/utils/date'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface RedeemDialogProps {
  appId: number
  price: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RedeemDialog({ appId, price, open, onOpenChange }: RedeemDialogProps) {
  const [code, setCode] = useState('')
  const [isRedeeming, setIsRedeeming] = useState(false)
  const router = useRouter()
  const debouncedCode = useDebounce(code, 500)

  const { data, isLoading } = useQuery(() => checkRedeemCode(appId, debouncedCode.trim()), {
    enabled: Boolean(debouncedCode.trim()),
  })

  const getCodeStatusMessage = () => {
    if (!data?.data) return <div className="text-destructive">无效的兑换码</div>

    if (data.data.status !== ERedeemStatus.valid) {
      return (
        <div className="text-destructive">
          该兑换码已使用
          {data.data.created_at && (
            <span className="ml-1 text-xs">
              ({new Date(data.data.created_at).toLocaleString()})
            </span>
          )}
        </div>
      )
    }

    if (data.data.expired_at && data.data.expired_at < Date.now()) {
      return <div className="text-destructive">兑换码已过期</div>
    }

    if (data.data.status === ERedeemStatus.valid) {
      return (
        <div className="flex items-center justify-between">
          <div className="text-green-600">有效的兑换码</div>
          <div className="flex items-center gap-2">
            {data?.data?.status === ERedeemStatus.valid && (
              <div className="text-sm">
                价格：
                <span className="mr-2 text-muted-foreground line-through">¥{price.toFixed(2)}</span>
                <span className="font-semibold text-primary">¥{finalPrice}</span>
              </div>
            )}
            {data?.data?.expired_at && (
              <div className="ml-2 text-xs text-muted-foreground">
                有效期至：{formatDate(data.data.expired_at)}
              </div>
            )}
          </div>
        </div>
      )
    }

    return <div className="text-destructive">无效的兑换码</div>
  }

  const handleRedeem = async () => {
    if (!code.trim()) {
      toast.error('请输入兑换码')
      return
    }

    try {
      setIsRedeeming(true)
      const result = await redeemApp(appId, code.trim())

      console.log('兑换结果：', result)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('兑换成功')
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '兑换失败，请检查兑换码是否正确')
    } finally {
      setIsRedeeming(false)
    }
  }

  const finalPrice =
    data?.data?.status === ERedeemStatus.valid && data?.data?.discount && data?.data?.discount
      ? price * (1 - data.data.discount)
      : price

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>获取应用</DialogTitle>
          <DialogDescription>
            请联系开发者获取兑换码：
            <div className="mt-4 space-y-2 rounded-lg bg-muted p-4">
              <div>微信：{globalConfig.contact.wechat}</div>
              <div>
                邮箱：
                <a className="underline" href={`mailto:${globalConfig.contact.email}`}>
                  {globalConfig.contact.email}
                </a>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="请输入兑换码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {code && (
              <div className="text-sm">
                {isLoading ? (
                  <div className="text-muted-foreground">验证中...</div>
                ) : (
                  getCodeStatusMessage()
                )}
              </div>
            )}
          </div>
          <Button
            className="w-full"
            onClick={handleRedeem}
            disabled={isRedeeming || !data?.data || data.data.status !== ERedeemStatus.valid}
          >
            {isRedeeming ? '兑换中...' : '兑换'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

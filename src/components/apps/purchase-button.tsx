'use client'

import { claimFreeApp } from '@/lib/actions/application'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '../ui/button'
import { RedeemDialog } from './redeem-dialog'

interface PurchaseButtonProps {
  appId: number
  price: number
  isFree: boolean
  hasOwned: boolean
}

export function PurchaseButton({ appId, price, isFree, hasOwned }: PurchaseButtonProps) {
  const [showRedeemDialog, setShowRedeemDialog] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    if (isFree) {
      try {
        setIsClaiming(true)
        const result = await claimFreeApp(appId)
        if (!result.success) {
          throw new Error(result.error)
        }
        toast.success('获取成功')
        router.refresh()
      } catch (e) {
        toast.error(e?.message || '获取失败，请稍后重试')
      } finally {
        setIsClaiming(false)
      }
    } else {
      setShowRedeemDialog(true)
    }
  }

  if (hasOwned) {
    return (
      <Button className="w-full" variant="secondary" disabled>
        已拥有
      </Button>
    )
  }

  return (
    <>
      <Button className="w-full" onClick={handleClick} disabled={isClaiming}>
        {isClaiming ? '处理中...' : isFree ? '获取' : `购买 ¥${price.toFixed(2)}`}
      </Button>

      {!isFree && (
        <RedeemDialog
          appId={appId}
          price={price}
          open={showRedeemDialog}
          onOpenChange={setShowRedeemDialog}
        />
      )}
    </>
  )
}

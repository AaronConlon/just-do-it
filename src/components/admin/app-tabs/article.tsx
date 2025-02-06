'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { updateApp } from '@/lib/actions/admin'
import { TApp } from '@/lib/schemas'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export function ArticleTab({ app }: { app: TApp }) {
  const [content, setContent] = useState(app.detail || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const result = await updateApp(app.id, { detail: content })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('更新成功')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '更新失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] font-mono"
            placeholder="请输入 Markdown 内容..."
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

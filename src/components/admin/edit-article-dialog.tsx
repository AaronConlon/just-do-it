'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { updateApp } from '@/lib/actions/admin'
import { TApp } from '@/lib/schemas'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface EditArticleDialogProps {
  app: TApp
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditArticleDialog({ app, open, onOpenChange }: EditArticleDialogProps) {
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
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '更新失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>编辑文章 - {app.app_name}</DialogTitle>
        </DialogHeader>
        <div className="min-h-[60vh] rounded-md border">
          <MDXEditor
            markdown={content}
            onChange={setContent}
            plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
            contentEditableClassName="prose dark:prose-invert max-w-none"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '保存中...' : '保存'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

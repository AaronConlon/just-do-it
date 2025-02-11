import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteAppCode, getAppCodes } from '@/lib/actions/admin'
import { useQuery } from '@/lib/hooks/use-query'
import { calcRelativeTime, formatDate } from '@/lib/utils/date'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PiGiftThin } from 'react-icons/pi'
import { GenerateCodeDialog } from './generate-code-dialog'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AppCodesProps {
  appId: number
}

export function AppCodes({ appId }: AppCodesProps) {
  const [open, setOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [checked, setChecked] = useState<boolean>(false)

  const { isFetching, data, refetch } = useQuery(async () => {
    const { success, data, error } = await getAppCodes(appId)
    if (success) {
      return data!
    } else {
      toast.error(error ?? '获取折扣码失败')
    }
  })

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteAppCode(appId, [id])
      if (result.success) {
        toast.success(
          `成功：${result.data?.successCount ?? 0}, 失败：${result.data?.failedCount ?? 0}`
        )
        refetch()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.error(error)
      toast.error('删除失败')
    }
  }

  const handleBatchDelete = async () => {
    if (!selectedIds.length) return
    try {
      const result = await deleteAppCode(appId, selectedIds)
      if (result.success) {
        toast.success(
          `成功：${result.data?.successCount ?? 0}, 失败：${result.data?.failedCount ?? 0}`
        )
        setSelectedIds([])
        refetch()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.error(error)
      toast.error('删除失败')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">折扣码管理</h2>
        <div className="flex items-center space-x-2">
          {selectedIds.length > 0 && (
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              删除所选 ({selectedIds.length})
            </Button>
          )}
          <Button onClick={() => setOpen(true)}>
            <PiGiftThin className="mr-2 h-4 w-4" />
            生成折扣码
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(checked) => {
                    setSelectedIds(
                      checked ? (data?.filter((c) => !c.account_id).map((c) => c.id!) ?? []) : []
                    )
                    setChecked((prev) => !prev)
                  }}
                />
              </TableHead>
              <TableHead>折扣码</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>有效期</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  加载中...
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              data?.map((code) => (
                <TableRow key={code.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(code.id!)}
                      disabled={!!code.account_id}
                      onCheckedChange={(checked) => {
                        setSelectedIds((ids) =>
                          checked ? [...ids, code.id!] : ids.filter((id) => id !== code.id)
                        )
                      }}
                    />
                  </TableCell>
                  <TableCell>{code.code}</TableCell>
                  <TableCell>
                    {!!code.account_id ? (
                      <span className="text-gray-400">已使用</span>
                    ) : (
                      <span className="font-semibold text-primary">未使用</span>
                    )}
                  </TableCell>
                  <TableCell>{calcRelativeTime(code.expired_at)}</TableCell>
                  <TableCell>{formatDate(code.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(code.id!)}
                      disabled={!!code.account_id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <GenerateCodeDialog appId={appId} open={open} onOpenChange={setOpen} onSuccess={refetch} />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除选中的 {selectedIds.length} 个折扣码吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleBatchDelete}>确认</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

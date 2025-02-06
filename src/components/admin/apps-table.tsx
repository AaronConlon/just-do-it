'use client'

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteApp } from '@/lib/actions/admin'
import { EAppStatus, TApp } from '@/lib/schemas'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { PiArrowDown, PiArrowUp, PiPencil, PiTrash } from 'react-icons/pi'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { EditAppDialog } from './edit-app-dialog'

interface AppsTableProps {
  apps: TApp[]
}

export function AppsTable({ apps: initialApps }: AppsTableProps) {
  const router = useRouter()
  const [apps, setApps] = useState(initialApps)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('desc')
  const [editingApp, setEditingApp] = useState<TApp | null>(null)
  const [deletingApp, setDeletingApp] = useState<TApp | null>(null)

  const handleSearch = (value: string) => {
    setSearch(value)
    const filtered = initialApps.filter((app) =>
      app.app_name.toLowerCase().includes(value.toLowerCase())
    )
    setApps(filtered)
  }
  const handleSort = () => {
    const newSortBy = sortBy === 'asc' ? 'desc' : 'asc'
    setSortBy(newSortBy)
    const sorted = [...apps].sort((a, b) => {
      return newSortBy === 'asc'
        ? (a.user_count || 0) - (b.user_count || 0)
        : (b.user_count || 0) - (a.user_count || 0)
    })
    setApps(sorted)
  }

  const handleDelete = async (app: TApp) => {
    setDeletingApp(app)
  }

  const confirmDelete = async () => {
    if (!deletingApp) return

    const result = await deleteApp(deletingApp.id)
    if (result.success) {
      toast.success('删除成功')
      router.refresh()
    } else {
      toast.error(result.error)
    }
    setDeletingApp(null)
  }

  useEffect(() => {
    setApps(initialApps)
    handleSearch(search)
  }, [initialApps])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="搜索应用..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        <EditAppDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>应用</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>平台</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>标签</TableHead>
            <TableHead onClick={handleSort} className="cursor-pointer">
              用户数{' '}
              {sortBy === 'asc' ? (
                <PiArrowUp className="inline" />
              ) : (
                <PiArrowDown className="inline" />
              )}
            </TableHead>
            <TableHead className="pl-4 text-left">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Image
                    src={app.icon}
                    alt={app.app_name}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  {app.app_name}
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    app.status === 1
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {app.status === EAppStatus.DEV ? '开发中' : '已发布'}
                </span>
              </TableCell>
              <TableCell>{app.platform}</TableCell>
              <TableCell>
                {app.is_free ? (
                  <span className="text-green-600">免费</span>
                ) : (
                  <span className="text-orange-600">¥{app.price}</span>
                )}
              </TableCell>
              <TableCell>{app.categories}</TableCell>
              <TableCell>{app.tags}</TableCell>
              <TableCell>{app.user_count || 0}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/admin/apps/edit?id=${app.id}`)}
                  >
                    <PiPencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(app)}>
                    <PiTrash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingApp && (
        <EditAppDialog app={editingApp} open={true} onOpenChange={() => setEditingApp(null)} />
      )}

      <AlertDialog open={!!deletingApp} onOpenChange={(open) => !open && setDeletingApp(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除应用？</AlertDialogTitle>
            <AlertDialogDescription>
              你确定要删除 {deletingApp?.app_name} 吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>确认删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

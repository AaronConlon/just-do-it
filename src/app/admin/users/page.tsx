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
import { Button } from '@/components/ui/button'
import { HighlightText } from '@/components/ui/highlight-text'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteUser, getUsers, updateUserBlockStatus } from '@/lib/actions/admin'
import { useQuery } from '@/lib/hooks/use-query'
import { TUser } from '@/lib/schemas'
import { TUserSearch, userSearchSchema } from '@/lib/schemas/search'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, LockOpen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { watch, register, control } = useForm<TUserSearch>({
    resolver: zodResolver(userSearchSchema),
    defaultValues: {
      keyword: '',
      is_admin: '',
      is_locked: '',
    },
  })

  const keyword = watch('keyword')
  const is_locked = watch('is_locked')
  const isAdmin = watch('is_admin')

  const { isLoading, data, refetch } = useQuery(async () => {
    const params = {
      is_locked: is_locked === '-1' || is_locked === '' ? undefined : Number(is_locked),
      is_admin: isAdmin === '-1' || isAdmin === '' ? undefined : Number(isAdmin),
    }
    // 过滤掉 undefined 的参数
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined)
    )

    const res = await getUsers(page, pageSize, keyword, filteredParams)
    if (!res.success) {
      toast.error(res.error)
    } else {
      return res.data
    }
  })

  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editingUser, setEditingUser] = useState<TUser | null>(null)

  const handleUpdate = async () => {
    if (!editingUser) return
    try {
      const result = await updateUserBlockStatus(
        editingUser.id,
        editingUser.is_locked === 1 ? 0 : 1
      )
      if (result.success) {
        toast.success(editingUser.is_locked ? '已解锁用户' : '已锁定用户')
        refetch()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.error(error)
      toast.error('操作失败')
    } finally {
      setEditingUser(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const result = await deleteUser(deleteId)
      if (result.success) {
        toast.success('删除成功')
        refetch()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.error(error)
      toast.error('删除失败')
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center gap-4">
        <Input
          placeholder="搜索用户名或邮箱..."
          {...register('keyword')}
          className="max-w-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              refetch()
            }
          }}
        />
        <Controller
          control={control}
          name="is_locked"
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="用户状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">全部</SelectItem>
                <SelectItem value="1">已锁定</SelectItem>
                <SelectItem value="0">正常</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          control={control}
          name="is_admin"
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="用户类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">全部</SelectItem>
                <SelectItem value="1">管理员</SelectItem>
                <SelectItem value="0">普通用户</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {/* 新增搜索按钮 */}
        <Button onClick={refetch}>搜索</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>用户名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>注册时间</TableHead>
              <TableHead className="">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  加载中...
                </TableCell>
              </TableRow>
            ) : data?.list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              data?.list.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <HighlightText text={user.username} keyword={keyword} />
                  </TableCell>
                  <TableCell>
                    <HighlightText text={user.email} keyword={keyword} />
                  </TableCell>
                  <TableCell className={cn(user.is_locked ? 'text-red-500' : 'text-green-500')}>
                    {user.is_locked ? '已锁定' : '正常'}
                  </TableCell>
                  <TableCell>{user.is_admin ? '管理员' : '普通用户'}</TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditingUser(user)}>
                      {user.is_locked ? (
                        <LockOpen className="h-4 w-4" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && !!data?.list.length && (
        <div className="flex items-center justify-between">
          <div>共 {data?.pagination.total} 条记录</div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              上一页
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={data.list.length < 10 || page * 10 >= data?.pagination.total}
            >
              下一页
            </Button>
          </div>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>此操作不可撤销，确定要删除该用户吗？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>确认</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认{editingUser?.is_locked ? '解锁' : '锁定'}用户</AlertDialogTitle>
            <AlertDialogDescription>
              确定要{editingUser?.is_locked ? '解锁' : '锁定'}用户 {editingUser?.username} 吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdate}>确认</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

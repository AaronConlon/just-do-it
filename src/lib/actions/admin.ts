'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { TApp, TUser } from '../schemas'
import { IData, IPaginationData } from '../validations/basic'
import { generateHeaders } from './headers'

export async function createApp(data: Partial<TApp>) {
  try {
    const response = await fetch(`${process.env.API_URL}/apps`, {
      method: 'POST',
      headers: await generateHeaders(),
      body: JSON.stringify(data),
    })

    console.log('response:', response)

    if (!response.ok) {
      throw new Error('创建应用失败')
    }

    const result: IData = await response.json()

    console.log('result:', result)

    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    revalidatePath('/admin/apps')
    return { success: true, data: result.data }
  } catch (error) {
    console.error('创建应用失败:', error)
    return { success: false, error: '创建失败，请稍后重试' }
  }
}

export async function updateApp(id: number, data: Partial<TApp>) {
  try {
    const response = await fetch(`${process.env.API_URL}/apps/${id}`, {
      method: 'PUT',
      headers: await generateHeaders(),
      body: JSON.stringify(data),
    })

    console.log('update app data:', data)

    if (!response.ok) {
      throw new Error('更新应用失败')
    }

    const result: IData = await response.json()

    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    revalidateTag('apps')
    revalidatePath('/admin/apps')
    return { success: true }
  } catch (error) {
    console.error('更新应用失败:', error)
    return { success: false, error: '更新失败，请稍后重试' }
  }
}

export async function deleteApp(id: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/apps/${id}`, {
      method: 'DELETE',
      headers: await generateHeaders(),
    })

    if (!response.ok) {
      throw new Error('删除应用失败')
    }
    const result: IData = await response.json()
    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    revalidatePath('/admin/apps')
    return { success: true }
  } catch (error) {
    console.error('删除应用失败:', error)
    return { success: false, error: '删除失败，请稍后重试' }
  }
}

export async function searchApps(keyword: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/apps/search?keyword=${keyword}`, {
      method: 'GET',
      headers: await generateHeaders(),
      next: {
        tags: ['search-app'],
      },
    })
    if (!response.ok) {
      throw new Error('搜索应用失败')
    }
    const result: IData = await response.json()
    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    return { success: true, data: result.data }
  } catch (error) {
    console.error('搜索应用失败:', error)
    return { success: false, error: '搜索失败，请稍后重试' }
  }
}

// 新增 getAppAction
export async function getAppAction(id: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/apps/${id}`, {
      method: 'GET',
      headers: await generateHeaders(),
      next: {
        tags: ['apps'],
      },
    })
    if (!response.ok) {
      throw new Error('获取应用失败')
    }
    const result: IData<TApp> = await response.json()
    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    return { success: true, data: result.data }
  } catch (error) {
    console.error('获取应用失败:', error)
    return { success: false, error: '获取失败，请稍后重试' }
  }
}

interface SearchParams {
  is_locked?: number
  is_admin?: number
}

export async function getUsers(
  page: number = 1,
  pageSize = 10,
  keyword: string = '',
  params: SearchParams = {}
) {
  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    username: keyword,
    email: keyword,
    ...(params.is_locked !== undefined && { is_locked: String(params.is_locked) }),
    ...(params.is_admin !== undefined && { is_admin: String(params.is_admin) }),
  })

  try {
    const response = await fetch(`${process.env.API_URL}/accounts?${searchParams.toString()}`, {
      headers: await generateHeaders(),
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error('获取用户列表失败')
    }
    const result: IPaginationData<TUser> = await response.json()

    console.log('accounts action result:', result)

    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    return { success: false, error: '获取用户列表失败' }
  }
}

export async function updateUserBlockStatus(id: number, is_locked: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/accounts/locked/${id}`, {
      method: 'PUT',
      headers: await generateHeaders(),
      body: JSON.stringify({
        is_locked,
      }),
    })
    if (!response.ok) {
      throw new Error('更新用户失败')
    }
    const result: IData = await response.json()
    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    revalidateTag('users')
    return {
      success: true,
    }
  } catch (error) {
    console.error('更新用户失败:', error)
    return { success: false, error: '更新用户失败' }
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/accounts/${id}`, {
      method: 'DELETE',
      headers: await generateHeaders(),
    })
    if (!response.ok) {
      throw new Error('更新用户失败')
    }
    const result: IData = await response.json()
    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    revalidateTag('users')
    return {
      success: true,
    }
  } catch (error) {
    console.error('删除用户失败:', error)
    return { success: false, error: '删除用户失败' }
  }
}

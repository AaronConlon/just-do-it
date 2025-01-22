'use server'

import { TApp } from '../schemas'
import { IData } from '../validations/basic'

export async function getApplications() {
  try {
    const response = await fetch(`${process.env.API_URL}/apps`, {
      // next: { revalidate: 3600 }, // 1小时缓存
    })

    console.log('raw get apps:', response)

    if (!response.ok) {
      throw new Error('获取应用列表失败')
    }

    const result: IData<TApp[]> = await response.json()

    console.log('get apps:', result)

    if (result.code !== 0) {
      throw new Error(result.message)
    }
    return result.data
  } catch (error) {
    console.error('获取应用列表失败:', error)
    return []
  }
}

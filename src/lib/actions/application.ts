'use server'

import { RedeemResponse } from '../api/types'
import { TApp } from '../schemas'
import { IData } from '../validations/basic'
import { generateHeaders } from './headers'

export async function getApplications(noCache?: boolean) {
  'use server'
  try {
    console.log('run getApplications')
    const response = await fetch(`${process.env.API_URL}/apps`, {
      // next: { revalidate: 3600 }, // 1小时缓存
      next: {
        tags: ['apps'],
        revalidate: noCache ? 0 : 60 * 10, // 10分钟缓存
      },
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': noCache ? 'no-cache' : 'public, max-age=600',
      },
    })

    if (!response.ok) {
      throw new Error('获取应用列表失败')
    }

    const result: IData<TApp[]> = await response.json()

    if (result.code !== 0) {
      throw new Error(result.message)
    }
    return result.data
  } catch (error) {
    console.error('获取应用列表失败:', error)
    return []
  }
}

export async function getApplicationById(id: string) {
  try {
    const [appResponse, userResponse] = await Promise.all([
      fetch(`${process.env.API_URL}/apps/public/${id}`),
      fetch(`${process.env.API_URL}/accounts/profile`, {
        headers: await generateHeaders(),
      }),
    ])

    if (!appResponse.ok) {
      return null
    }

    const appResult: IData<TApp> = await appResponse.json()
    const userResult: IData<{ is_admin: boolean }> = await userResponse.json()

    return {
      ...appResult.data,
      canEdit: userResult.code === 0 && userResult.data?.is_admin,
    }
  } catch (error) {
    console.error('获取应用详情失败:', error)
    return null
  }
}

export async function getMyApps() {
  try {
    const response = await fetch(`${process.env.API_URL}/accounts/apps`, {
      headers: await generateHeaders(),
      credentials: 'include',
    })

    if (!response.ok) {
      return null
    }

    const result: IData<TApp[]> = await response.json()

    console.log('result:', result)

    return result.data
  } catch (error) {
    console.error('获取应用失败:', error)
    return null
  }
}

// export async function getAllApps() {
//   try {
//     const response = await fetch(`${process.env.API_URL}/apps`, {
//       headers: await generateHeaders(),
//       // next: { revalidate: 3600 },
//     })
//     if (!response.ok) {
//       return null
//     }
//     const result: IData<TApp[]> = await response.json()
//     return result.data
//   } catch (error) {
//     console.error('获取我的应用列表失败:', error)
//     return null
//   }
// }

// buy app

export async function buyApp(id: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/app/buy/${id}`, {
      method: 'GET',
      headers: await generateHeaders(),
      // next: { revalidate: 3600 },
    })
    if (!response.ok) {
      return null
    }
    const result: IData = await response.json()
    return result.code === 0
  } catch (error) {
    console.error('购买应用失败:', error)
    return false
  }
}

export async function checkRedeemCode(app_id: number, code: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/app/validate-code`, {
      method: 'POST',
      headers: await generateHeaders(),
      body: JSON.stringify({ code, app_id }),
    })

    if (!response.ok) {
      return { success: false, error: '无效的兑换码' }
    }

    const data: IData<RedeemResponse> = await response.json()

    console.log('validate code:', data)

    return {
      success: data.code === 0,
      data: data.data,
    }
  } catch (_) {
    return { success: false, error: '验证失败，请稍后重试' }
  }
}
export async function redeemApp(appId: number, code: string) {
  'use server'
  try {
    const response = await fetch(`${process.env.API_URL}/app/exchange`, {
      method: 'POST',
      headers: await generateHeaders(),
      body: JSON.stringify({ code, app_id: appId }),
    })

    if (!response.ok) {
      return { success: false, error: '兑换失败' }
    }

    const jsonRes = (await response.json()) as IData
    return { success: jsonRes.code === 0, error: jsonRes.message }
  } catch (error) {
    console.error('兑换失败:', error)
    return { success: false, error: '兑换失败，请稍后重试' }
  }
}

export async function claimFreeApp(appId: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/app/claim/${appId}`, {
      method: 'GET',
      headers: await generateHeaders(),
    })

    if (!response.ok) {
      return { success: false, error: '获取失败' }
    }

    const json = (await response.json()) as IData

    return { success: json.code === 0, error: json.message }
  } catch (error) {
    console.error('获取免费应用失败:', error)
    return { success: false, error: '获取失败，请稍后重试' }
  }
}


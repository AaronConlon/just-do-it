'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthResponse, LoginForm, RegisterForm, RegisterResponse } from '../validations/auth'
import { generateHeaders } from './headers'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function login(data: LoginForm) {
  try {
    console.log('login action:', data)
    data.password = await hashPassword(data.password)
    const response = await fetch(`${process.env.API_URL}/accounts/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log('login response:', response)
    if (!response.ok) {
      throw new Error('登录失败')
    }
    const responseJson = await response.json()

    if (responseJson.code !== 0) {
      return { success: false, error: responseJson.message }
    }

    const cookiesRecord = await cookies()
    const result: AuthResponse = await response.json()
    cookiesRecord.set('auth', result.data.token)
    console.log('login success result:', result)
    return { success: true, user: result.data.user }
  } catch (error) {
    console.error(error)
    return { success: false, error: '登录失败' }
  }
}

export async function logout() {
  const cookiesRecord = await cookies()
  cookiesRecord.delete('auth')
  redirect('/')
}

export async function getUser(): Promise<AuthResponse['data']['user'] | null> {
  // 获取 cookie
  const cookiesRecord = await cookies()
  const token = cookiesRecord.get('auth')
  if (!token) return null

  try {
    const response = await fetch(`${process.env.API_URL}/accounts/profile`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    const result = await response.json()
    if (!response.ok || result.code !== 0) {
      return null
    }

    return result.data
  } catch {
    return null
  }
}

export async function register(data: RegisterForm) {
  try {
    data.password = await hashPassword(data.password)
    const response = await fetch(`${process.env.API_URL}/accounts/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('服务器异常，注册失败')
    }
    const result: RegisterResponse = await response.json()
    if (result.code !== 0) {
      return { success: false, error: result.message }
    }
    console.log('register success result:', result)
    const cookieManage = await cookies()
    cookieManage.set('auth', result.data.token)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: '注册失败' }
  }
}

export async function updateProfile(data: { username: string; avatar: string }) {
  try {
    const response = await fetch(`${process.env.API_URL}/accounts/profile`, {
      method: 'PUT',
      headers: await generateHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return { success: false, error: '更新失败' }
    }

    const result = await response.json()
    return { success: result.code === 0, error: result.message }
  } catch (error) {
    console.error(error)
    return { success: false, error: '更新失败，请稍后重试' }
  }
}

export async function sendUpdatePasswordEmail(email: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/accounts/send-update-password-email`, {
      method: 'POST',
      headers: await generateHeaders(),
      body: JSON.stringify({
        email,
      }),
    })

    if (!response.ok) {
      return { success: false, error: '发送失败' }
    }

    const result = await response.json()
    return { success: result.code === 0, error: result.message }
  } catch (error) {
    console.error(error)
    return { success: false, error: '发送失败，请稍后重试' }
  }
}

export async function updatePassword(token: string, password: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/accounts/update-password`, {
      method: 'POST',
      headers: await generateHeaders(),
      body: JSON.stringify({ token, password }),
    })

    if (!response.ok) {
      return { success: false, error: '修改失败' }
    }

    const result = await response.json()
    return { success: result.code === 0, error: result.message }
  } catch (error) {
    console.error(error)
    return { success: false, error: '修改失败，请稍后重试' }
  }
}

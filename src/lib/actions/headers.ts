import { cookies } from 'next/headers'

export const generateHeaders = async () => {
  const cookiesRecord = await cookies()
  const authToken = cookiesRecord.get('auth')?.value

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  }
}

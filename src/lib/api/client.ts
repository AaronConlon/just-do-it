import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include', // 添加这行以支持跨域 cookie
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          window.location.href = '/login'
        }
        return response
      }
    ]
  }
})
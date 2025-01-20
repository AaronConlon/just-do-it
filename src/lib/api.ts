import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        // 可以在这里添加请求拦截器
        console.log(request)
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 可以在这里添加响应拦截器
        if (!response.ok) {
          // 处理错误响应
        }
        return response
      },
    ],
  },
})

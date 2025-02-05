import { globalConfig } from '@/config'
import { calcBuildTimeDate, formatDate } from '@/lib/utils/date'

export default async function PrivacyPage() {
  const lastUpdated = await calcBuildTimeDate()

  return (
    <div className="container mx-auto py-8">
      <div className="prose mx-auto max-w-4xl dark:prose-invert">
        <h1>隐私政策</h1>

        <p className="lead">最后更新时间：{formatDate(lastUpdated)}</p>

        <h2>信息收集</h2>
        <p>我们只收集必要的信息来提供服务，包括：</p>
        <ul>
          <li>账户信息（邮箱、用户名）</li>
          <li>应用使用数据</li>
          <li>设备信息</li>
        </ul>

        <h2>信息使用</h2>
        <p>收集的信息将用于：</p>
        <ul>
          <li>提供和改进服务</li>
          <li>个性化用户体验</li>
          <li>发送服务通知</li>
        </ul>

        <h2>信息安全</h2>
        <p>我们采用行业标准的安全措施保护您的信息，包括数据加密、安全存储和访问控制。</p>

        <h2>第三方服务</h2>
        <p>我们的服务可能包含第三方服务的链接。这些服务有其隐私政策，我们建议您查看这些政策。</p>

        <h2>联系我们</h2>
        <p>
          如果您对我们的隐私政策有任何疑问，请通过以下方式联系我们：
          <br />
          邮箱：{globalConfig.author.email}
        </p>
      </div>
    </div>
  )
}

import { globalConfig } from '@/config'
import { calcBuildTimeDate, formatDate } from '@/lib/utils/date'

export default async function TermsPage() {
  const lastUpdatedTime = await calcBuildTimeDate()
  return (
    <div className="container mx-auto py-8">
      <div className="prose mx-auto max-w-4xl dark:prose-invert">
        <h1>服务条款</h1>

        <p className="lead">最后更新时间：{formatDate(lastUpdatedTime)}</p>

        <h2>联系方式</h2>
        <p>如有任何问题，请联系：{globalConfig.author.email}</p>

        <h2>服务说明</h2>
        <p>我们提供应用分发和管理服务。使用我们的服务即表示您同意遵守这些条款。</p>

        <h2>用户责任</h2>
        <ul>
          <li>遵守所有适用法律和法规</li>
          <li>维护账户安全</li>
          <li>不得滥用服务</li>
          <li>不得侵犯他人知识产权</li>
        </ul>

        <h2>知识产权</h2>
        <p>所有应用和内容的知识产权归各自所有者所有。未经授权，不得复制或分发。</p>

        <h2>服务变更</h2>
        <p>我们保留随时修改或终止服务的权利。重大变更将提前通知用户。</p>

        <h2>免责声明</h2>
        <p>服务按"现状"提供，我们不对服务的适用性或可靠性作出任何明示或暗示的保证。</p>

        <h2>争议解决</h2>
        <p>任何争议应通过友好协商解决。如无法达成一致，将提交相关司法机构处理。</p>

        <h2>条款更新</h2>
        <p>我们可能会更新这些条款。继续使用服务即表示您接受更新后的条款。</p>
      </div>
    </div>
  )
}

import { format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export const calcBuildTimeDate = async () => {
  return Promise.resolve(new Date())
}

export function formatDate(date: string | Date | number, formatStr = 'yyyy年MM月dd日') {
  return format(new Date(date), formatStr, {
    locale: zhCN,
  })
}

// 使用 date-fns 计算相对时间
export function calcRelativeTime(date: string | Date | number) {
  return formatDistanceToNow(date, {
    locale: zhCN,
  })
}

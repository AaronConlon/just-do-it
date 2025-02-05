import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export const calcBuildTimeDate = async () => {
  return Promise.resolve(new Date())
}

export function formatDate(date: string | Date | number) {
  return format(new Date(date), 'yyyy年MM月dd日', {
    locale: zhCN,
  })
}

import { Dayjs } from 'dayjs'
import { TPost } from '@/types'
import type { ColumnsType } from 'antd/es/table'

export type TSearchProps = {
  dateRange?: [Dayjs, Dayjs] | undefined
  [key: string]: any
}

export type TColumnsProps = {
  postType?: string
  columns?: ColumnsType<TPost>
  canShow?: boolean
  canEdit?: boolean
  canDelete?: boolean
  hideAction?: boolean
}

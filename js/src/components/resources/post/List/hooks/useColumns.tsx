import { TPost } from '@/types'
import { ShowButton, EditButton, DeleteButton } from '@refinedev/antd'
import type { ColumnsType } from 'antd/es/table'
import { TColumnsProps } from '../types'

const useColumns = ({
  postType = 'posts',
  columns,
  canShow = true,
  canEdit = true,
  canDelete = true,
  hideAction = false,
}: TColumnsProps) => {
  const defaultColumns: ColumnsType<TPost> = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: (title: { rendered: string }) => title.rendered,
    },
  ]

  const tableColumns: ColumnsType<TPost> = [
    ...(columns ? [...columns] : defaultColumns),
    {
      title: '',
      fixed: 'right',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: TPost) => (
        <p className="m-0 whitespace-nowrap">
          {canShow && (
            <ShowButton
              resource={postType}
              size="small"
              type="primary"
              shape="circle"
              recordItemId={record.id}
              hideText
              className="mr-2"
            />
          )}

          {canEdit && (
            <EditButton
              resource={postType}
              size="small"
              type="primary"
              shape="circle"
              recordItemId={record.id}
              hideText
              className="mr-2"
            />
          )}

          {canDelete && (
            <DeleteButton
              resource={postType}
              size="small"
              type="primary"
              shape="circle"
              recordItemId={record.id}
              hideText
            />
          )}
        </p>
      ),
    },
  ]

  return hideAction ? tableColumns.slice(0, -1) : tableColumns
}

export default useColumns

import { Table, Row, Col, Card } from 'antd'
import { List, useTable } from '@refinedev/antd'
import Filter from './Filter'

// import { FilterTags } from 'antd-utility'

import useColumns from './hooks/useColumns'
import { TPost } from '@/types'
import { TColumnsProps } from './types'

const DetailedInformation: React.FC<TColumnsProps> = ({
  postType = 'posts',
  columns,
  canShow,
  canEdit,
  canDelete,
  hideAction,
}) => {
  const tableColumns = useColumns({
    postType,
    columns,
    canShow,
    canEdit,
    canDelete,
    hideAction,
  })

  const { tableProps, searchFormProps } = useTable<TPost>({
    resource: postType,
  })

  return (
    <List canCreate>
      <Row
        gutter={[
          16,
          16,
        ]}
      >
        <Col lg={24} xs={24}>
          <Filter formProps={searchFormProps} />
        </Col>
        <Col lg={24} xs={24}>
          <Card bordered={false} title="Search Result">
            <div className="mb-4">
              {/* <FilterTags form={searchFormProps?.form} /> */}
            </div>
            <Table
              {...tableProps}
              columns={tableColumns}
              tableLayout="fixed"
              rowKey="id"
            />
            <hr className="my-8" />
          </Card>
        </Col>
      </Row>
    </List>
  )
}

export default DetailedInformation

import { Row, Col, Card } from 'antd'
import { Show } from '@refinedev/antd'
import { useShow } from '@refinedev/core'

const index = () => {
  const { queryResult } = useShow({
    meta: {
      populate: '*',
    },
  })

  return (
    <>
      <Show
        title="【afreece1988】Member Detail"
        resource="users"
        contentProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: '24px 0px 24px 0px',
          },
        }}
      >
        <Row
          gutter={[
            16,
            16,
          ]}
          className="-ml-[24px] -mr-[24px]"
        >
          <Col lg={12} xs={24}>
            <Card bordered={false} title="Info"></Card>
          </Col>
          {/* <Col lg={12} xs={24}>
                        <Card  bordered={false} title="Search Result">
                            <hr className="my-8" />
                        </Card>
                    </Col> */}
        </Row>
      </Show>
    </>
  )
}

export default index

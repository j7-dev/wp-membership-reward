import { Form, Button, DatePicker, FormProps, Collapse } from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const children = (
    <Form {...formProps} layout="vertical">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Form.Item
          label="Date"
          name={['dateRange']}
          initialValue={[
            dayjs().subtract(7, 'day'),
            dayjs(),
          ]}
        >
          <RangePicker className="w-full" />
        </Form.Item>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Filter
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Collapse
      bordered={false}
      className="bg-white"
      items={[
        {
          key: 'filters',
          label: (
            <span className="font-semibold text-base relative -top-0.5">
              Filters
            </span>
          ),
          children,
        },
      ]}
    />
  )
}

export default Filter

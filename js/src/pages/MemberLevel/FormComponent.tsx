import { useEffect } from 'react'
import { Form, Input, InputNumber, Space, Select } from 'antd'
import { useForm } from '@refinedev/antd'
import { TPost } from '@/types'
import { HttpError } from '@refinedev/core'
import { isObject } from 'lodash-es'

const index = () => {
  const { form, formProps, saveButtonProps, formLoading } = useForm<
    TPost,
    HttpError,
    TPost
  >()

  useEffect(() => {
    if (!formLoading && formProps.initialValues) {
      if (
        isObject(
          formProps.initialValues.title as {
            rendered: string
          },
        )
      ) {
        formProps.initialValues.title = formProps.initialValues.title.rendered
      }

      if (
        isObject(
          formProps.initialValues.content as {
            rendered: string
          },
        )
      ) {
        formProps.initialValues.content =
          formProps.initialValues.content.rendered
      }
    }
  }, [formLoading])

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <Form.Item name="title" label="會員等級名稱">
          <Input />
        </Form.Item>
        <Form.Item name="threshold" label="會員累積消費升級門檻">
          <InputNumber className="w-full" />
        </Form.Item>

        <Space.Compact>
          <Form.Item
            name="_gamipress_expirations_amount"
            label="會員過期時間"
            className="w-full"
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            name="_gamipress_expirations_expiration"
            label=" "
            className="w-40"
            initialValue="years"
          >
            <Select
              options={[
                {
                  label: '時',
                  value: 'hours',
                },
                {
                  label: '天',
                  value: 'days',
                },
                {
                  label: '週',
                  value: 'weeks',
                },
                {
                  label: '月',
                  value: 'months',
                },
                {
                  label: '年',
                  value: 'years',
                },
              ]}
            />
          </Form.Item>
          {/* TODO <Form.Item
          name="_gamipress_congratulations_text"
          label="祝賀文字"
          hidden
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="coupon" label="套用優惠" hidden>
          <Input />
        </Form.Item> */}
        </Space.Compact>
      </div>
      <Form.Item name="content" label="說明">
        <Input.TextArea rows={6} />
      </Form.Item>
    </>
  )
}

export default index

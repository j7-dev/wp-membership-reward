import { useEffect } from 'react'
import { Form, Input, FormProps } from 'antd'
import { isObject } from 'lodash-es'
import { BaseRecord } from '@refinedev/core'
import { renderHTML } from '@/utils'

const FormComponent: React.FC<{
  formProps: FormProps
  handler: (_values: BaseRecord) => void
  formLoading?: boolean
  children?: React.ReactNode
  init?: () => void
}> = ({ formProps, handler, formLoading, children, init }) => {
  useEffect(() => {
    if (!formLoading && formProps.initialValues && init) {
      init()
    }
  }, [formLoading])

  return (
    <Form {...formProps} onFinish={handler} layout="vertical">
      {children ? (
        children
      ) : (
        <DefaultForm formProps={formProps} formLoading={formLoading} />
      )}
    </Form>
  )
}

const DefaultForm: React.FC<{
  formProps: FormProps
  formLoading?: boolean
}> = ({ formProps, formLoading }) => {
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
        formProps.initialValues.content = renderHTML(
          formProps.initialValues.content.rendered,
        )
      }
    }
  }, [formLoading])

  return (
    <div className="grid grid-cols-2 gap-6">
      <Form.Item
        name="title"
        label="title"
        rules={[
          {
            required: true,
            message: 'Please input a value',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="content" label="content">
        <Input.TextArea />
      </Form.Item>
    </div>
  )
}

export default FormComponent

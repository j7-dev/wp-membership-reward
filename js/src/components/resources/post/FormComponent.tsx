import { Form, Input, FormProps } from 'antd'

const FormComponent: React.FC<{
  formType: 'create' | 'edit'
  formProps: FormProps
  handler: () => void
  formLoading?: boolean
  children?: React.ReactNode
}> = ({ formType, formProps, handler, formLoading, children }) => {
  return (
    <Form {...formProps} onFinish={handler} layout="vertical">
      {children ? (
        children
      ) : (
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
        </div>
      )}
    </Form>
  )
}

export default FormComponent
